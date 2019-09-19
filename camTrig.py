import cv2
import numpy as np
import time
import paho.mqtt.client as mqtt
import sys

timestr = time.strftime("%Y-%m-%d %H:%M:%S")


cap = cv2.VideoCapture(2)
 
if (cap.isOpened() == False): 
  print("Unable to read camera feed")

OUTPUT_FILE = 'video-'+ timestr + '-.avi'

frame_width = int(cap.get(3))
frame_height = int(cap.get(4))
 
# Define the codec and create VideoWriter object.The output is stored in 'outpy.avi' file.
out = cv2.VideoWriter(OUTPUT_FILE,cv2.VideoWriter_fourcc('M','J','P','G'), 25, (frame_width,frame_height))

start_time = time.time()
def recording():
  while(cap.isOpened()):
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


if __name__ == "__main__":
    recording()