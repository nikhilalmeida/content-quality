from collections import Counter, defaultdict
from datetime import datetime
from itertools import izip
import hashlib
import sys
import unicodedata
import json
import uuid
import operator
import os
from flask import Flask, render_template, request, abort, redirect, jsonify, session, g, url_for, flash, current_app
import requests
import logging
