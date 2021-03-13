from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/profile/<id>")
def id_func(id):
    id = int(id)
    return {"id":id*id}

if __name__ == "__main__":
    app.run(debug = True)