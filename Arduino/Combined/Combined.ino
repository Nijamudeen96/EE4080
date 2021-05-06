#include "DHT.h"

#define DHTPIN 4     

#define DHTTYPE DHT11   // DHT 11

DHT dht(DHTPIN, DHTTYPE);
int m_sensor_pin = 34;
int l_sensor_pin = 15;
int reading_value_m ;
int reading_value_l ;
int pump = 19;
int bulb = 18;
int counter = 1;


void setup() {
  Serial.begin(9600);
  Serial.println(F("DHTxx test!"));
  pinMode(pump, OUTPUT);
  pinMode(bulb, OUTPUT);
  digitalWrite(bulb, HIGH);
  dht.begin();
}

void loop() {
  delay(1000*60);
  float t = dht.readTemperature();
  
  Serial.print(F("Temperature: "));
  Serial.print(t);
  Serial.print(F("°C"));

  digitalWrite(bulb, LOW);
  reading_value_m= analogRead(m_sensor_pin);
  reading_value_m = map(reading_value_m,1800,600,0,100);
  reading_value_l= analogRead(l_sensor_pin);

  if(reading_value_l > 1000){
    reading_value_l = 1;
  }else{
    reading_value_l = 0;
  }
  
  Serial.print(", Mositure : ");
  Serial.print(reading_value_m);
  Serial.print("%, Light : ");
  Serial.print(reading_value_l);
  Serial.println("");

  
  if(counter == 1){
    digitalWrite(pump, HIGH);
    delay(3000);
    digitalWrite(pump, LOW);
    counter = 2;
  } else if(counter == 2){
    digitalWrite(bulb, HIGH);
    counter = 1;
  } 
  
}
