// ++++++++++++++++++++++++++++++++
// ++++++++++ Classes +++++++++++++
// ++++++++++++++++++++++++++++++++

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
class MicroEvent {
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
        this.possibleDurations = [];
        this.duration = 0;
    }
}

// =====================================
class MediumEvent {
    constructor(eventNumber) {
        this.MicroEvents = [];
        this.eventNumber = eventNumber;
    }
}

// ++++++++++++++++++++++++++++++++
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
    // choose one number in the list
    var index = randomInt(0, list.length - 1);
    return list[index];
}

// ++++++++++++++++++++++++++++++++
let pieceEvents = [];
let transitionTime = randomInt(100, 500); 
let sumORdecr = listRandom([0, 1]); // 0 = sum, 1 = decr


// ++++++++++++++++++++++++++++++++
// ++++++++++ Event 1 +++++++++++++
// ++++++++++++++++++++++++++++++++

let mediumEvent1 = createMediumEvent(1);
let microEvent1 = createMicroEvent(1);
microEvent1.notes = [["c4", 6000]];
microEvent1.notesProbabilities = [1];
microEvent1.syllables = ["Cri", "ou"];
microEvent1.syllablesProbabilities = [0.4, 0.6];
microEvent1.completePhrase = "Criou.";
microEvent1.breathTime = 1000;
microEvent1.possibleDurations = [5000, 4000, 6000];
mediumEvent1.MicroEvents.push(microEvent1);

// ++++++++++++++++++++++++++++++++
let microEvent2 = createMicroEvent(2);
microEvent2.notes = [["c4", 6000], ["c+4", 6050], ["c#4", 6100]];
microEvent2.notesProbabilities = [0.5, 0.25, 0.25];
microEvent2.syllables = ["o", "na", "da"];
microEvent2.syllablesProbabilities = [0.6, 0.3, 0.1];
microEvent2.completePhrase = "o nada";
microEvent2.breathTime = 1000;
microEvent2.possibleDurations = [6000, 6000, 4000];
mediumEvent1.MicroEvents.push(microEvent2);

// ++++++++++++++++++++++++++++++++
let microEvent3 = createMicroEvent(3);
microEvent3.notes = [["c4", 6000], ["c+4", 6050], ["c#4", 6100]];
microEvent3.notesProbabilities = [0.2, 0.4, 0.4];
microEvent3.syllables = ["di", "an", "te"];
microEvent3.syllablesProbabilities = [0.2, 0.4, 0.4];
microEvent3.completePhrase = "diante";
microEvent3.breathTime = 1000;
microEvent3.possibleDurations = [4000, 5000, 4000];
mediumEvent1.MicroEvents.push(microEvent3);

// ++++++++++++++++++++++++++++++++
let microEvent4 = createMicroEvent(4);
microEvent4.notes = [["c+4", 6050], ["c#4", 6100], [["b3", 5900], ["b+3", 5950]]];
microEvent4.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
microEvent4.syllables = ["tan", "to", "tu", "do"];
microEvent4.syllablesProbabilities = [0.25, 0.25, 0.25, 0.25];
microEvent4.completePhrase = "tanto tudo.";
microEvent4.breathTime = 1000;
microEvent4.possibleDurations = [5000, 7000, 6000];
mediumEvent1.MicroEvents.push(microEvent4);

// ++++++++++++++++++++++++++++++++
let microEvent5 = createMicroEvent(5);
microEvent5.notes = [["c4", 6000], ["c+4", 6050], ["c#+4", 6150], ["d4", 6200], ["b3", 5900], ["b-3", 5850]];
microEvent5.notesProbabilities = [0.1, 0.2, 0.2, 0.2, 0.2, 0.1];
microEvent5.syllables = ["an", "te"];
microEvent5.syllablesProbabilities = [0.5, 0.5];
microEvent5.completePhrase = "ante,";
microEvent5.breathTime = 1000;
microEvent5.possibleDurations = [5000, 5000, 3000];
mediumEvent1.MicroEvents.push(microEvent5);


// ++++++++++++++++++++++++++++++++
let microEvent6 = createMicroEvent(6);
microEvent6.notes = [["bb2", 4600], ["bb3", 5800], ["c4", 6002], ["d4", 6186]];
microEvent6.notesProbabilities = [0.10, 0.15, 0.45, 0.30];
microEvent6.syllables = ["tu", "do"];
microEvent6.syllablesProbabilities = [0.5, 0.5];
microEvent6.completePhrase = "tudo.";
microEvent6.breathTime = 1000;
microEvent6.possibleDurations = [6000, 3000, 6000];
mediumEvent1.MicroEvents.push(microEvent6);

// ++++++++++++++++++++++++++++++++
let microEvent7 = createMicroEvent(7);
microEvent7.notes = [["bb2", 4600], ["bb3", 5800], ["c4", 6002], ["d4", 6186]];
microEvent7.notesProbabilities = [0.10, 0.15, 0.45, 0.30];
microEvent7.syllables = ["tu", "do"];
microEvent7.syllablesProbabilities = [0.5, 0.5];
microEvent7.completePhrase = "tudo.";
microEvent7.breathTime = 1000;
microEvent7.possibleDurations = [9000, 10000, 11000];
mediumEvent1.MicroEvents.push(microEvent7);

// ++++++++++++++++++++++++++++++++

pieceEvents.push(mediumEvent1);
