import serial 
import tkinter as tk
import time

port = '/dev/ttyUSB0'
ard = serial.Serial(port, 57600, timeout=1)

root = tk.Tk()
root.title("Enroll Finger")
frame = tk.Frame(root)
frame.pack()

def enroll():
    inputs = 1
    ard.write(str(inputs).encode())

enrollBtn = tk.Button(frame, height=5, width=20,
                    text="Start", command=enroll)
enrollBtn.pack()


txt = tk.Entry(frame,width=20)
inputStr = txt
txt.pack()

def clicked():
    # tk.Tk()
    res = txt.get()
    ard.write(str(res).encode())
    while True:
        msg = ard.readline().decode('ascii')
        print(msg)
    time.sleep(10)
    

btn = tk.Button(frame, height=3, width=20,
                text="Enrollment", command=clicked)
btn.pack()
button = tk.Button(frame,height=5, width=20,  
                   text="QUIT", 
                   fg="red",
                   command=quit)
button.pack()
root.mainloop()