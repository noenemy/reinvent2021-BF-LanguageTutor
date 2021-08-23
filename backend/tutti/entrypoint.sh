#!/bin/bash
exec gunicorn --access-logfile - --config /app/gunicorn_config.py wsgi:app
