"""
    #TITLE
    ~~~~~~~~~~~~~~~~~~~~~~~

    :created date: 10/22/21
    :description:
    :copyright: © 2021 written by soonkeunkim (noenemy@gmail.com)
    :license: BSD 3-Clause License, see LICENSE for more details.
"""
import json
import config
from flask import Blueprint, make_response, request, jsonify
from flask import current_app as app
from werkzeug.exceptions import BadRequest
from gql import gql
from util import get_appsync_secret, get_graphql_client
from werkzeug.exceptions import BadRequest, InternalServerError, Conflict


course = Blueprint('course', __name__)

api_url = config.APPSYNC_STUDENT_API_URL
api_key = get_appsync_secret(config.APPSYNC_STUDENT_KEY_SECRET_NAME, config.AWS_REGION)
client = get_graphql_client(api_url, api_key)


@course.route('/', methods=['GET'], strict_slashes=False)
def list_courses():

    query = gql(
        """
        query {
          listCourses (limit: 10) {
            items {
              id
              type
              course_title
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
        app.logger.error('Retrieve student list failed: {0}'.format(e))
        raise InternalServerError('Something went wrong..')


@course.route('course/<id>/lectures', methods=['GET'], strict_slashes=False)
def list_lectures(id):

    app.logger.info(id)

    query = gql(
        """
        query {
                  listCourses (filter: {type: {contains: "lecture"}}, limit: 10) {
                    items {
                      lecture_order
                      lecture_title
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
        app.logger.error('Retrieve student list failed: {0}'.format(e))
        raise InternalServerError('Something went wrong..')


@course.route('/lectures/units', methods=['GET'], strict_slashes=False)
def list_units():

    try:
        courseId = request.args.get('courseId')
        lectureId = request.args.get('lectureId')

        unitList = {
            "units": [
                {
                    "unit_id": "1",
                    "unit_title": "1. Introduction"
                },
                {
                    "unit_id": "2",
                    "unit_title": "2. Expressions"
                },
                {
                    "unit_id": "3",
                    "unit_title": "3. Vocabulary"
                },
                {
                    "unit_id": "4",
                    "unit_title": "4. Exercises"
                },
                 {
                    "unit_id": "5",
                    "unit_title": "5. Summary"
                }                             
            ]
        }

        app.logger.info('success!')
        res = make_response(jsonify(unitList), 200)
        return res

    except Exception as e:
        app.logger.error(e)
        raise BadRequest(e)