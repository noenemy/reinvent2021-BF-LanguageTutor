"""
    #TITLE
    ~~~~~~~~~~~~~~~~~~~~~~~

    :created date: 8/23/21
    :description:
    :copyright: © 2021 written by sungshik (liks79@gmail.com)
    :license: BSD 3-Clause License, see LICENSE for more details.
"""

import os
import logging
import sys
from flask import Flask
from flask_cors import CORS
from util import check_env_vars
from aws_xray_sdk.core import xray_recorder, patch_all, patch
from aws_xray_sdk.ext.flask.middleware import XRayMiddleware

def create_app(script_info=None):

    check_env_vars()

    # instantiate the app
    app = Flask(__name__)

    # enable CORS
    CORS(app, resources={r'/*': {'origins': '*'}})

    # patch_modules = (
    #     'boto3',
    #     'botocore',
    #     'requests'
    # )
    #
    # plugins = ('EC2Plugin', 'ECSPlugin')
    # xray_recorder.configure(service='TravelLog',
    #                         plugins=plugins,
    #                         context_missing='LOG_ERROR',
    #                         sampling=False)
    # xray_recorder.begin_segment('travellog')
    # XRayMiddleware(app, xray_recorder)
    # # patch(patch_modules)
    # patch_all()

    # set config
    app_settings = os.getenv('APP_SETTINGS')
    # app_settings = conf['app_settings']
    app.config.from_object(app_settings)

    # set logger to STDOUT
    app.logger.addHandler(logging.StreamHandler(sys.stdout))
    app.logger.setLevel(logging.DEBUG)

    # register blueprints
    from api.admin import admin
    app.register_blueprint(admin, url_prefix='/admin')

    from api.student import student
    app.register_blueprint(student, url_prefix='/student')

    from api.tutor import tutor
    app.register_blueprint(tutor, url_prefix='/tutor')


    # shell context for flask cli
    @app.shell_context_processor
    def ctx():
        # return {'app': app}
        return {'application': app}

    return app
