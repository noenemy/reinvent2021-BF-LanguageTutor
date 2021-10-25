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


course = Blueprint('courses', __name__)

api_url = config.APPSYNC_STUDENT_API_URL
api_key = get_appsync_secret(config.APPSYNC_STUDENT_KEY_SECRET_NAME, config.AWS_REGION)
client = get_graphql_client(api_url, api_key)


@course.route('/', methods=['GET'], strict_slashes=False)
def list_courses():

    query = gql(
        """
        query {
          listCourses (filter: {type: {contains: "course"}}, limit: 10) {
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


@course.route('/<id>/lectures', methods=['GET'], strict_slashes=False)
def list_lectures(id):

    app.logger.info(id)

    query = gql(
        """
        query {
                  listCourses (filter: {type: {contains: "lecture"}}, limit: 10) {
                    items {
                      id
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


@course.route('/<id>/lectures/<lec_id>/units', methods=['GET'], strict_slashes=False)
def list_units(id, lec_id):


    app.logger.info(id)
    app.logger.info(lec_id)

    query = gql(
        """
        query {
                  listCourses (filter: {type: {contains: "unit"}}, limit: 100) {
                    items {
                      id
                      unit_order
                      unit_title
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