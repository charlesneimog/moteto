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
        this.breathTime = 0;
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

// Description: É uma pequena introdução, com uma única altura que na qual criamos um cluster.


let mediumEvent = createMediumEvent(1);
mediumEvent.timeDuration = 40000;


let microEvent;

// ++++
microEvent = createMicroEvent(1);
microEvent.notes = [["c4", 6000]];
microEvent.notesProbabilities = [1];
microEvent.syllables = ["Cri", "ou"];
microEvent.syllablesProbabilities = [0.4, 0.6];
microEvent.completePhrase = "Criou.";
microEvent.breathTime = 1000;
microEvent.possibleDurations = [5000, 4000, 6000];
mediumEvent.MicroEvents.push(microEvent);

// ++++
microEvent = createMicroEvent(2);
microEvent.notes = [["c4", 6000], ["c+4", 6050], ["b#+3", 5950]];
microEvent.notesProbabilities = [0.5, 0.25, 0.25];
microEvent.syllables = ["o", "na", "da"];
microEvent.syllablesProbabilities = [0.6, 0.3, 0.1];
microEvent.completePhrase = "o nada";
microEvent.breathTime = 1000;
microEvent.possibleDurations = [6000, 6000, 4000];
mediumEvent.MicroEvents.push(microEvent);

// ++++
microEvent = createMicroEvent(3);
microEvent.notes = [["c4", 6000], ["c+4", 6050], ["b+3", 5950]];
microEvent.notesProbabilities = [0.2, 0.4, 0.4];
microEvent.syllables = ["di", "an", "te"];
microEvent.syllablesProbabilities = [0.2, 0.4, 0.4];
microEvent.completePhrase = "diante";
microEvent.breathTime = 1000;
microEvent.possibleDurations = [4000, 5000, 4000];
mediumEvent.MicroEvents.push(microEvent);

// ++++
microEvent = createMicroEvent(4);
microEvent.notes = [["c+4", 6050], ["c#4", 6100], [["b3", 5900], ["b+3", 5950]]];
microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
microEvent.syllables = ["tan", "to", "tu", "do"];
microEvent.syllablesProbabilities = [0.25, 0.25, 0.25, 0.25];
microEvent.completePhrase = "tanto tudo.";
microEvent.breathTime = 1000;
microEvent.possibleDurations = [5000, 7000, 6000];
mediumEvent.MicroEvents.push(microEvent);

// ++++
microEvent = createMicroEvent(5);
microEvent.notes = [["c4", 6000], ["c+4", 6050], ["d-4", 6150], ["d4", 6200], ["b3", 5900], ["b-3", 5850]];
microEvent.notesProbabilities = [0.1, 0.2, 0.2, 0.2, 0.2, 0.1];
microEvent.syllables = ["an", "te"];
microEvent.syllablesProbabilities = [0.5, 0.5];
microEvent.completePhrase = "ante,";
microEvent.breathTime = 1000;
microEvent.possibleDurations = [5000, 5000, 3000];
mediumEvent.MicroEvents.push(microEvent);

// ++++
microEvent = createMicroEvent(6);
microEvent.notes = [["bb2", 4600], ["bb3", 5800], ["c4", 6002], ["d4", 6186]];
microEvent.notesProbabilities = [0.10, 0.15, 0.45, 0.30];
microEvent.syllables = ["tu", "do"];
microEvent.syllablesProbabilities = [0.5, 0.5];
microEvent.completePhrase = "tudo.";
microEvent.breathTime = 1000;
microEvent.possibleDurations = [6000, 3000, 6000];
mediumEvent.MicroEvents.push(microEvent);

// ++++
microEvent = createMicroEvent(7);
microEvent.notes = [["bb2", 4600], ["bb3", 5800], ["c4", 6002], ["d4", 6186]];
microEvent.notesProbabilities = [0.10, 0.15, 0.45, 0.30];
microEvent.syllables = ["Cri", "ou"];
microEvent.syllablesProbabilities = [0.2, 0.8];
microEvent.completePhrase = "Criou.";
microEvent.breathTime = 1000;
microEvent.possibleDurations = [9000, 10000, 11000];
microEvent.mkPartialTracking = true;
mediumEvent.MicroEvents.push(microEvent);

// ----- ADD EVENT TO PIECE ----
pieceEvents.push(mediumEvent);
// -----------------------------

// ++++++++++++++++++++++++++++++++
// ++++++++++ Event 2 +++++++++++++
// ++++++++++++++++++++++++++++++++

mediumEvent = createMediumEvent(2);
mediumEvent.timeDuration = 30000;
var quialtera = 1;


if (quialtera == 1) {
    // 15:30
    for (i = 0; i < 15; i++){
        microEvent = createMicroEvent(i);
        microEvent.notes = [["c5", 6000]];
        microEvent.notesProbabilities = [1];
        microEvent.syllables = ["o", "na", "da"];
        microEvent.syllablesProbabilities = [0.6, 0.3, 0.1];
        microEvent.completePhrase = "o nada";
        microEvent.breathTime = 200;
        microEvent.possibleDurations = [2000];
        mediumEvent.MicroEvents.push(microEvent);
    }
    // ----- ADD EVENT TO PIECE ----
    pieceEvents.push(mediumEvent);
    // -----------------------------
}

if (quialtera == 2) {
    for (i = 0; i < 13; i++){
        microEvent = createMicroEvent(i);
        microEvent.notes = [["c5", 6000]];
        microEvent.notesProbabilities = [1];
        microEvent.syllables = ["o", "na", "da"];
        microEvent.syllablesProbabilities = [0.6, 0.3, 0.1];
        microEvent.completePhrase = "o nada";
        microEvent.breathTime = 200;
        microEvent.possibleDurations = [2307.692];
        mediumEvent.MicroEvents.push(microEvent);
    }
    // ----- ADD EVENT TO PIECE ----
    pieceEvents.push(mediumEvent);
    // -----------------------------
}

if (quialtera == 3){
    for (i = 0; i < 12; i++){
        microEvent = createMicroEvent(i);
        microEvent.notes = [["c5", 6000]];
        microEvent.notesProbabilities = [1];
        microEvent.syllables = ["o", "na", "da"];
        microEvent.syllablesProbabilities = [0.6, 0.3, 0.1];
        microEvent.completePhrase = "o nada";
        microEvent.breathTime = 200;
        microEvent.possibleDurations = [2500];
        mediumEvent.MicroEvents.push(microEvent);
    }
    // ----- ADD EVENT TO PIECE ----
    pieceEvents.push(mediumEvent);
    // -----------------------------

}

if (quialtera == 4){
    for (i = 0; i < 9; i++){
        microEvent = createMicroEvent(i);
        microEvent.notes = [["c5", 6000]];
        microEvent.notesProbabilities = [1];
        microEvent.syllables = ["o", "na", "da"];
        microEvent.syllablesProbabilities = [0.6, 0.3, 0.1];
        microEvent.completePhrase = "o nada";
        microEvent.breathTime = 200;
        microEvent.possibleDurations = [3333.33];
        mediumEvent.MicroEvents.push(microEvent);
    }
    // ----- ADD EVENT TO PIECE ----
    pieceEvents.push(mediumEvent);
    // -----------------------------

}





