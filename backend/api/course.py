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
from model import CourseModel, course_deserialize, lecture_deserialize, unit_deserialize

course = Blueprint('courses', __name__)

api_url = config.APPSYNC_STUDENT_API_URL
api_key = get_appsync_secret(config.APPSYNC_STUDENT_KEY_SECRET_NAME, config.AWS_REGION)
client = get_graphql_client(api_url, api_key)


@course.route('/', methods=['GET'], strict_slashes=False)
def list_courses():

    try:
        courses = [course_deserialize(course) for course in CourseModel.course_title_index.scan(limit=30)]
        response = make_response(jsonify({"listCourses": {"items": courses}}), 200)
        return response

    except Exception as e:
        app.logger.error('Retrieve course list failed: {0}'.format(e))
        raise InternalServerError('Something went wrong..')


    # query = gql(
    #     """
    #     query {
    #       listCourses (filter: {type: {contains: "course"}}, limit: 10) {
    #         items {
    #           id
    #           type
    #           course_title
    #         }
    #       }
    #     }
    #     """
    # )
    # try:
    #     result = client.execute(query)
    #     response = make_response(result, 200)
    #     return response
    #
    # except Exception as e:
    #     app.logger.error('Retrieve student list failed: {0}'.format(e))
    #     raise InternalServerError('Something went wrong..')


@course.route('/<id>/lectures', methods=['GET'], strict_slashes=False)
def list_lectures(id):

    try:
        lectures = [lecture_deserialize(lecture) for lecture in CourseModel.lecture_order_index.scan(CourseModel.course_ref.startswith(id), limit=30)]
        response = make_response(jsonify({"listCourses": {"items": lectures}}), 200)
        return response

    except Exception as e:
        app.logger.error('Retrieve lecture list failed: {0}'.format(e))
        raise InternalServerError('Something went wrong..')


    # app.logger.info(id)
    #
    # query = gql(
    #     """
    #     query {
    #               listCourses (filter: {type: {contains: "lecture"}}, limit: 10) {
    #                 items {
    #                   id
    #                   lecture_order
    #                   lecture_title
    #                 }
    #               }
    #             }
    #     """
    # )
    # try:
    #     result = client.execute(query)
    #     response = make_response(jsonify({"listCourses": result}), 200)
    #     return response
    #
    # except Exception as e:
    #     app.logger.error('Retrieve student list failed: {0}'.format(e))
    #     raise InternalServerError('Something went wrong..')


@course.route('/<id>/lectures/<lec_id>/units', methods=['GET'], strict_slashes=False)
def list_units(id, lec_id):

    try:
        units = [unit_deserialize(unit) for unit in CourseModel.unit_order_index.scan(CourseModel.lecture_ref.startswith(lec_id), limit=30)]
        response = make_response(jsonify({"listCourses": {"items": units}}), 200)
        return response

    except Exception as e:
        app.logger.error('Retrieve unit list failed: {0}'.format(e))
        raise InternalServerError('Something went wrong..')

    # app.logger.info(id)
    # app.logger.info(lec_id)
    #
    # query = gql(
    #     """
    #     query {
    #               listCourses (filter: {type: {contains: "unit"}}, limit: 100) {
    #                 items {
    #                   id
    #                   unit_order
    #                   unit_title
    #                 }
    #               }
    #             }
    #     """
    # )
    # try:
    #     result = client.execute(query)
    #     response = make_response(result, 200)
    #     return response
    #
    # except Exception as e:
    #     app.logger.error('Retrieve student list failed: {0}'.format(e))
    #     raise InternalServerError('Something went wrong..')


@course.route('/<id>/lectures/<lec_id>/units/<unit_id>', methods=['GET'], strict_slashes=False)
def list_steps(id, lec_id, unit_id):

    try:
        steps = CourseModel.get(unit_id, 'unit')
        response = make_response(steps.steps, 200)
        return response

    except Exception as e:
        app.logger.error('Retrieve unit list failed: {0}'.format(e))
        raise InternalServerError('Something went wrong..')
