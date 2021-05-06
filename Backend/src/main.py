from flask import Flask
from flask import request
import json
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

profile = [
    {},
    {
        "water": 70,
        "light": 6
    },
    {
        "water": 10,
        "light": 2
    },
    {
        "water": 90,
        "light": 6
    }
]

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="1234",
    database="FYP"
)


@app.route("/")
def hello():
    return "Hello, World!"


@app.route("/profile/<id>")
def id_func(id):
    mycursor = mydb.cursor()
    mycursor.execute("SELECT name from USERS WHERE user_id="+id+";")
    username = mycursor.fetchone()[0]
    return {"id": id, "user": username}


# receive id, moisture, temperature, luminosity
# send light and water duration
@app.route("/input")
def ESP32_Instructions():
    # Store Variables Locally
    plant_id = request.args.get('id')
    moisture = request.args.get('moisture')
    temperature = request.args.get('temperature')
    light = request.args.get('light')

    # First SQL Command to UPDATE TABLE
    mycursor = mydb.cursor()
    sql = "INSERT INTO PLANT_RECORDS (plant_id, moisture_r, light_r, temperature_r, r_time) VALUES (" + \
        plant_id+","+moisture+","+light+","+temperature+",NOW());"
    mycursor.execute(sql)
    mydb.commit()

    # Get all relevant cut off values
    sql = "SELECT profile, water, light FROM PLANTS WHERE plant_id="+plant_id+";"
    mycursor.execute(sql)
    myresult = mycursor.fetchone()
    my_profile = myresult[0]
    my_profile_water = int(myresult[1])
    my_profile_light = int(myresult[2])

    # Determine pump status
    if(int(profile[my_profile]['water']) > int(moisture) and int(my_profile_water) == 0):
        pump = 1
    else:
        pump = 0
    if(int(my_profile_water) == 1):
        pump = 1
    if(int(my_profile_water) == 2):
        pump = 0

    # Get light count from table
    sql = "SELECT COUNT(*) FROM (SELECT * FROM PLANT_RECORDS ORDER BY r_time DESC LIMIT 144) as TEMP WHERE plant_id = " + \
        str(plant_id)+" GROUP BY light_r ORDER BY light_r DESC LIMIT 1;"
    mycursor.execute(sql)
    light_count = mycursor.fetchone()[0]

    # Determine bulb status
    if(int(profile[my_profile]['light']) > (int(light_count)/8.0) and int(my_profile_light) == 0):
        bulb = 1
    else:
        bulb = 0

    if(int(my_profile_light) == 1):
        bulb = 1

    if(int(my_profile_light) == 2):
        bulb = 0

    return {
        "pump": pump,
        "light": bulb
    }


@app.route("/plants/<id>")
def getPlants(id):
    mycursor = mydb.cursor()

    # find plants asscoiated with user
    mycursor.execute(
        "SELECT plant_id FROM PLANTS WHERE user_id = "+id+";")
    myPlantId = []
    myresult = mycursor.fetchall()
    for x in myresult:
        myPlantId.append(x[0])
    print(myPlantId)
    plants = []
    # iterate through each plant to get details
    for p_id in myPlantId:
        mycursor.execute("SELECT PLANTS.name, PLANTS.profile, PR.moisture_r, PR.temperature_r, PLANTS.water, PLANTS.light FROM PLANT_RECORDS AS PR, PLANTS WHERE PLANTS.plant_id = PR.plant_id AND PLANTS.plant_id =" +
                         str(p_id)+" ORDER BY PR.r_time DESC LIMIT 1;")
        myresult = mycursor.fetchone()
        temp_plant = {}
        temp_plant["id"] = p_id
        temp_plant["name"] = myresult[0]
        temp_plant["profile"] = myresult[1]
        temp_plant["water"] = myresult[2]
        temp_plant["temperature"] = myresult[3]
        temp_plant["water_setting"] = myresult[4]
        temp_plant["light_setting"] = myresult[5]

        # add light details
        mycursor.execute("SELECT COUNT(*) FROM (SELECT * FROM PLANT_RECORDS ORDER BY r_time DESC LIMIT 144) as TEMP WHERE plant_id = " +
                         str(p_id)+" GROUP BY light_r ORDER BY light_r DESC LIMIT 1;")
        myresult = mycursor.fetchone()
        temp_plant["light"] = myresult[0]
        plants.append(temp_plant)
    return json.dumps(plants)


@app.route('/modifyProfile')
def modifyProfile():
    plant_id = request.args.get('id')
    new_profile = request.args.get('profile')
    mycursor = mydb.cursor()
    sql = "UPDATE PLANTS SET profile = " + \
        new_profile+" WHERE plant_id = "+plant_id+";"
    mycursor.execute(sql)
    mydb.commit()
    return {"result": "ok"}


@app.route('/modifyWater')
def modifyWater():
    plant_id = request.args.get('id')
    new_water = request.args.get('water')
    mycursor = mydb.cursor()
    sql = "UPDATE PLANTS SET water = "+new_water+" WHERE plant_id = "+plant_id+";"
    mycursor.execute(sql)
    mydb.commit()
    return {"result": "ok"}


@app.route('/modifyLight')
def modifyLight():
    plant_id = request.args.get('id')
    new_light = request.args.get('light')
    mycursor = mydb.cursor()
    sql = "UPDATE PLANTS SET light = "+new_light+" WHERE plant_id = "+plant_id+";"
    mycursor.execute(sql)
    mydb.commit()
    return {"result": "ok"}


if __name__ == "__main__":
    app.run(host='192.168.0.131', port='5000', debug=True)
