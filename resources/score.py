from random import randint
import os
if os.name == 'nt':
    os.environ['QT_QPA_PLATFORM'] = "windows"
from neoscore.common import *
import sys

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

        # quarter-tone sharp
        'c+': ['c', 'accidentalQuarterToneSharpStein'],
        'd+': ['d', 'accidentalQuarterToneSharpStein'],
        'e+': ['e', 'accidentalQuarterToneSharpStein'],
        'f+': ['f', 'accidentalQuarterToneSharpStein'],
        'g+': ['g', 'accidentalQuarterToneSharpStein'],
        'a+': ['a', 'accidentalQuarterToneSharpStein'],
        'b+': ['b', 'accidentalQuarterToneSharpStein'],

        # quarter-tone flat
        'c-': ['c', 'accidentalQuarterToneFlatStein'],
        'd-': ['d', 'accidentalQuarterToneFlatStein'],
        'e-': ['e', 'accidentalQuarterToneFlatStein'],
        'f-': ['f', 'accidentalQuarterToneFlatStein'],
        'g-': ['g', 'accidentalQuarterToneFlatStein'],
        'a-': ['a', 'accidentalQuarterToneFlatStein'],
        'b-': ['b', 'accidentalQuarterToneFlatStein'],

        # three-quarter-tone sharp
        'c#+': ['c', 'accidentalThreeQuarterTonesSharpStein'],
        'd#+': ['d', 'accidentalThreeQuarterTonesSharpStein'],
        'e#+': ['e', 'accidentalThreeQuarterTonesSharpStein'],
        'f#+': ['f', 'accidentalThreeQuarterTonesSharpStein'],
        'g#+': ['g', 'accidentalThreeQuarterTonesSharpStein'],
        'a#+': ['a', 'accidentalThreeQuarterTonesSharpStein'],
        'b#+': ['b', 'accidentalThreeQuarterTonesSharpStein'],

        # three-quarter-tone flat
        'cb-': ['c', 'accidentalThreeQuarterTonesFlatZimmermann'],
        'db-': ['d', 'accidentalThreeQuarterTonesFlatZimmermann'],
        'eb-': ['e', 'accidentalThreeQuarterTonesFlatZimmermann'],
        'fb-': ['f', 'accidentalThreeQuarterTonesFlatZimmermann'],
        'gb-': ['g', 'accidentalThreeQuarterTonesFlatZimmermann'],
        'ab-': ['a', 'accidentalThreeQuarterTonesFlatZimmermann'],
        'bb-': ['b', 'accidentalThreeQuarterTonesFlatZimmermann'],
    }
    return note[pitch]

# ===============================================
# ===============================================
# ===============================================

def chord(pitches, silaba):
    try:
        neoscore.shutdown()
    except BaseException:
        pass
    neoscore.setup()

    if isinstance(pitches, str):
        pitches = [pitches]

    # make all string with small letters
    pitches = [x.lower() for x in pitches]
    # get this file path
    scriptFolder = os.path.dirname(os.path.realpath(__file__))
    # go one folder up in the script folder
    os.chdir(scriptFolder + "/../")

    py4pdTMPfolder = "./public/notes/"
    staffSoprano = Staff((Mm(0), Mm(0)), None, Mm(30))
    trebleClef = 'treble'
    Clef(ZERO, staffSoprano, trebleClef)
    staffBaixo = Staff((ZERO, Mm(20)), None, Mm(30))
    bassClef = 'bass'
    Clef(ZERO, staffBaixo, bassClef)
    Path.rect((Mm(-10), Mm(-10)), None, Mm(42), Mm(42),
              Brush(Color(255, 255, 255, 0)), Pen(thickness=Mm(0)))
    text = f"""
<p>
    <b>{silaba}</b>
</p>
"""
    default_font = neoscore.default_font # Alias just for docs legibility
    RichText(Point(x=Unit(26.0), y=Unit(30.0)), staffSoprano, text, Inch(0.7), default_font)
    pitch = ''

    for pitch in pitches:
        # in pitch remove not number
        pitchWithoutNumber = pitch.replace(pitch[-1], '')
        pitchOctave = int(pitch[-1])
        pitchClass, accidental = getpitchKey(pitchWithoutNumber)
        if pitchOctave < 4:
            Chordrest(Mm(10), staffBaixo, [(pitchClass, accidental, pitchOctave)], (int(1), int(1)))
        else:
            Chordrest(Mm(10), staffSoprano, [(pitchClass, accidental, pitchOctave)], (int(1), int(1)))
    thepitch = pitches[0]
    # replace # by s in thepitch
    thepitch = thepitch.replace('#', 's')

    notePathName = py4pdTMPfolder + "/" + thepitch + "-" + silaba + ".png"
    neoscore.render_image(rect=None, dest=notePathName, dpi=600, wait=True)
    neoscore.shutdown()
    if os.name == 'nt':
        notePathName = notePathName.replace("\\", "/")
    return None

# ===============================================
#   ["Cri", "ou"], ["o", "na", "da"] ["di", "an", "te"], ["tan", "to", "tu", "do"],  ["an", "te"];  ["tu", "do"];

import multiprocessing

processes = []
processesCalls = 0

def create_note(notename, accidental, octave, silaba):
    print(f"Criação da nota {notename + accidental + str(octave)}-{silaba}.png")
    chord(notename + accidental + str(octave), silaba)


silabas = ["Cri", "ou", "o", "na", "da", "di", "an", "te", "tan", "to", "tu", "do", "an", "te"]
silabas = list(dict.fromkeys(silabas))

notenames = ["c", "d", "e", "f", "g", "a", "b"]
totalofIterations = len(silabas) * len(notenames) * 7 * 3

for silaba in silabas:
    for notename in notenames:
        accidentals = ["", "+", "-", "#", "b", "#+", "b-"]
        for accidental in accidentals:
            for octave in range(2, 6):
                # excludes all notes that are low that G2
                if (notename in ["c", "d", "e", "f"] and octave == 2):
                    continue
                
                elif(notename in ["e", "f", "g", "a", "b"] and octave == 5):
                    continue
                else:
                    p = multiprocessing.Process(target=create_note, args=(notename, accidental, octave, silaba))
                    processes.append(p)
                    p.start()
                    totalofIterations -= 1
                    processesCalls += 1
                    print(f"Total of iterations: {totalofIterations}")
                    if (processesCalls == 16):
                        print("Waiting for processes to finish")
                        for p in processes:
                            p.join()
                        processesCalls = 0
                        processes = []


