"""
    #TITLE
    ~~~~~~~~~~~~~~~~~~~~~~~

    :created date: 8/23/21
    :description:
    :copyright: © 2021 written by sungshik (liks79@gmail.com)
    :license: BSD 3-Clause License, see LICENSE for more details.
"""
import os
from util import check_env_vars
from api import create_app

app = create_app()
app.config['DEBUG'] = False

APP_HOST = os.getenv('APP_HOST', '0.0.0.0')
APP_PORT = os.getenv('APP_PORT', 8080)

if __name__ == '__main__':
    app.run(host=APP_HOST, port=APP_PORT)
