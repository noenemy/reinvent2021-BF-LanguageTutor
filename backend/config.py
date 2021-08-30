"""
    #TITLE
    ~~~~~~~~~~~~~~~~~~~~~~~

    :created date: 8/23/21
    :description:
    :copyright: © 2021 written by sungshik (liks79@gmail.com)
    :license: BSD 3-Clause License, see LICENSE for more details.
"""
import os
from os import environ
from boto3.session import Session

APPSYNC_STUDENT_API_URL = os.getenv('APPSYNC_STUDENT_API_URL')
APPSYNC_STUDENT_KEY_SECRET_NAME = os.getenv('APPSYNC_STUDENT_KEY_SECRET_NAME')
AWS_REGION = Session().region_name if environ.get('AWS_REGION') is None else environ.get('AWS_REGION')


class BaseConfig:
    """Base configuration"""

    TESTING = False
    APP_HOST = os.getenv('APP_HOST', '0.0.0.0')
    APP_PORT = os.getenv('APP_PORT', 8080)
    SECRET_KEY = os.getenv('FLASK_SECRET', os.urandom(24))


class DevelopmentConfig(BaseConfig):
    """Development configuration"""
    SECRET_KEY = os.getenv('FLASK_SECRET', 'dev_secret')
    ENV_FLAG = os.getenv('TEST', 'prod')  # if TEST is not set, default value is prod


class TestingConfig(BaseConfig):
    """Testing configuration"""
    TESTING = True
    SECRET_KEY = os.getenv('FLASK_SECRET', 'test_secret')


class ProductionConfig(BaseConfig):
    """Production configuration"""
    SECRET_KEY = os.getenv('FLASK_SECRET', 'prod_secret')
