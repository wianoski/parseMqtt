import serial
import time

ser = serial.Serial('/dev/ttyUSB0', 57600, timeout = 1) # ttyACM1 for Arduino board

readOut = 0   #chars waiting from laser range finder

print ("Starting up")
connected = False
commandToSend = 1 # get the distance in mm

while True:
    print ("Writing: ",  commandToSend)
    # ser.write(str(commandToSend).encode())
    time.sleep(1)
    while True:
        try:
            print ("Attempt to Read")
            readOut = ser.readline().decode('ascii')
            time.sleep(1)
            print ("Reading: ", readOut) 
            break
        except:
            pass
    print ("Restart")
    ser.flush() #flush the buffer