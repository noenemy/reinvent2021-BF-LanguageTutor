"""
    #TITLE
    ~~~~~~~~~~~~~~~~~~~~~~~

    :created date: 8/23/21
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

student = Blueprint('student', __name__)

api_url = config.APPSYNC_STUDENT_API_URL
api_key = get_appsync_secret(config.APPSYNC_STUDENT_KEY_SECRET_NAME, config.AWS_REGION)
client = get_graphql_client(api_url, api_key)


@student.route('/', methods=['GET'], strict_slashes=False)
def list_student():
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
        response = make_response(result, 200)
        return response

    except Exception as e:
        app.logger.error('Retrieve student list failed: {0}'.format(e))
        raise InternalServerError('Something went wrong..')


@student.route('/', methods=['PUT'], strict_slashes=False)
def create_student():

    data = request.get_json()
    app.logger.info(data)

    query = gql(
        """
        mutation createTuttiStudent($data: CreateTuttiStudentInput!) {
          createTuttiStudent(input: $data) {
            id
            nickname
          }
        }
        """
    )
    try:
        result = client.execute(query, variable_values=data)
        response = make_response(result, 200)
        return response

    except Exception as e:
        app.logger.error('Create student: {0}'.format(e))
        raise InternalServerError('Something went wrong..')



@student.route('/', methods=['POST'], strict_slashes=False)
def update_student():
    data = request.get_json()
    app.logger.info(data)

    query = gql(
        """
        mutation updateTuttiStudent($data: UpdateTuttiStudentInput!) {
          updateTuttiStudent(input: $data) {
            id
            nickname
          }
        }
        """
    )
    try:
        result = client.execute(query, variable_values=data)
        response = make_response(result, 200)
        return response

    except Exception as e:
        app.logger.error('Update student: {0}'.format(e))
        raise InternalServerError('Something went wrong..')


@student.route('/', methods=['DELETE'], strict_slashes=False)
def delete_student():
    data = request.get_json()
    app.logger.info(data)

    query = gql(
        """
        mutation deleteTuttiStudent($data: DeleteTuttiStudentInput!) {
          deleteTuttiStudent(input: $data) {
            id
          }
        }
        """
    )
    try:
        result = client.execute(query, variable_values=data)
        response = make_response(result, 200)
        return response

    except Exception as e:
        app.logger.error('Delete student: {0}'.format(e))
        raise InternalServerError('Something went wrong..')

