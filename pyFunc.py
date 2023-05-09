import json
import os
import time
import pd

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

def py4pdLoadObjects():
    pd.addobject(resetStartTime, "resetTime")
    pd.addobject(setStartTime, "setStartTime")
