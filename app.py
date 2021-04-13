import os
import pandas as pd
import json
from flask import Flask, render_template, jsonify, request

is_heroku = False
if 'IS_HEROKU' in os.environ:
    is_heroku = True
# Config variables
# Import your config file(s) and variable(s)
if is_heroku == True:
    # if IS_HEROKU is found in the environment variables, then use the rest
    # NOTE: you still need to set up the IS_HEROKU environment variable on Heroku (it is not there by default)
    API_kEY = os.environ.get('API_KEY')
else:
    # use the config.py file if IS_HEROKU is not detected
    from config import API_KEY

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
