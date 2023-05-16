// =====================================
// ========== VOICE STRUCTURES =========
// =====================================

class Baixo {
    constructor() {
        this.higherNote = 6000;
        this.lowerNote = 4300;
    }
}

// =====================================
class Tenor {
    constructor() {
        this.higherNote = 6200;
        this.lowerNote = 4800;
    }
}

// =====================================
class Contralto {
    constructor() {
        this.higherNote = 6900;
        this.lowerNote = 5600;
    }
}

// =====================================
class Soprano {
    constructor() {
        this.higherNote = 7400;
        this.lowerNote = 6000;
    }
}

// =====================================
// ========== TIME STRUCTURES ==========
// =====================================

class MicroEvent {
    constructor(eventNumber) {
        this.eventNumber = eventNumber;
        this.notes = [];
        this.notesProbabilities = [];
        this.notesMidicent = [];
        this.syllables = [];
        this.syllablesProbabilities = [];
        this.completePhrase = "";
        this.breathTime = 800;
        this.possibleDurations = [];
        this.mkPartialTracking = false;
    }
}

// =====================================
class MediumEvent {
    constructor(eventNumber) {
        this.MicroEvents = [];
        this.eventNumber = eventNumber;
        this.lastEvent = false;
        this.timeDuration = 0;
    }
}

// CREATOR
function createMicroEvent(eventNumber) {
    return new MicroEvent(eventNumber);
}

// ++++++++++++++++++++++++++++++++
function createMediumEvent(eventNumber) {
    return new MediumEvent(eventNumber);
}

// ++++++++++++++++++++++++++++++++
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// ++++++++++++++++++++++++++++++++
function listRandom(list){
    var index = randomInt(0, list.length - 1);
    return list[index];
}

// ==============================
// ++++++++++++++++++++++++++++++
// ++++++++++ EVENTS ++++++++++++
// ++++++++++++++++++++++++++++++
// ==============================

let pieceEvents = [];
// let transitionTime = randomInt(100, 200); 
// let sumORdecr = listRandom([0, 1]); // 0 = sum, 1 = decr

// ++++++++++++++++++++++++++++++++
// ++++++++++ Event 1 +++++++++++++
// ++++++++++++++++++++++++++++++++
let microEvent;
let mediumEvent;
let microEventTuplet;

mediumEvent = createMediumEvent(1);
microEventTuplet= randomInt(1, 3);
console.log("microEventTuplet: ", microEventTuplet);

if (microEventTuplet == 1) {
    // duracao total deve ser 10, 20, 10
    var times1 = [3333, 4000, 3000];
    var times2 = [3333, 4000, 3000];
    var times3 = [3334, 2000, 4000];
    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["Ha", "vi", "a", "tu", "do"];
    microEvent.syllablesProbabilities = [0.4, 0.4, 0.0666, 0.0666, 0.0666];
    microEvent.completePhrase = "Havia";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["Ha", "vi", "a", "tu", "do"];
    microEvent.syllablesProbabilities = [0.2, 0.6, 0.0666, 0.0666, 0.0666];
    microEvent.completePhrase = "Havia";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["Ha", "vi", "a", "tu", "do"];
    microEvent.syllablesProbabilities = [0.4, 0.4, 0.0666, 0.0666, 0.0666];
    microEvent.completePhrase = "Havia";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

}
else if (microEventTuplet == 2) {
    // duracao total deve ser 15, 15, 10
    var times1 = [5000, 7000, 3000];
    var times2 = [5000, 6000, 4000];
    var times3 = [5000, 2000, 8000];

    var microvariacao = randomInt(1, 3);
    
    microEvent = createMicroEvent(1);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["Ha", "vi", "a", "tu", "do"];
    microEvent.syllablesProbabilities = [0.4, 0.4, 0.0666, 0.0666, 0.0666];
    microEvent.completePhrase = "Havia";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["Ha", "vi", "a", "tu", "do"];
    microEvent.syllablesProbabilities = [0.4, 0.4, 0.0666, 0.0666, 0.0666];
    microEvent.completePhrase = "Havia";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["Ha", "vi", "a", "tu", "do"];
    microEvent.syllablesProbabilities = [0.4, 0.4, 0.0666, 0.0666, 0.0666];
    microEvent.completePhrase = "Havia";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);
}

