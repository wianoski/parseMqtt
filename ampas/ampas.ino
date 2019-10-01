#include <ESP8266WiFi.h>
 // MQTT Library
#include <PubSubClient.h>

#include <ArduinoJson.h>

#include <Adafruit_Fingerprint.h>

//# define Finger_Rx 7 //D5
//# define Finger_Tx 6 //D6
# define Finger_Rx 13 //D7
# define Finger_Tx 15 //D8

# define esp_Rx 3
# define esp_Tx 2

SoftwareSerial toNode(esp_Rx, esp_Tx);

SoftwareSerial toESP(Finger_Rx, Finger_Tx, false, 256);
Adafruit_Fingerprint finger = Adafruit_Fingerprint( & toESP);


const char* wifiSSID = "StudioIoT";
const char* wifiPassword = "tanyapakandrian";

//const char* wifiSSID = "Webs ploor";
//const char* wifiPassword = "bismillahx";


// MQTT Define
const char* mqttServerIP = "broker.hivemq.com";
//const char* mqttServerIP = "192.168.1.2";
const int mqttPort = 1883;

// MQTT Topic
char * device1 = "finger/found"; // pub & syv

WiFiClient myESP; // myESP become WIFI
PubSubClient client(myESP);


// WIfi Setup
void wifiSetup(){
  WiFi.begin(wifiSSID,wifiPassword);
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.println("Waiting, connection to Wifi..");
    Serial.print("SSID : "); 
    Serial.println(wifiSSID);
    
    
  }
  Serial.println("Connected to the WiFI Network "); 
  Serial.print("Connected Network "); Serial.println(wifiSSID);
  Serial.print("IP Local "); Serial.println(WiFi.localIP());
}
// publish data to topic
char dataPublish[50];
void publishMQTT(char * topics, String data) {

  data.toCharArray(dataPublish, data.length() + 1);

  client.publish(topics, dataPublish);
}

void reconnect() {
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
//  client.publish(topicLatihan1, "Reconnecting"); 
//  client.subscribe(topicLatihan1);

  client.publish(device1, "Initializing"); // acc
  client.subscribe(device1);
  // client.subscribe(topicControlling);

}

void callback(char * topic, byte * payload, unsigned int length) {
  Serial.println("--------");
  Serial.println("Message Arrived");
  Serial.print("Topic :");
  Serial.println(topic);
  Serial.print("Message : ");
  String pesan = "";
  for (int i = 0; i < length; i++) {
    Serial.print((char) payload[i]);

    pesan += (char) payload[i];

  }
  Serial.println();

  // FOR TOPIC 1
  // if (strcmp(topic, topicControlling) == 0) {
  //   if (pesan == "true") {
  //     Serial.println("LED 1 ON");
  //     //    digitalWrite(LED1, HIGH);

  //   } else if (pesan == "false") {
  //     Serial.println("LED 1 OFF");
  //     //      digitalWrite(LED1,LOW);
  //   }
  //   Serial.print("Masuk : ");
  //   Serial.println(pesan);
  // }

  Serial.print("Pesan masuk :");
  Serial.println(pesan);
  Serial.println("--------");
}



/*----------------------Wifi end here-----------------*/

uint8_t menu;
uint8_t id = 0;
uint8_t myArray[] = {
  2,
  3,
  4
};

void setup() {
  toNode.begin(57600);
  Serial.begin(57600);

  wifiSetup();

  Serial.print(F("WiFi connected! IP address: "));
  //Initialize MQTT Connection
  client.setServer(mqttServerIP, mqttPort);
  client.setCallback(callback); // callback for incoming message
  
  while (!Serial); // For Yun/Leo/Micro/Zero/...
  delay(100);
  Serial.println("\n\nAdafruit Fingerprint sensor enrollment");

  // set the data rate for the sensor serial port
  finger.begin(57600);

  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor!");
  } else {
    Serial.println("Did not find fingerprint sensor :(");
    // while (1) { delay(1); }
  }

}
uint8_t readnumber(void) {
  uint8_t num = 0;

  while (num == 0) {
    while (!Serial.available());
    num = Serial.parseInt();
  }
  return num;
}


uint8_t getFingerprintEnroll() {

  int p = -1;
  Serial.print("Waiting for valid finger to enroll as #");
  Serial.println(id);
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image taken");
        break;
      case FINGERPRINT_NOFINGER:
        Serial.println(".");
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("Imaging error");
        break;
      default:
        Serial.println("Unknown error");
        break;
    }
  }

  // OK success!

  p = finger.image2Tz(1);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  Serial.println("Remove finger");
  delay(2000);
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }
  Serial.print("ID ");
  Serial.println(id);
  p = -1;
  Serial.println("Place same finger again");
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image taken");
        break;
      case FINGERPRINT_NOFINGER:
        Serial.print(".");
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("Imaging error");
        break;
      default:
        Serial.println("Unknown error");
        break;
    }
  }

  // OK success!

  p = finger.image2Tz(2);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  // OK converted!
  Serial.print("Creating model for #");
  Serial.println(id);

  p = finger.createModel();
  if (p == FINGERPRINT_OK) {
    Serial.println("Prints matched!");
    //    Serial.println(searchDaftar(id));
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    Serial.println("Fingerprints did not match");
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }

  Serial.print("ID ");
  Serial.println(id);
  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    Serial.println("Stored!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Could not store in that location");
    return p;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Error writing to flash");
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }
}

int getFingerprintIDez() {
  Serial.println("waiting");
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK) return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK) return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK) return -1;

  // found a match!

  Serial.print("Found Jari with ID #");
  //  toNode.s
  Serial.print(finger.fingerID);
  Serial.print(" with confidence of ");
  Serial.println(finger.confidence);
  
