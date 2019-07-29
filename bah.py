import itertools
import string
import sys
import colorama
from colorama import Fore

def match(guess):
    if guess == password:
        print("Security penetrated!")
        print("Password match with : ", list(guess))
        return True
    else:
        return False

def penetrate():
    strings = string.ascii_lowercase+string.ascii_uppercase+"1234567890"
    for passwordLength in range(minimumCharacter, maximumCharacter+1):
        for temporary in itertools.product(strings, repeat=passwordLength):
            temporary = ''.join(temporary)
            a = temporary
            if match(a):
                print('Execution done.')
                sys.exit()
            else:
                print(list(temporary))

def main():
    global password,minimumCharacter,maximumCharacter
    print(Fore.LIGHTGREEN_EX)
    password = input("Set a virutal password : ")
    print(Fore.RESET)
    minimumStatus = False
    maximumStatus = False
    while minimumStatus == False:
        print(Fore.LIGHTCYAN_EX)
        minimumCharacter = int(input('Input minimum possible character : '))
        print(Fore.RESET)
        if minimumCharacter < 0 or minimumCharacter == 0:
            print(Fore.RED+"Invalid input! Should be bigger than zero."+Fore.RESET)
        else:
            minimumStatus = True
    while maximumStatus == False:
        print(Fore.LIGHTBLUE_EX)
        maximumCharacter = int(input("Input maximum possible character : "))
        print(Fore.RESET)
        if maximumCharacter < minimumCharacter:
            print(Fore.RED+"Invalid input! Should be at least same or bigger than minimum possible character."+Fore.RESET)
        else:
            maximumStatus = True
    print(Fore.LIGHTGREEN_EX+"Virtual password has been set to : "+Fore.RESET+"", password)
    print(Fore.LIGHTCYAN_EX+"Minimum possible character set to : "+Fore.RESET+"", minimumCharacter)
    print(Fore.LIGHTBLUE_EX+"Maximum possible character set to : "+Fore.RESET+"", maximumCharacter)
    print(Fore.LIGHTYELLOW_EX)
    prompt = input("Proceed to execute penetration? (Y/N): ")
    print(Fore.RESET)
    if prompt == 'Y' or prompt == 'y':
        penetrate()

if __name__ == '__main__':
    colorama.init()
    main()