from flask import Flask, render_template, request, abort, redirect, jsonify, session, g, url_for,  Blueprint, flash, current_app, make_response
from werkzeug.exceptions import BadRequest
from . import util, constants, config
from os.path import realpath, dirname, join
from flask_cors import cross_origin
import logging
from logging.handlers import RotatingFileHandler
from time import sleep
import ast



cq = Blueprint('cq', __name__, template_folder='templates', static_folder='static')

@cq.route('/v1.0/analyze', methods=['GET', 'POST'])
@cross_origin(headers=['accept', 'Content-Type'])
def home():
    text = None
    if request.method == 'POST':
        text = request.form.get("text", None)
    if not text:
        raise BadRequest(description="'text' not included in body of POST request.")

    return jsonify({"data":len(text.split())})


@cq.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

