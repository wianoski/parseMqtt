from subprocess import check_call
import sys


check_call(["pkill", "-9", "-f", "camTrig.py"])