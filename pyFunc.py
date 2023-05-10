import pd

import sys
import json
import os
import time
import socket

try:
    import qrcode
except:
    pd.error("Please install qrcode: Create py.pip object and send one message local qrcode")
    sys.exit(1)

    


def setStartTime(delayInSeconds):
    """ It saves (in public/start.json) the time that all connected devices should start to run."""
    startTime = time.time() + delayInSeconds
    home = pd.home()
    with open(home + "/public/start.json", "w") as f:
        json.dump({"startTime": startTime}, f)

    
def resetStartTime():
    """ It saves (in public/start.json) the time that all connected devices should start to run."""
    home = pd.home()
    with open(home + "/public/start.json", "w") as f:
        json.dump({"startTime": 0}, f)
        
def mkQrCode():
    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    img = qrcode.make("https://" + ip_address + ":2023")
    home = pd.home() + "/public/qrcode.png"
    img.save(home)
    pd.show(home)

def py4pdLoadObjects():
    pd.addobject(resetStartTime, "resetTime")
    pd.addobject(setStartTime, "setStartTime")
    pd.addobject(mkQrCode, "mkqrcode", objtype="VIS")