else if (microEventTuplet == 3) {
    // duracao total deve ser 13.4, 13.3, 13.3

    var times1 = [5000, 6000, 7000];
    var times2 = [4500, 4500, 3500];
    var times3 = [3900, 2900, 2900];

    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["Ha", "vi", "a", "tu", "do"];
    microEvent.syllablesProbabilities = [0.4, 0.4, 0.0666, 0.0666, 0.0666];
    microEvent.completePhrase = "Havia";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.2, 0.4, 0.4];
    microEvent.completePhrase = "criou-se";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.2, 0.4, 0.4];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);
}

pieceEvents.push(mediumEvent); // or macroEvents


// ++++++++++++++++++++++++++++++++
// ++++++++++ Event 2 +++++++++++++
// ++++++++++++++++++++++++++++++++

mediumEvent = createMediumEvent(2);

if (microEventTuplet == 1) {
    // times1
    let times1 = [7000, 8000, 9000];
    let times2 = [7500, 6500, 5000];
    let times3 = [5500, 5500, 6000];

    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.10, 0.10, 0.70];
    microEvent.syllables = ["Cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.3333, 0.3333, 0.3333];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.40, 0.30, 0.20];
    microEvent.syllables = ["Cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.3333, 0.3333, 0.3333];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.40, 0.20, 0.30, 0.10];
    microEvent.syllables = ["Cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.3333, 0.3333, 0.3333];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

}
else if (microEventTuplet == 2) {
    // duracao total deve ser  15, 10
    var times1 = [5000, 7000, 3000];
    var times2 = [5000, 6000, 4000];
    var times3 = [5000, 2000, 8000];

    var microvariacao = randomInt(1, 3);
    
    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.10, 0.10, 0.70];
    microEvent.syllables = ["Cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.40, 0.30, 0.20];
    microEvent.syllables = ["Cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.3, 0.5, 0.2];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.40, 0.20, 0.30, 0.10];
    microEvent.syllables = ["Cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.2, 0.3, 0.5];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);
}

else if (microEventTuplet == 3) {
    // duracao total deve ser 13.3, 13.3

    let times1 = [5000, 6000, 7000];
    let times2 = [5000, 4000, 3300];
    let times3 = [3300, 3300, 3000];

    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.10, 0.10, 0.70];
    microEvent.syllables = ["Cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.10, 0.10, 0.70];
    microEvent.syllables = ["Cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.2, 0.5, 0.3];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.10, 0.10, 0.70];
    microEvent.syllables = ["Cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.3, 0.2, 0.5];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);
}

pieceEvents.push(mediumEvent); // or macroEvents

// ++++++++++++++++++++++++++++++++
// ++++++++++ Event 3 +++++++++++++
// ++++++++++++++++++++++++++++++++

mediumEvent = createMediumEvent(3);

if (microEventTuplet == 1) {
    // times1 10
    var times1 = [3333, 4000, 3000];
    var times2 = [3333, 4000, 3000];
    var times3 = [3334, 2000, 4000];

    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

}
else if (microEventTuplet == 2) {
    // duracao total deve ser 10
    var times1 = [3333, 4000, 3000];
    var times2 = [3333, 4000, 3000];
    var times3 = [3334, 2000, 4000];

    var microvariacao = randomInt(1, 3);
    
    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);
}

else if (microEventTuplet == 3) {
    let times1 = [5000, 6000, 7000];
    let times2 = [5000, 4000, 3300];
    let times3 = [3300, 3300, 3000];

    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    mediumEvent.MicroEvents.push(microEvent);
}

pieceEvents.push(mediumEvent); // or macroEvents


// ++++++++++++++++++++++++++++++++
// ++++++++++ Event 4 +++++++++++++
// ++++++++++++++++++++++++++++++++

// NOTE: here sync all the events

mediumEvent = createMediumEvent(4);

var tupletValue = randomInt(6, 10);
for (var i = 0; i < tupletValue; i++) {
    var tupletValueMs = 20000 / tupletValue;
    if (i == 0){
        var breathTimeValue = 1400;
    }
    else{
        var breathTimeValue = 500;
    }
    microEvent = createMicroEvent(i + 1);
    microEvent.notes = [["c#4", 6088], ["b+3", 5949]];
    microEvent.notesProbabilities = [0.9, 0.1];
    microEvent.syllables = ["tan", "to", "tu", "do"];
    microEvent.syllablesProbabilities = [0.25, 0.25, 0.25, 0.25];
    microEvent.completePhrase = "tanto tudo.";
    microEvent.breathTime = breathTimeValue;
    microEvent.possibleDurations = [tupletValueMs];
    mediumEvent.MicroEvents.push(microEvent);
}

pieceEvents.push(mediumEvent); // or macroEvents


// ++++++++++++++++++++++++++++++++
// ++++++++++ Event 5 +++++++++++++
// ++++++++++++++++++++++++++++++++
