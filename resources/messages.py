from random import randint
import os
if os.name == 'nt':
    os.environ['QT_QPA_PLATFORM'] = "windows"
from neoscore.common import *
import sys


def mensages(silaba):
    neoscore.setup()
    scriptFolder = os.path.dirname(os.path.realpath(__file__))
    # go one folder up in the script folder
    os.chdir(scriptFolder + "/../")
    py4pdTMPfolder = "./public/"
    Path.rect((Mm(-10), Mm(-10)), None, Mm(42), Mm(42),
              Brush(Color(255, 255, 255, 255)), Pen(thickness=Mm(0)))

    text = f"""
        <p style="text-align:center;">
            <b>{silaba}</b>
        </p>
    """

    default_font = neoscore.default_font # Alias just for docs legibility
    width = Inch(0.7) # set the width of the text area
    height = Inch(0.7) # set the height of the text area
    x = Mm(-10) + (Mm(42) - width) / 2 # center the text horizontally
    y = Mm(-5) + (Mm(42) - height) / 2 # center the text vertically
    RichText(Point(x=x, y=y), None, text, width, default_font)
    notePathName = py4pdTMPfolder + "/" + silaba + ".png"
    neoscore.render_image(rect=None, dest=notePathName, dpi=600, wait=True)
    neoscore.shutdown()
    if os.name == 'nt':
        notePathName = notePathName.replace("\\", "/")
    return None

if __name__ == '__main__':
    mensages(sys.argv[1])
