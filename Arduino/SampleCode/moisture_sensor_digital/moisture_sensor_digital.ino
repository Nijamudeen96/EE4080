int led_pin =13;
int sensor_pin =8;

void setup() {
  pinMode(led_pin, OUTPUT);
  pinMode(sensor_pin, INPUT);
}

void loop() {
  if(digitalRead(sensor_pin) == HIGH){
    digitalWrite(led_pin, HIGH);
  } else {
    digitalWrite(led_pin, LOW);
    delay(1000);
  }
}
