from flask import Flask
from flask import request

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/profile/<id>")
def id_func(id):
    id = int(id)
    return {"id":id, "id^2":id*id}

#receive id, moisture, temperature, luminosity
#send light and water duration
@app.route("/input")
def ESP32_Instructions():
    my_id = request.args.get('id')
    moisture = request.args.get('moisture')
    temperature = request.args.get('temperature')
    luminosity = request.args.get('luminosity')

    return {"request":"ok"}


if __name__ == "__main__":
    app.run(debug = True)