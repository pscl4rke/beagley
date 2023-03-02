

import json
import sqlite3
from wsgiref.simple_server import make_server


def wsgi_handler(env, start):
    with sqlite3.connect("foobar.db") as conn:
        cur = conn.cursor()
        cur.execute("""
            SELECT walls, successful, flypasts
            FROM summary_ymd
            WHERE year = 2021 AND month = 4 AND day = 8
        """)
        walls, successes, flypasts = cur.fetchone()
    summary = {
        "wallsAttempted": walls,
        "successfulWalls": successes,
        "successfulFlypasts": flypasts,
    }
    response = "200 OK"
    headers = [
        ("Content-type", "text/json"),
        ("Access-Control-Allow-Origin", "*"),
    ]
    start(response, headers)
    return [json.dumps(summary).encode()]


def build_app():
    return wsgi_handler


if __name__ == "__main__":
    with make_server("127.0.0.1", 8001, build_app()) as server:
        server.serve_forever()
