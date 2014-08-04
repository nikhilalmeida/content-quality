from flask import Flask, render_template, request, abort, redirect, jsonify, session, g, url_for, flash, current_app
from os.path import realpath, dirname, join
import logging
from logging.handlers import RotatingFileHandler
from cq import app
from time import sleep
import ast
from flask_cors import cross_origin

if __name__ == '__main__':

    app.run(debug=True, host='0.0.0.0')