//  int foundFinger = finger.fingerID;
//  String dataSent = "";
//  dataSent = String(foundFinger);
//  publishMQTT(device1, dataSent);
//  
  return finger.fingerID;
}

/*Start Loop*/
void loop() {
  
  if (!client.connected()){
    reconnect();
  }
  client.loop();
  
  Serial.println("Please Choose the Menu ID  (from 1 to 3)!");
  Serial.println("1. Enroll fingerprint ");
  Serial.println("2. To log in");
  Serial.println("3. Empty fingerprint db ");
  Serial.println("4. Show fingerprint template ");

  menu = readnumber();
  if (menu == 1) {
    Serial.println("Ready to enroll a fingerprint!");
    // Serial.println("masukkan Nomor Loker...");
    id = readnumber();
    if (id > 0 && id < 120) { // ID #0 not allowed, try again!
      Serial.println("enroll boz");
      getFingerprintEnroll();

    };

  } else if (menu == 2) {


    finger.getTemplateCount();
    Serial.print("Sensor contains ");
    Serial.print(finger.templateCount);
    Serial.println(" templates");
    Serial.println("Waiting for valid finger...");
    while (menu == 2) {
      int in1 = getFingerprintIDez();

      // int in2 = searchBuka(in1);
      //      Serial.println(in2);
      if (in1 != -1) {

      /*Subs begin*/
        int triggerId = 1;
        
        Serial.println(triggerId);
        if(triggerId==1){ 
          String foundJari = "found_jari";
          String dataSent = "";
          dataSent = String(foundJari);
          publishMQTT(device1, foundJari);
          break;
        }
        
        /*Subs end*/

        
        // digitalWrite(in2, HIGH);
        // delay(1000);
        // digitalWrite(in2, LOW);
        in1 = -1;
      }
    }

  } else if (menu == 3) {
    finger.emptyDatabase();
  } else if (menu == 4) {
    for (int finger = 1; finger < 10; finger++) {
      downloadFingerprintTemplate(finger);
    }
  } else {
    Serial.println("no choice");
    return;
  }
}
/*End of loop*/



//MATCHING
uint8_t getFingerprintID() {
  uint8_t p = finger.getImage();
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
      Serial.println("No finger detected");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  // OK success!

  p = finger.image2Tz();
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  // OK converted!
  p = finger.fingerFastSearch();
  if (p == FINGERPRINT_OK) {
    Serial.println("Found a print match!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_NOTFOUND) {
    Serial.println("Did not find a match");
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }

  // found a match!
  Serial.print("Found ID #");
  Serial.print(finger.fingerID);
  Serial.print(" with confidence of ");
  Serial.println(finger.confidence);

  return finger.fingerID;
}



// returns -1 if failed, otherwise returns ID #

//TEMPLATE TAPI GK PAHAM
uint8_t downloadFingerprintTemplate(uint16_t id) {
  Serial.println("------------------------------------");
  Serial.print("Attempting to load #");
  Serial.println(id);
  uint8_t p = finger.loadModel(id);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.print("Template ");
      Serial.print(id);
      Serial.println(" loaded");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    default:
      Serial.print("Unknown error ");
      Serial.println(p);
      return p;
  }

  // OK success!

  Serial.print("Attempting to get #");
  Serial.println(id);
  p = finger.getModel();
  switch (p) {
    case FINGERPRINT_OK:
      Serial.print("Template ");
      Serial.print(id);
      Serial.println(" transferring:");
      break;
    default:
      Serial.print("Unknown error ");
      Serial.println(p);
      return p;
  }

  // one data packet is 267 bytes. in one data packet, 11 bytes are 'usesless' :D
  uint8_t bytesReceived[534]; // 2 data packets
  memset(bytesReceived, 0xff, 534);

  uint32_t starttime = millis();
  int i = 0;
  while (i < 534 && (millis() - starttime) < 20000) {
    if (toESP.available()) {
      bytesReceived[i++] = toESP.read();
    }
  }
  Serial.print(i);
  Serial.println(" bytes read.");
  Serial.println("Decoding packet...");

  uint8_t fingerTemplate[512]; // the real template
  memset(fingerTemplate, 0xff, 512);

  // filtering only the data packets
  int uindx = 9, index = 0;
  while (index < 534) {
    while (index < uindx) ++index;
    uindx += 256;
    while (index < uindx) {
      fingerTemplate[index++] = bytesReceived[index];
    }
    uindx += 2;
    while (index < uindx) ++index;
    uindx = index + 9;
  }
  for (int i = 0; i < 512; ++i) {
    //Serial.print("0x");
    printHex(fingerTemplate[i], 2);
    //Serial.print(", ");
  }
  Serial.println("\ndone.");

  /*
  uint8_t templateBuffer[256];
  memset(templateBuffer, 0xff, 256);  //zero out template buffer
  int index=0;
  uint32_t starttime = millis();
  while ((index < 256) && ((millis() - starttime) < 1000))
  {
    if (toESP.available())
    {
      templateBuffer[index] = toESP.read();
      index++;
    }
  }
  
  Serial.print(index); Serial.println(" bytes read");
  
  //dump entire templateBuffer.  This prints out 16 lines of 16 bytes
  for (int count= 0; count < 16; count++)
  {
    for (int i = 0; i < 16; i++)
    {
      Serial.print("0x");
      Serial.print(templateBuffer[count*16+i], HEX);
      Serial.print(", ");
    }
    Serial.println();
  }*/
}

void printHex(int num, int precision) {
  char tmp[16];
  char format[128];

  sprintf(format, "%%.%dX", precision);

  sprintf(tmp, format, num);
  Serial.print(tmp);
}
