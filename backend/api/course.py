"""
    #TITLE
    ~~~~~~~~~~~~~~~~~~~~~~~

    :created date: 10/22/21
    :description:
    :copyright: © 2021 written by soonkeunkim (noenemy@gmail.com)
    :license: BSD 3-Clause License, see LICENSE for more details.
"""
from flask import Blueprint, make_response, request, jsonify
from flask import current_app as app
from werkzeug.exceptions import BadRequest
import json

course = Blueprint('course', __name__)


@course.route('/', methods=['GET'], strict_slashes=False)
def list_courses():

    try:
        courseList = {
            "courses": [
                {
                    "course_id": "1",
                    "course_title": "Basic Korean",
                    "language": "Korean"
                },
                {
                    "course_id": "2",
                    "course_title": "Basic English",
                    "language": "English"
                }
            ]
        }

        app.logger.info('success!')
        res = make_response(jsonify(courseList), 200)
        return res

    except Exception as e:
        app.logger.error(e)
        raise BadRequest(e)


@course.route('/lectures', methods=['GET'], strict_slashes=False)
def list_lectures():

    try:
        courseId = request.args.get('courseId')

        lectureList = {
            "lectures": [
                {
                    "lecture_id": "1",
                    "lecture_title": "Lesson 1",
                    "lecture_length": "5"
                },
                {
                    "lecture_id": "2",
                    "lecture_title": "Lesson 2",
                    "lecture_length": "15"
                },
                {
                    "lecture_id": "3",
                    "lecture_title": "Lesson 3",
                    "lecture_length": "12"
                },
                {
                    "lecture_id": "4",
                    "lecture_title": "Lesson 4",
                    "lecture_length": "17"
                },
                {
                    "lecture_id": "5",
                    "lecture_title": "Lesson 5",
                    "lecture_length": "13"
                },

            ]
        }

        app.logger.info('success!')
        res = make_response(jsonify(lectureList), 200)
        return res

    except Exception as e:
        app.logger.error(e)
        raise BadRequest(e)


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