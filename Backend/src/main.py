from flask import Flask
from flask import request
import json

app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/profile/<id>")
def id_func(id):
    id = int(id)
    return {"id":id, "user":"Nijamudeen"}

#receive id, moisture, temperature, luminosity
#send light and water duration
@app.route("/input")
def ESP32_Instructions():
    my_id = request.args.get('id')
    moisture = request.args.get('moisture')
    temperature = request.args.get('temperature')
    luminosity = request.args.get('luminosity')

    return {"request":"ok"}

@app.route("/plants")
def getPlants():
    plants = [
        {
        "id":"1",
        "name":"Plant 1",
        "profile":"Government Issued",
        "water": "16 Mar 2021",
        "light": "4",
        "temperature": "27.1",
        "humidity": "40"
        },
        {
        "id":"2",
        "name":"plant 2",
        "profile":"Succulent",
        "water": "15 Mar 2021",
        "light": "5",
        "temperature": "27.6",
        "humidity": "38"
        }
    ]

    return json.dumps(plants)


if __name__ == "__main__":
    app.run(debug = True)