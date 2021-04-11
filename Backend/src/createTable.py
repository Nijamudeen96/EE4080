import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="1234",
    database="FYP"
)

mycursor = mydb.cursor()


mycursor.execute(
    "CREATE TABLE IF NOT EXISTS USERS (user_id INT AUTO_INCREMENT, name VARCHAR(255), location VARCHAR(255), photo VARCHAR(255), CONSTRAINT PK_Person PRIMARY KEY (user_id));"
)

mycursor.execute(
    "CREATE TABLE IF NOT EXISTS PLANTS (plant_id INT AUTO_INCREMENT, user_id INT, name VARCHAR(255), profile INT, water INT, light INT, CONSTRAINT PK_Plant PRIMARY KEY (plant_id), CONSTRAINT FK_User FOREIGN KEY (user_id) REFERENCES USERS(user_id));"
)

mycursor.execute(
    "CREATE TABLE IF NOT EXISTS PLANT_RECORDS (plant_id INT, moisture_r INT, light_r INT, temperature_r FLOAT(3,2), r_time DATETIME, CONSTRAINT FK_Plant FOREIGN KEY (plant_id) REFERENCES PLANTS(plant_id));"
)

mycursor.execute("SHOW TABLES")

for x in mycursor:
    print(x)

mycursor.execute("DESCRIBE USERS")

for x in mycursor:
    print(x)
#PLANT - plant_id, user_id, name, profile, water, light
#PLANT_RECORD - plant_id, moisture_r, light_r, temperature_r, timestamp
