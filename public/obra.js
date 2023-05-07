// ========================================================
// ====================  Score Events  ====================
// ========================================================
class ChoirEvent {
    constructor(eventNumber) {
        this.eventNumber = eventNumber;
        this.notes = [];
        this.notesProbabilities = [];
        this.notesMidicent = [];
        this.syllables = [];
        this.syllablesProbabilities = [];
        this.completePhrase = "";
        this.naipe = "";
        this.breathTime = 0;
        this.duration = 0;
    }
}

// ++++++++++++++++++++++++++++++++
// activate audio context
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

// ++++++++++++++++++++++++++++++++
function createChoirEvent(eventNumber) {
    return new ChoirEvent(eventNumber);
}

// ++++++++++++++++++++++++++++++++

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// ++++++++++++++++++++++++++++++++
function listRandom(list){
    // choose one number in the list
    var index = randomInt(0, list.length - 1);
    return list[index];
}

// ========================================================
// ++++++++++++++++++++++++++++++++
let choirEvents = [];
let transitionTime = randomInt(100, 500); 
let sumORdecr = listRandom([0, 1]); // 0 = sum, 1 = decr

// ++++++++++++++++++++++++++++++++
// ++++++++++ Events ++++++++++++++
// ++++++++++++++++++++++++++++++++

let event1 = createChoirEvent(1);
event1.notes = [["c4", 6000]];
event1.notesProbabilities = [1];
event1.syllables = ["No", "i-ní", "cio"];
event1.syllablesProbabilities = [0.33, 0.33, 0.33];
event1.completePhrase = "No início";
event1.breathTime = 1000;
choirEvents.push(event1);

// ++++++++++++++++++++++++++++++++
let event2 = createChoirEvent(2);
event2.notes = [["c4", 6000], ["c+4", 6050], ["c#4", 6100]];
event2.notesProbabilities = [0.5, 0.25, 0.25];
event2.syllables = ["Ha", "via", "tu", "do"];
event2.syllablesProbabilities = [0.35, 0.05, 0.25, 0.25];
event2.completePhrase = "Havia tudo.";
event2.breathTime = 700;
choirEvents.push(event2);

// ========================================================
// ======================  Functions  =====================
// ========================================================

function midicent2Freq(midicent) {
    var freq = 440 * Math.pow(2, (midicent - 6900) / 1200);
    return freq;
}

// ++++++++++++++++++++++++
function chooseWithProbabilities(elements, probabilities) {
    var cumulativeProbabilities = [];
    var sum = 0;
    for (var i = 0; i < probabilities.length; i++) {
        sum += probabilities[i];
        cumulativeProbabilities.push(sum);
    }
    const random = Math.random();
    var index = 0;
    while (index < cumulativeProbabilities.length && cumulativeProbabilities[index] < random) {
        index++;
    }
    return elements[index];
}

// ++++++++++++++++++++++++
async function showNoteAndBreath(pngPitchFile, eventClass, midicent) {
    // show the breath image
    var pngFile = "respire.png";
    var eventDuration = eventClass.duration;
    var img = document.getElementById("imgNote");
    img.src = pngFile;
    completePhrase = document.getElementById("completePhrase");
    completePhrase.innerHTML = "";


    // delay for 500ms
    await new Promise((resolve) => setTimeout(resolve, eventClass.breathTime)); // TODO: rethink about this

    // show the note image
    img = document.getElementById("imgNote");
    img.src = pngPitchFile;

    loader.sendFloatParameterToWorklet("freq", midicent2Freq(midicent));
    loader.sendFloatParameterToWorklet("duration", eventDuration - 500);
    loader.sendEvent("start");

    // create one 
    completePhrase.innerHTML = eventClass.completePhrase;

}

// ++++++++++++++++++++++++
function chooseNoteName(eventNumber) {
    var event = choirEvents.find(event => event.eventNumber === eventNumber);

    // notas
    var notes = event.notes; 
    var notesProbabilities = event.notesProbabilities;
    var noteAndMidicent = chooseWithProbabilities(notes, notesProbabilities);
    var note = noteAndMidicent[0];
    var midicent = noteAndMidicent[1];

    // silabas
    var syllables = event.syllables;
    var syllablesProbabilities = event.syllablesProbabilities;
    var syllable = chooseWithProbabilities(syllables, syllablesProbabilities);

    // create note name file
    var pngFile = "notes/" + note + "-" + syllable + ".png";

    var timeOut = 5000;
    if (sumORdecr == 0) {
        timeOut = timeOut + transitionTime;
        sumORdecr = 1;
    }
    else {
        timeOut = timeOut - transitionTime;
        sumORdecr = 0;
    }
    event.duration = timeOut;
    showNoteAndBreath(pngFile, event, midicent);

    // sleep for 1 second
    setTimeout(function() {
        eventNumber = eventNumber + 1;
        if (eventNumber > choirEvents.length) {
            var pngFile = "fim.png";
            var img = document.getElementById("imgNote"); // mostra a partitura
            img.src = pngFile;
            completePhrase = document.getElementById("completePhrase");
            completePhrase.innerHTML = "";
            return;
        }
        else{
            chooseNoteName(eventNumber);
        }
    }, timeOut);
}



