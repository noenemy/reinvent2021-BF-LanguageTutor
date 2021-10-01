"""
    #TITLE
    ~~~~~~~~~~~~~~~~~~~~~~~

    :created date: 8/23/21
    :description:
    :copyright: © 2021 written by sungshik (liks79@gmail.com)
    :license: BSD 3-Clause License, see LICENSE for more details.
"""

import boto3
import base64
import config
from flask import Blueprint, make_response, request
from flask import current_app as app
from util import get_appsync_secret, get_graphql_client
from werkzeug.exceptions import BadRequest


demo = Blueprint('demo', __name__)

# api_url = config.APPSYNC_STUDENT_API_URL
# api_key = get_appsync_secret(config.APPSYNC_STUDENT_KEY_SECRET_NAME, config.AWS_REGION)
# client = get_graphql_client(api_url, api_key)


@demo.route('/rekognition', methods=['POST'], strict_slashes=False)
def rekognition():
    try:
        session = boto3.session.Session()
        rekog = session.client('rekognition')

        req_data = request.data
        # app.logger.debug(req_data)
        # fileContent = base64.b64decode(req_data.replace('data:image/png;base64,', ''))
        fileContent = base64.b64decode(req_data)
        response = rekog.detect_labels(
            Image={
                'Bytes': fileContent,
            }
        )
        app.logger.info('success!')
        res = make_response(response, 200)
        return res

    except Exception as e:
        app.logger.error(e)
        raise BadRequest(e)

