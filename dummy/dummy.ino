// ESP Library
#include <ESP8266WiFi.h>
// MQTT Library
#include <PubSubClient.h>


// Tune Connection

const char* wifiSSID = "KERINCITAMA";
const char* wifiPassword = "Indokerinci123";


// MQTT Define
const char* mqttServerIP = "platform.antares.id";
//const char* mqttServerIP = "192.168.1.2";
const int mqttPort = 1883;

// Define topic MQTT
const char* topicLatihan1 = "latihan/topik1"; // pub & syv


WiFiClient myESP; // myESP become WIFI
PubSubClient client(myESP);

long lastMsg = 0;
char msg[50], humic[20], tempc[20];
int value = 0;

int timeDelay = 100;

void wifiSetup(){
  WiFi.begin(wifiSSID,wifiPassword);
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.println("Waiting, connection to Wifi..");
    Serial.print("SSID : "); Serial.println(wifiSSID);
    
    
  }
  Serial.println("Connected to the WiFI Network "); 
  Serial.print("Connected Network "); Serial.println(wifiSSID);
  Serial.print("IP Local "); Serial.println(WiFi.localIP());
}

char dataPublish[50];
void publishMQTT(char* topics, String data){

 data.toCharArray(dataPublish, data.length() + 1);
 
 client.publish(topics, dataPublish);
}

void reconnect(){
  // MQTT Begin
  while(!client.connected()){
    Serial.println("Connecting to MQTT Server..");
    Serial.print("IP MQTT Server : "); Serial.println(mqttServerIP);

    bool hasConnection = client.connect("Esp-1"); // connect(id,username,password) -> true if connect
    if(hasConnection){
      Serial.println("Success connected to MQTT Broker");
    } else {
      Serial.print("Failed connected");
      Serial.println(client.state());
      delay(2000);
      Serial.println("Try to connect...");
    }
  }
  client.publish(topicLatihan1, "Reconnecting"); 
  client.subscribe(topicLatihan1);


}

void callback(char* topic, byte* payload, unsigned int length){
  Serial.println("--------");
  Serial.println("Message Arrived");
  Serial.print("Topic :"); Serial.println(topic);
  Serial.print("Message : ");
  String pesan = "";
  for(int i=0; i < length; i++){
    Serial.print((char)payload[i]);

    pesan += (char)payload[i];

  }
  Serial.println();

// FOR TOPIC 1
  if (strcmp(topic,topicLatihan1) == 0) {
    Serial.println("31,231,23,2,31,321,");
    
}
Serial.print("Masuk : " );
Serial.println(pesan);
} 

long humi = 0,
hdop = 0,
alti = 0,
roll = 0,
pitch = 0,
yaw = 0,
temp = 0,
gas = 0;

float latitude = -1.23456, longitude = 20.123456, anjay = 0.5;


void setup(){
  Serial.begin(57600);
  wifiSetup();

  Serial.print(F("WiFi connected! IP address: "));
  //Initialize MQTT Connection
  client.setServer(mqttServerIP, mqttPort);
  client.setCallback(callback); // callback for incoming message

 
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  humi = random(0,100), random(1,150);
  temp = random(1,150);
  roll = random(-150,200);
  yaw = random(-160,140);
  pitch = random(-110,200);
  gas = random(0,150);
  hdop = random(20,300);
  latitude = latitude + anjay;
  longitude = longitude + anjay;

  String payload = "";
  payload += char(temp);
  sprintf(humic, "%ld", humi);
  sprintf(tempc, "%ld", temp);
  
  
  long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;
    ++value;
    snprintf (msg, 50, "meh", temp);
    Serial.print("Publish message: ");
    Serial.println(msg);
    Serial.println(humic);
    client.publish("latihanTopic1", tempc);
    client.publish("latihanTopic2", humic);
    //client.publish("latihanTopic1", temp);
  }
}
