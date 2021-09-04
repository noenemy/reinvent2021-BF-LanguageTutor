"""
    #TITLE
    ~~~~~~~~~~~~~~~~~~~~~~~

    :created date: 8/28/21
    :description:
    :copyright: © 2021 written by sungshik (liks79@gmail.com)
    :license: BSD 3-Clause License, see LICENSE for more details.
"""
import config
from flask import Blueprint, make_response
from flask import current_app as app
from gql import gql
from util import get_appsync_secret, get_graphql_client
from werkzeug.exceptions import BadRequest, InternalServerError, Conflict

admin = Blueprint('admin', __name__)

api_url = config.APPSYNC_STUDENT_API_URL
api_key = get_appsync_secret(config.APPSYNC_STUDENT_KEY_SECRET_NAME, config.AWS_REGION)
client = get_graphql_client(api_url, api_key)


@admin.route('/health_check', methods=['GET'], strict_slashes=False)
def health_check():
    query = gql(
        """
        query {
          listTuttiStudents (limit: 10) {
            items {
              id
              nickname
            }
          }
        }
        """
    )
    try:
        result = client.execute(query)
        response = make_response({'health_check': 'success'}, 200)
        app.logger.debug('health_check: success')
        return response

    except Exception as e:
        app.logger.error('health_check failed: {0}'.format(e))
        raise InternalServerError('Something went wrong.. (Check your API key)')

