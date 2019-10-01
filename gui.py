import serial 
import tkinter as tk
import time

port = '/dev/ttyUSB0'
ard = serial.Serial(port, 57600, timeout=1)


# def command1():
#     inputs = 1
#     ard.write(str(inputs).encode())
#     while (inputs==1):
#         msg = ard.readline().decode('ascii')
#         print(msg)
#         time.sleep(15)
#         break


def command2():
    inputs = 2
    ard.write(str(inputs).encode())
    while True:
        msg = ard.readline().decode('ascii')
        print(msg)
        time.sleep(10)
        break
        

root = tk.Tk()
root.title("Finger System")
frame = tk.Frame(root)
frame.pack()



# btn1 = tk.Button(frame,height=5, width=20,
#                    text="Enrollment",
#                    command=command1)
# btn1.pack()



btn2 = tk.Button(frame,height=5, width=20,
                   text="Log in",
                   command=command2)
btn2.pack()


button = tk.Button(frame,height=5, width=20,  
                   text="QUIT", 
                   fg="red",
                   command=quit)
button.pack()
root.mainloop()
