import cv2
import numpy as np
import time
import paho.mqtt.client as mqtt
import sys

# mqtt://broker.hivemq.com 
brokerHost = "broker.hivemq.com"
port = 1883

topic1 = "pir/pirOn"
topic2 = "pir/pirOff"
topic3 = "finger/found"

subTopic1 = topic1
subTopic2 = topic2
subTopic3 = topic3

timestr = time.strftime("%Y-%m-%d %H:%M:%S")


def on_connect_on(client, userData, flags, rc):
  print("connect with: "+str(rc))
  print("subs with topic: ", subTopic1)
  clientMqtt.subscribe(subTopic1)

  print("subs with topic: ", subTopic2)
  clientMqtt.subscribe(subTopic2)

  print("subs finger: ", subTopic3)
  clientMqtt.subscribe(subTopic3)



def on_message_on(client, userData, message):
  # print("Message: ", message.topic , " - qos=", message.qos , " - flag=", message.retain)
  receivedMessage = str(message.payload.decode("utf-8"))
  print("received message = " , receivedMessage)
  if (receivedMessage == "1"):
    # print("ceritanya ngerecord")
    recording()
  elif(receivedMessage == "found_id"):
    print(receivedMessage)
  else:
    destroyS()


clientMqtt = mqtt.Client("client-server")

# Create a VideoCapture object
cap = cv2.VideoCapture(2)
 
# Check if camera opened successfully
if (cap.isOpened() == False): 
  print("Unable to read camera feed")

OUTPUT_FILE = 'video-'+ timestr + '-.avi'
 
# Default resolutions of the frame are obtained.The default resolutions are system dependent.
# We convert the resolutions from float to integer.
frame_width = int(cap.get(3))
frame_height = int(cap.get(4))
 
# Define the codec and create VideoWriter object.The output is stored in 'outpy.avi' file.
out = cv2.VideoWriter(OUTPUT_FILE,cv2.VideoWriter_fourcc('M','J','P','G'), 25, (frame_width,frame_height))

start_time = time.time()
def recording():
  while(int(time.time()-start_time) < 30):
    ret, frame = cap.read()
  
    if ret == True: 
      
      # Write the frame into the file 'output.avi'
      out.write(frame)
  
      # Display the resulting frame    
      # cv2.imshow('frame',frame)
  
      print("Capturing video")

      # Press Q on keyboard to stop recording
      # if cv2.waitKey(1) & 0xFF == ord('q'):
      #   break

      
    # Break the loop
    else:
      break 
  
  # When everything done, release the video capture and video write objects
  cap.release()
  out.release()
  
  # Closes all the frames
  cv2.destroyAllWindows() 

def destroyS():
  sys.exit()

def main():
  clientMqtt.on_message = on_message_on
  clientMqtt.on_connect = on_connect_on
  print("connecting to broker: ", brokerHost)
  clientMqtt.connect(brokerHost, port)

  clientMqtt.loop_forever()

if __name__ == "__main__":
    main()