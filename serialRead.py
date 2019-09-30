# import serial 
from serial import Serial
import time

port = 'COM4'
ard = Serial(port, 115200, timeout=1)

i = 0

masukan = input('Run on everything : ')
while (masukan != '0'):
	inputs = input("Input : ")
	ard.write(inputs)
	msg = ard.read(ard.inWaiting())
	print('Msg : Accepted')
	print(msg)

	if inputs == '0':
		print('Msg : Done')
		break



