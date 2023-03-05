

# Very ugly quick demo app!


import json
import sqlite3
from urllib.parse import urlparse, parse_qsl
from wsgiref.simple_server import make_server
from wsgiref.util import request_uri, shift_path_info


def fix(value):
    if value is None:
        return 0
    return value


def wsgi_handler(env, start):
    document_name = shift_path_info(env)
    dataset = shift_path_info(env)
    print(document_name, dataset)
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
    if dataset == "meta":
        payload = {
            "documentTitle": "Example Document",
        }
    elif dataset == "summary":
        with sqlite3.connect(document_name + ".db") as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT walls, successful, flypasts
                FROM summary
            """ + where)
            walls, successes, flypasts = 0, 0, 0
            for row in cur.fetchall():
                day_walls, day_successes, day_flypasts = row
                walls += fix(day_walls)
                successes += fix(day_successes)
                flypasts += fix(day_flypasts)
        payload = {
            "wallsAttempted": walls,
            "successfulWalls": successes,
            "successfulFlypasts": flypasts,
        }
    elif dataset == "walls":
        with sqlite3.connect(document_name + ".db") as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT isoDate, source, destination, result
                FROM wallData
            """ + where + " ORDER BY isoDate DESC LIMIT " + params["limit"]  # FIXME inj
                                    + " OFFSET " + params["offset"])  # FIXME injection
            rows = cur.fetchall()
        payload = rows
    else:
        raise Exception("unknown " + dataset)
    response = "200 OK"
    headers = [
        ("Content-type", "text/json"),
        ("Access-Control-Allow-Origin", "*"),
    ]
    start(response, headers)
    return [json.dumps(payload).encode()]


def build_app():
    return wsgi_handler


if __name__ == "__main__":
    with make_server("127.0.0.1", 8001, build_app()) as server:
        server.serve_forever()
