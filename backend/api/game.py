"""
    #TITLE
    ~~~~~~~~~~~~~~~~~~~~~~~

    :created date: 24/10/21
    :description:
    :copyright: © 2021 written by sungshik (liks79@gmail.com)
    :license: BSD 3-Clause License, see LICENSE for more details.
"""

import config
from flask import Blueprint, make_response, request
from flask import current_app as app
from gql import gql
from util import get_appsync_secret, get_graphql_client
from werkzeug.exceptions import BadRequest, InternalServerError, Conflict

game = Blueprint('game', __name__)

api_url = config.APPSYNC_STUDENT_API_URL
api_key = get_appsync_secret(config.APPSYNC_STUDENT_KEY_SECRET_NAME, config.AWS_REGION)
client = get_graphql_client(api_url, api_key)


@game.route('/', methods=['GET'], strict_slashes=False)
def list_student():
    query = gql(
        """
        query {
          listGames {
            items {
              id
              type
              player_name
              start_date
              end_date
              total_score
              total_found
              total_playtime
              object_name
              object_name_ko
              object_name_cn
              object_name_ja
              object_name_es
              object_score
              object_difficulty
            }
          }
        }
        """
    )
    try:
        result = client.execute(query)
        response = make_response(result, 200)
        return response

    except Exception as e:
        app.logger.error('Retrieve game list failed: {0}'.format(e))
        raise InternalServerError('Something went wrong..')
