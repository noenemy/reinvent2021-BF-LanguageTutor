"""
    #TITLE
    ~~~~~~~~~~~~~~~~~~~~~~~

    :created date: 8/23/21
    :description:
    :copyright: © 2021 written by sungshik (liks79@gmail.com)
    :license: BSD 3-Clause License, see LICENSE for more details.
"""
from flask import Blueprint, request
from flask import current_app as app

language = Blueprint('language', __name__)


@language.route('/', methods=['GET'], strict_slashes=False)
def list_languages():
    return "list languages"
