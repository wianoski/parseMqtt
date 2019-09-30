from serial import Serial as serial
import tkinter as tk

# port = '/dev/ttyUSB0'
# ard = serial(port, 57600, timeout=1)


def command1():
    print('Hello')
    # inputs = 1
    # ard.write(inputs)


def command2():
    print('Hello1')
    # inputs = 2
    # ard.write(inputs)



def write_slogan():
    print("Tkinter is easy to use!")

root = tk.Tk()
root.title("Finger System")
frame = tk.Frame(root)
frame.pack()



slogan = tk.Button(frame,height=5, width=20,
                   text="Enrollment",
                   command=command1)
slogan.pack()

slogan = tk.Button(frame,height=5, width=20,
                   text="Log in",
                   command=command2)
slogan.pack()


button = tk.Button(frame,height=5, width=20,  
                   text="QUIT", 
                   fg="red",
                   command=quit)
button.pack()
root.mainloop()
