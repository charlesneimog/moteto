from random import randint
import os
os.environ['QT_QPA_PLATFORM'] = "xcb" 
if os.name == 'nt':
    os.environ['QT_QPA_PLATFORM'] = "windows"
    

from neoscore.common import *


def getpitchKey(pitch, cents=0):
    note = {
        # natural
        'c': ['c', ''],
        'd': ['d', ''],
        'e': ['e', ''],
        'f': ['f', ''],
        'g': ['g', ''],
        'a': ['a', ''],
        'b': ['b', ''],
        # sharp
        'c#': ['c', 'accidentalSharp'],
        'd#': ['d', 'accidentalSharp'],
        'e#': ['e', 'accidentalSharp'],
        'f#': ['f', 'accidentalSharp'],
        'g#': ['g', 'accidentalSharp'],
        'a#': ['a', 'accidentalSharp'],
        'b#': ['b', 'accidentalSharp'],
        # flat
        'cb': ['c', 'accidentalFlat'],
        'db': ['d', 'accidentalFlat'],
        'eb': ['e', 'accidentalFlat'],
        'fb': ['f', 'accidentalFlat'],
        'gb': ['g', 'accidentalFlat'],
        'ab': ['a', 'accidentalFlat'],
        'bb': ['b', 'accidentalFlat'],
    }
    return note[pitch]


def chord(pitches):
    try:
        neoscore.shutdown()
    except BaseException:
        pass
    neoscore.setup()

    if isinstance(pitches, str):
        pitches = [pitches]

    # make all string with small letters
    pitches = [x.lower() for x in pitches]

    py4pdTMPfolder = "./"
    staffSoprano = Staff((Mm(0), Mm(0)), None, Mm(30))
    trebleClef = 'treble'
    Clef(ZERO, staffSoprano, trebleClef)
    staffBaixo = Staff((ZERO, Mm(20)), None, Mm(30))
    bassClef = 'bass'
    Clef(ZERO, staffBaixo, bassClef)
    Path.rect((Mm(-10), Mm(-10)), None, Mm(42), Mm(42),
              Brush(Color(255, 255, 255, 0)), Pen(thickness=Mm(0)))
    silaba = "Ky"
    text = f"""
<p>
    <b>{silaba}</b>
</p>
"""
    default_font = neoscore.default_font # Alias just for docs legibility
    RichText(Point(x=Unit(26.0), y=Unit(30.0)), staffSoprano, text, Inch(0.7), default_font)

    for pitch in pitches:
        # in pitch remove not number
        pitchWithoutNumber = pitch.replace(pitch[-1], '')
        pitchOctave = int(pitch[-1])
        pitchClass, accidental = getpitchKey(pitchWithoutNumber)
        note = [(pitchClass, accidental, pitchOctave)]
        if pitchOctave < 4:
            Chordrest(Mm(10), staffBaixo, note, (int(1), int(1)))
        else:
            Chordrest(Mm(10), staffSoprano, note, (int(1), int(1)))
    randomNumber = randint(1, 100)
    notePathName = py4pdTMPfolder + "/" + pitch + f"{randomNumber}.png"
    neoscore.render_image(rect=None, dest=notePathName, dpi=1500, wait=True)
    neoscore.shutdown()
    if os.name == 'nt':
        notePathName = notePathName.replace("\\", "/")
    return None


chord(["c4"])
