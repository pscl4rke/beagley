

import json
import sqlite3
from urllib.parse import urlparse, parse_qsl
from wsgiref.simple_server import make_server
from wsgiref.util import request_uri


def wsgi_handler(env, start):
    url = urlparse(request_uri(env))
    print(url)
    params = dict(parse_qsl(url.query))
    print(params)
    parts = []
    if "from" in params:
        parts.append("isoDate >= %r" % params["from"])  # FIXME injection
    if "to" in params:
        parts.append("isoDate <= %r" % params["to"])  # FIXME injection
    where = " AND ".join(parts)
    if len(where) > 0:
        where = "WHERE " + where
    print(where)
    # FIXME stupid _ymd name isn't needed any more
    with sqlite3.connect("foobar.db") as conn:
        cur = conn.cursor()
        cur.execute("""
            SELECT walls, successful, flypasts
            FROM summary_ymd
        """ + where)
        walls, successes, flypasts = 0, 0, 0
        for row in cur.fetchall():
            day_walls, day_successes, day_flypasts = row
            walls += day_walls
            successes += day_successes
            flypasts += day_flypasts
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
