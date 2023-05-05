// ========================================================
// ====================  Score Events  ====================
// ========================================================
class ChoirEvent {
  constructor(eventNumber, notes, notesProbabilities, syllables, syllablesProbabilities) {
    this.eventNumber = eventNumber;
    this.notes = notes;
    this.notesProbabilities = notesProbabilities;
    this.syllables = syllables;
    this.syllablesProbabilities = syllablesProbabilities;
    this.naipe = "none";
  }
}

// ++++++++++++++++++++++++++++++++
function createChoirEvent(eventNumber, notes, notesProbabilities, syllables, syllablesProbabilities) {
    return new ChoirEvent(eventNumber, notes, notesProbabilities, syllables, syllablesProbabilities);
    }

// ++++++++++++++++++++++++++++++++
let choirEvents = [];

// ++++++++++++++++++++++++++++++++
// ++++++++++ Events ++++++++++++++
// ++++++++++++++++++++++++++++++++

let event1 = createChoirEvent(1, ["c4"], [1], ["No", "i-ní", "cio"], [0.33, 0.33, 0.33]);
choirEvents.push(event1);

// ++++++++++++++++++++++++++++++++

let event2 = createChoirEvent(2, ["c4", "c+4", "c-4"], [0.33, 0.33, 0.33], ["Já", "ha", "via", "tu", "do"], [0.25, 0.25, 0.10, 0.30, 0.10]);
choirEvents.push(event2);

// ========================================================
// ======================  Functions  =====================
// ========================================================

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


console.log("choirEvents.length = " + choirEvents.length);

// ++++++++++++++++++++++++
function chooseNoteName(eventNumber) {
    var event = choirEvents.find(event => event.eventNumber === eventNumber);

    // notas
    var notes = event.notes; 
    var notesProbabilities = event.notesProbabilities;
    var note = chooseWithProbabilities(notes, notesProbabilities);

    // silabas
    var syllables = event.syllables;
    var syllablesProbabilities = event.syllablesProbabilities;
    var syllable = chooseWithProbabilities(syllables, syllablesProbabilities);

    // create note name file
    var pngFile = "notes/" + note + "-" + syllable + ".png";
    var img = document.getElementById("imgNote"); // mostra a partitura
    img.src = pngFile;

    // sleep for 1 second
    setTimeout(function() {
        eventNumber = eventNumber + 1;
        if (eventNumber > choirEvents.length) {
            var pngFile = "fim.png";
            var img = document.getElementById("imgNote"); // mostra a partitura
            img.src = pngFile;
            return;
        }
        else{
            chooseNoteName(eventNumber);
        }
    }, 5000);
}



