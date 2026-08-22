#!/usr/bin/env python3
"""Automated ClarSyn demo recording (A plan: Edge kiosk + FFmpeg gdigrab).

Produces an MP4 containing only the page content (no browser UI).
Usage: python tools/record_clarsyn_demo.py
"""
import json
import os
import shutil
import subprocess
import sys
import time
import urllib.request
import websocket
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "prototypes" / "wireframes" / "p1-captain-hifi.html"
OUT_DIR = ROOT / "recordings"
RAW = OUT_DIR / "clarsyn-demo-raw.mp4"
FINAL = OUT_DIR / "clarsyn-demo-2560x1440.mp4"
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
PORT = 9227
DURATION = 120          # raw capture seconds (video is ~110s)
FINAL_DURATION = 111    # trimmed final length seconds

def wait_json(url, timeout=15):
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=1) as r:
                return json.load(r)
        except Exception:
            time.sleep(0.2)
    raise RuntimeError("DevTools endpoint not ready: " + url)

def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    if RAW.exists():
        RAW.unlink()
    if FINAL.exists():
        FINAL.unlink()

    profile = OUT_DIR / ".edge-profile"
    if profile.exists():
        shutil.rmtree(profile, ignore_errors=True)

    # 1. Start Edge kiosk on about:blank with remote debugging.
    edge = subprocess.Popen([
        EDGE,
        f"--remote-debugging-port={PORT}",
        "--remote-allow-origins=*",
        "--kiosk",
        "--no-first-run",
        "--no-default-browser-check",
        f"--user-data-dir={profile}",
        "about:blank",
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    try:
        targets = wait_json(f"http://127.0.0.1:{PORT}/json/list")
        pages = [t for t in targets if t.get("type") == "page"]
        if not pages:
            raise RuntimeError("No page target found")
        ws_url = pages[0]["webSocketDebuggerUrl"]

        # 2. Start FFmpeg desktop capture before navigating to the demo.
        ffmpeg_cmd = [
            "ffmpeg", "-hide_banner", "-y",
            "-f", "gdigrab", "-framerate", "30",
            "-video_size", "2560x1440",
            "-i", "desktop",
            "-t", str(DURATION),
            "-c:v", "libx264", "-preset", "veryfast", "-crf", "20",
            "-pix_fmt", "yuv420p",
            str(RAW),
        ]
        t0 = time.time()
        ffmpeg_log = open(OUT_DIR / "ffmpeg-capture.log", "w", encoding="utf-8", errors="ignore")
        ffmpeg = subprocess.Popen(ffmpeg_cmd, stdout=subprocess.DEVNULL, stderr=ffmpeg_log)

        # Give FFmpeg a moment to actually start grabbing.
        time.sleep(0.8)

        # 3. Navigate the kiosk tab to the demo page via CDP.
        ws = websocket.create_connection(ws_url, timeout=15)
        msg_id = 0
        def send(method, params=None):
            nonlocal msg_id
            msg_id += 1
            ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
            while True:
                msg = json.loads(ws.recv())
                if msg.get("id") == msg_id:
                    return msg
        send("Page.enable")
        send("Page.bringToFront")
        send("Page.navigate", {"url": HTML.as_uri()})
        load_time = None
        deadline = time.time() + 15
        while time.time() < deadline:
            msg = json.loads(ws.recv())
            if msg.get("method") == "Page.loadEventFired":
                load_time = time.time()
                break
        ws.close()
        if load_time is None:
            print("Warning: Page.loadEventFired not observed; using 1.2s offset.")
            load_time = t0 + 1.2
        offset = max(0.0, load_time - t0)
        print(f"Capture started at {t0:.3f}, page loaded at {load_time:.3f}, offset={offset:.3f}s")

        # 4. Wait for FFmpeg to finish, then close Edge.
        ffmpeg.wait(timeout=DURATION + 30)
        ffmpeg_log.close()
        edge.terminate()
        try:
            edge.wait(timeout=5)
        except subprocess.TimeoutExpired:
            edge.kill()

        # 5. Trim pre-page desktop frames and produce final 1920x1080 MP4.
        cmd = [
            "ffmpeg", "-hide_banner", "-y",
            "-ss", f"{offset:.3f}",
            "-i", str(RAW),
            "-t", str(FINAL_DURATION),
            "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
            "-pix_fmt", "yuv420p",
            str(FINAL),
        ]
        print("Encoding final 2560x1440 MP4 ...")
        subprocess.run(cmd, check=True)
        print("Done:", FINAL)
    finally:
        if edge.poll() is None:
            subprocess.run(["taskkill", "/PID", str(edge.pid), "/T", "/F"],
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("ERROR:", e)
        sys.exit(1)
