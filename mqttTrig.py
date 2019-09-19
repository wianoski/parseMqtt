import cv2
import numpy as np
import time
import paho.mqtt.client as mqtt
import sys
import os
import subprocess, signal, time
# from camTrig import recording

# recording

# mqtt://broker.hivemq.com 
brokerHost = "broker.hivemq.com"
port = 1883

topic1 = "pir/pirOn"
topic2 = "pir/pirOff"
topic3 = "finger/found"
topic4 = "finger/found_out"

subTopic1 = topic1
subTopic2 = topic2
subTopic3 = topic3
subTopic4 = topic4



def on_connect_on(client, userData, flags, rc):
  # print("connect with: "+str(rc))
  print("subs with topic: ", subTopic1)
  clientMqtt.subscribe(subTopic1)

  print("subs with topic: ", subTopic2)
  clientMqtt.subscribe(subTopic2)

  print("subs with topic: ", subTopic4)
  clientMqtt.subscribe(subTopic4)

  print("subs finger: ", subTopic3)
  clientMqtt.subscribe(subTopic3)



def on_message_on(client, userData, message):
  # print("Message: ", message.topic , " - qos=", message.qos , " - flag=", message.retain)
  receivedMessage = str(message.payload.decode("utf-8"))


  if (receivedMessage == "found_jari"):
      print(receivedMessage)    
      os.system('python3 camTrig.py')
      
      # os.system('./run.sh')
      # proc = subprocess.Popen("./wait") 
  elif(receivedMessage == "1"):
    print(receivedMessage)
    # os.system('python3 camTrig.py')
  elif(receivedMessage == "found_jari_keluar"):
    print("Stopping..")
    os.kill()
    # proc = subprocess.Popen(["pkill", "-f", "camTrig.py"], stdout=subprocess.PIPE)
    # proc.kill
  


# clientMqtt = mqtt.Client("client-server")
clientMqtt = mqtt.Client()

# Create a VideoCapture object
# def destroyS():
#   sys.exit(recording)

def main():
  clientMqtt.on_message = on_message_on
  clientMqtt.on_connect = on_connect_on
  print("connecting to broker: ", brokerHost)
  clientMqtt.connect(brokerHost, port)

  clientMqtt.loop_forever()

if __name__ == "__main__":
    main()