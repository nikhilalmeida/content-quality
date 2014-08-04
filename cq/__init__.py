from flask import Flask, render_template, request, abort, redirect, jsonify, session, g, url_for, flash, current_app
from os.path import realpath, dirname, join
import logging
from logging.handlers import RotatingFileHandler
from .views import cq
from time import sleep
import ast
from flask_cors import cross_origin

print "App Name ", __name__
app = Flask(__name__)

here = dirname(realpath(__file__))
# app.config.from_object('dt.config')
app.register_blueprint(cq, url_prefix="/api")
