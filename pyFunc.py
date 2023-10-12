import pd

import sys
import json
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
    home = pd.get_patch_dir()
    with open(home + "/public/start.json", "w") as f:
        json.dump({"startTime": startTime}, f)

    
def resetStartTime():
    """ It saves (in public/start.json) the time that all connected devices should start to run."""
    home = pd.get_patch_dir()
    with open(home + "/public/start.json", "w") as f:
        json.dump({"startTime": 0}, f)
        
def mkQrCode():
    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    img = qrcode.make("https://" + ip_address + ":2023")
    home = pd.get_patch_dir() + "/public/qrcode.png"
    img.save(home)
    pd.show_image(home)

def py4pdLoadObjects():
    pd.add_object(resetStartTime, "resetTime")
    pd.add_object(setStartTime, "setStartTime")
    pd.add_object(mkQrCode, "mkqrcode", objtype=pd.VIS)
