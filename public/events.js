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
        this.microEventString = "";
        this.possibleDurations = [];
        this.mkPartialTracking = false;
        this.clearPartialTracking = false;
        this.replaceNotes = false;
        this.notes2replace = [];
        // respire
        this.breath = false;
        this.breathProbability = 0;
    }
    
    getDuration(){
        // console.log("microevent dur: " + this.possibleDurations[0]);
        return this.possibleDurations[0];
    }
}

// =====================================
class MediumEvent {
    constructor(eventNumber) {
        this.MicroEvents = [];
        this.eventNumber = eventNumber;
        this.lastEvent = false;
        this.totalDuration = 0;
    }

    getDuration(){
        return this.totalDuration;
    }

    add(microEvent){
        this.MicroEvents.push(microEvent);
        this.totalDuration += microEvent.getDuration();
        // console.log("Total duration: " + this.totalDuration);
    }

}

// =====================================
class MacroEvent {
    constructor(eventNumber){
        this.MediumEvents = [];
        this.eventNumber = eventNumber;
        this.totalDuration = 0;
        this.thisEventNumber = 0;
    }
    getDuration(){
        return this.totalDuration;
    }

    add(mediumEvent){
        this.MediumEvents.push(mediumEvent);
        this.totalDuration += mediumEvent.getDuration();
    }
}

// =====================================
class PieceEvent {
    constructor(){
        this.allMacroEvents = [];
        this.totalDuration = 0;
    }

    // make function to get the total duration the the piece event
    getDuration(){
        return this.totalDuration;
    }

    add(macroEvent){
        this.allMacroEvents.push(macroEvent);
        this.totalDuration += macroEvent.getDuration();
        console.log("Total duration: " + this.totalDuration);
    }

}

// ========
// CREATORS
// ========

function createMicroEvent(eventNumber) {
    return new MicroEvent(eventNumber);
}

// ++++++++++++++++++++++++++++++++
function createMediumEvent(eventNumber) {
    return new MediumEvent(eventNumber);
}

// ++++++++++++++++++++++++++++++++
function createMacroEvent(eventNumber) {
    return new MacroEvent(eventNumber);    
}

// ++++++++++++++++++++++++++++++++
function createPieceEvents(eventNumber) {
    return new PieceEvent(eventNumber);    
}

// =========================================================== //
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// ++++++++++ ALL EVENTS ++++++++++++++++ ALL EVENTS +++++++++ //
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// =========================================================== //

let pieceEvents;
let macroEvent;
let mediumEvent;
let microEvent;


pieceEvents = createPieceEvents();

// ++++++++++++++++++++++++++++++++
// ++++++++++ MACRO Event 1 +++++++
// ++++++++++++++++++++++++++++++++

// /*
macroEvent = createMacroEvent(1);
let microEventTuplet= randomInt(1, 3);
console.log("Tuplet variation of Macro event 1: " + microEventTuplet);

if (microEventTuplet == 1) {
    var totalDuration = 0;
    mediumEvent = createMediumEvent(1);
    var times1 = [3333, 4000, 3000];
    var times2 = [3333, 4000, 3000];
    var times3 = [4334, 3000, 5000];
    var microvariacao = randomInt(1, 3);
    microEvent = createMicroEvent(1);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["ha", "vi", "a", "tu", "do"];
    microEvent.syllablesProbabilities = [0.4, 0.4, 0.0666, 0.0666, 0.0666];
    microEvent.completePhrase = "Havia";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.1.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["ha", "vi", "a", "tu", "do"];
    microEvent.syllablesProbabilities = [0.2, 0.6, 0.0666, 0.0666, 0.0666];
    microEvent.completePhrase = "Havia";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.1.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["ha", "vi", "a", "tu", "do"];
    microEvent.syllablesProbabilities = [0.4, 0.4, 0.0666, 0.0666, 0.0666];
    microEvent.completePhrase = "Havia";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.1.3";
    mediumEvent.add(microEvent);

    // ==== add macro event to piece event ====
    macroEvent.add(mediumEvent); 
    // ========================================


    mediumEvent = createMediumEvent(2);
    times1 = [7000, 7000, 8000];
    times2 = [6500, 6500, 5000];
    times3 = [5500, 5500, 6000];
    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.10, 0.10, 0.70];
    microEvent.syllables = ["cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.3333, 0.3333, 0.3333];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.2.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.40, 0.30, 0.20];
    microEvent.syllables = ["cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.3333, 0.3333, 0.3333];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.2.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.40, 0.20, 0.30, 0.10];
    microEvent.syllables = ["cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.3333, 0.3333, 0.3333];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.2.3";
    mediumEvent.add(microEvent);

    // MACRO EVENT
    macroEvent.add(mediumEvent); 

    mediumEvent = createMediumEvent(3);
    // times1 10
    times1 = [3333, 4000, 3000];
    times2 = [3333, 4000, 3000];
    times3 = [3334, 2000, 4000];

    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.3.1"; 
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.3.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.3.3";
    mediumEvent.add(microEvent);

    // ==== add macro event to piece event ====
    macroEvent.add(mediumEvent); 
    // ========================================
}

else if (microEventTuplet == 2) {
    mediumEvent = createMediumEvent(1);
    var times1 = [5000, 7000, 3000];
    var times2 = [5000, 6000, 4000];
    var times3 = [5000, 2000, 8000];

    var microvariacao = randomInt(1, 3);
    
    microEvent = createMicroEvent(1);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["ha", "vi", "a", "tu", "do"];
    microEvent.syllablesProbabilities = [0.4, 0.4, 0.0666, 0.0666, 0.0666];
    microEvent.completePhrase = "Havia";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.1.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["ha", "vi", "a", "tu", "do"];
    microEvent.syllablesProbabilities = [0.4, 0.4, 0.0666, 0.0666, 0.0666];
    microEvent.completePhrase = "Havia";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.1.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["ha", "vi", "a", "tu", "do"];
    microEvent.syllablesProbabilities = [0.4, 0.4, 0.0666, 0.0666, 0.0666];
    microEvent.completePhrase = "Havia";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.1.3";
    mediumEvent.add(microEvent);

    // MACRO EVENT
    macroEvent.add(mediumEvent);


    mediumEvent = createMediumEvent(2);
    times1 = [5000, 7000, 3000];
    times2 = [5000, 6000, 4000];
    times3 = [5000, 2000, 8000];
    var microvariacao = randomInt(1, 3);
    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.10, 0.10, 0.70];
    microEvent.syllables = ["cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.2.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.40, 0.30, 0.20];
    microEvent.syllables = ["cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.3, 0.5, 0.2];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.2.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.40, 0.20, 0.30, 0.10];
    microEvent.syllables = ["cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.2, 0.3, 0.5];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.2.3";
    mediumEvent.add(microEvent);

    // MACRO EVENT
    macroEvent.add(mediumEvent); 

    mediumEvent = createMediumEvent(3);
    times1 = [3333, 4000, 3000];
    times2 = [3333, 4000, 3000];
    times3 = [3334, 2000, 4000];
    var microvariacao = randomInt(1, 3);
    
    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.3.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.3.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.3.3";
    mediumEvent.add(microEvent);
    
    // MACRO EVENT
    macroEvent.add(mediumEvent);

}

else if (microEventTuplet == 3) {
    // duracao total deve ser 13.4, 13.3, 13.3

    mediumEvent = createMediumEvent(1);
    var times1 = [5000, 6000, 7000];
    var times2 = [4500, 4500, 3500];
    var times3 = [3900, 2900, 2900];
    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["ha", "vi", "a", "tu", "do"];
    microEvent.syllablesProbabilities = [0.4, 0.4, 0.0666, 0.0666, 0.0666];
    microEvent.completePhrase = "Havia";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.1.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.2, 0.4, 0.4];
    microEvent.completePhrase = "criou-se";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.1.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.2, 0.4, 0.4];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.1.3";
    mediumEvent.add(microEvent);
    
    // MACRO EVENT
    macroEvent.add(mediumEvent);


    mediumEvent = createMediumEvent(2);
    times1 = [5000, 6000, 7000];
    times2 = [5000, 4000, 3300];
    times3 = [3300, 3300, 3000];
    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.10, 0.10, 0.70];
    microEvent.syllables = ["cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.2.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.10, 0.10, 0.70];
    microEvent.syllables = ["cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.2, 0.5, 0.3];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.2.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.10, 0.10, 0.70];
    microEvent.syllables = ["cri", "ou", "se"];
    microEvent.syllablesProbabilities = [0.3, 0.2, 0.5];
    microEvent.completePhrase = "Criou-se";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.2.3";
    mediumEvent.add(microEvent);

    // MACRO EVENT
    macroEvent.add(mediumEvent);

    mediumEvent = createMediumEvent(3);
    times1 = [5000, 6000, 7000];
    times2 = [5000, 4000, 3300];
    times3 = [3300, 3300, 3000];
    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.3.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.3.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = ["o", "na", "da"];
    microEvent.syllablesProbabilities = [0.5, 0.3, 0.2];
    microEvent.completePhrase = "o nada";
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.3.3";
    mediumEvent.add(microEvent);

    // MACRO EVENT
    macroEvent.add(mediumEvent);
}

pieceEvents.add(macroEvent);

if (pieceEvents.getDuration() != 40000){
    alert("Algum erro aconteceu, recarregue a página");
}

// ++++++++++++++++++++++++++++++++
// ++++++++++ MACRO Event 2 +++++++
// ++++++++++++++++++++++++++++++++

// NOTE: here sync all the events

macroEvent = createMacroEvent(2);
microEventTuplet= randomInt(1, 3);
console.log("Tuplet variation of Macro event 2: " + microEventTuplet);
 
if (microEventTuplet == 1) {
    // -------- microEvent 2.1 --------
    mediumEvent = createMediumEvent(4);
    var tupletValue = randomInt(6, 10);
    totalDuration = 0;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 20000 / tupletValue;
        if (i == 0){
            var breathTimeValue = 1400;
        }
        else{
            var breathTimeValue = 500;
        }
        totalDuration += tupletValueMs;
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["c#4", 6088], ["b+3", 5949]];
        microEvent.notesProbabilities = [0.9, 0.1];
        microEvent.syllables = ["tan", "to", "tu", "do"];
        microEvent.syllablesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.completePhrase = "tanto tudo.";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);
    
    // -------- microEvent 2.2 --------
    mediumEvent = createMediumEvent(5);
    var tupletValue = randomInt(3, 6);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 20000 / tupletValue;
        var breathTimeValue = 1500;
        totalDuration += tupletValueMs;
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["b+3", 5949], ["c#4", 6084], ["g3", 5466], ["e4", 6400]];
        microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.syllables = ["to", "cou", "a", "á", "gua"];
        microEvent.syllablesProbabilities = [0.2, 0.2, 0.2, 0.2, 0.2];
        microEvent.completePhrase = "tocou a água.";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 2.3 --------
    mediumEvent = createMediumEvent(5);
    microEvent = createMicroEvent(1);
    microEvent.notes = [["e3", 5200], ["c#4", 6084], ["e4", 6400], ["g4", 6666]]; 
    microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
    microEvent.syllables = ["a", "chou", "vi", "da", "ao", "o", "ce", "a", "no", "fun", "da", "do"];
    microEvent.syllablesProbabilities = [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08];
    microEvent.completePhrase = "Achou, vida ao oceano, fundado.";
    microEvent.breathTime = 1000;
    microEvent.possibleDurations = [5000];
    microEvent.microEventString = "2.3.1";
    mediumEvent.add(microEvent);
    macroEvent.add(mediumEvent);

     // -------- microEvent 2.4 --------
    mediumEvent = createMediumEvent(6);
    var tupletValue = randomInt(2, 4);
    for (var i = 0; i < tupletValue; i++) {
        microEvent = createMicroEvent(i + 1);
        var tupletValueMs = 15000 / tupletValue;
        totalDuration += tupletValueMs;
        microEvent.notes = [["e3", 5200], ["f#3", 5400], ["e4", 6400], ["f#4", 6600], ["d4", 6169]];
        microEvent.notesProbabilities = [0.2, 0.2, 0.2, 0.2, 0.2];
        microEvent.syllables = ["chão", "pen", "sou", "que", "a", "ter", "ra", "nas", "ceu"];
        microEvent.syllablesProbabilities = [0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111];
        microEvent.completePhrase = "Chão, pensou que a terra nasceu.";
        microEvent.breathTime = 1000;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.4." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);
}

else if (microEventTuplet == 2) {
    // VARIAÇÃO 2
    // -------- microEvent 2.1 --------
    mediumEvent = createMediumEvent(4);
    var tupletValue = randomInt(2, 3);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 12000 / tupletValue;
        var breathTimeValue = 500;
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["c#4", 6088], ["b+3", 5949]];
        microEvent.notesProbabilities = [0.9, 0.1];
        microEvent.syllables = ["tan", "to", "tu", "do"];
        microEvent.syllablesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.completePhrase = "tanto tudo.";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);
    
    // -------- microEvent 2.2 --------
    mediumEvent = createMediumEvent(5);
    var tupletValue = randomInt(2, 5);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 12000 / tupletValue;
        var breathTimeValue = 500;
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["b+3", 5949], ["c#4", 6084], ["g3", 5466], ["e4", 6400]];
        microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.syllables = ["to", "cou", "a", "a", "gua"];
        microEvent.syllablesProbabilities = [0.2, 0.2, 0.2, 0.2, 0.2];
        microEvent.completePhrase = "tocou a água.";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 2.3 --------
    mediumEvent = createMediumEvent(6);
    var tupletValue = randomInt(2, 5);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 12000 / tupletValue;
        var breathTimeValue = 500;
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["b+3", 5949], ["c#4", 6084], ["g3", 5466], ["e4", 6400]];
        microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.syllables = ["to", "cou", "a", "a", "gua"];
        microEvent.syllablesProbabilities = [0.2, 0.2, 0.2, 0.2, 0.2];
        microEvent.completePhrase = "tocou a água.";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 2.4 --------
    mediumEvent = createMediumEvent(7);
    var tupletValue = randomInt(2, 5);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 12000 / tupletValue;
        var breathTimeValue = 500;
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["b+3", 5949], ["c#4", 6084], ["g3", 5466], ["e4", 6400]];
        microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.syllables = ["to", "cou", "a", "a", "gua"];
        microEvent.syllablesProbabilities = [0.2, 0.2, 0.2, 0.2, 0.2];
        microEvent.completePhrase = "tocou a água.";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.4." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 2.5 --------
    mediumEvent = createMediumEvent(8);
    var tupletValue = randomInt(2, 5);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 12000 / tupletValue;
        var breathTimeValue = 500;
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["b+3", 5949], ["c#4", 6084], ["g3", 5466], ["e4", 6400]];
        microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.syllables = ["to", "cou", "a", "a", "gua"];
        microEvent.syllablesProbabilities = [0.2, 0.2, 0.2, 0.2, 0.2];
        microEvent.completePhrase = "tocou a água.";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.5." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);
}

else if (microEventTuplet == 3) {
        // VARIAÇÃO 2
    mediumEvent = createMediumEvent(4);
    var tupletValue = randomInt(3, 7);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 23000 / tupletValue;
        var breathTimeValue = 500;
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["c#4", 6088], ["b+3", 5949]];
        microEvent.notesProbabilities = [0.9, 0.1];
        microEvent.syllables = ["tan", "to", "tu", "do"];
        microEvent.syllablesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.completePhrase = "tanto tudo.";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 2.2 --------
    mediumEvent = createMediumEvent(5);
    var tupletValue = randomInt(2, 4);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 20000 / tupletValue;
        var breathTimeValue = 500;
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["b+3", 5949], ["c#4", 6084], ["g3", 5466], ["e4", 6400]];
        microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.syllables = ["to", "cou", "a", "a", "gua"];
        microEvent.syllablesProbabilities = [0.2, 0.2, 0.2, 0.2, 0.2];
        microEvent.completePhrase = "tocou a água.";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 2.5 --------
    mediumEvent = createMediumEvent(8);
    var tupletValue = randomInt(2, 4);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 17000 / tupletValue;
        var breathTimeValue = 500;
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["b+3", 5949], ["c#4", 6084], ["g3", 5466], ["e4", 6400]];
        microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.syllables = ["to", "cou", "a", "a", "gua"];
        microEvent.syllablesProbabilities = [0.2, 0.2, 0.2, 0.2, 0.2];
        microEvent.completePhrase = "tocou a água.";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.5." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);
}

pieceEvents.add(macroEvent);


if (pieceEvents.getDuration() != 100000){
    alert("Algum erro aconteceu, recarregue a página");
}


// ++++++++++++++++++++++++++++++++
// ++++++++++ MACRO Event 3 +++++++
// ++++++++++++++++++++++++++++++++

macroEvent = createMacroEvent(3);
microEventTuplet = randomInt(1, 3);
console.log("Tuplet variation of Macro event 3: " + microEventTuplet);

if (microEventTuplet == 1) {
    // -------- microEvent 3.1 --------
    mediumEvent = createMediumEvent(9);
    var tupletValue = randomInt(6, 10);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 27500 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6413], ["b3", 5915], ["g#4", 6800], ["d3", 4982], ["f#3", 5417], ["a#3", 5765], ["c#4", 6054], ["d#4", 6301]];
        microEvent.notesProbabilities = [0.1, 0.1, 0.1, 0.1, 0.1, 0.15, 0.15, 0.1];
        microEvent.syllables = ["a", "chou", "vi", "da", "ao", "o", "ce", "a", "no", "fun", "da", "do"];
        microEvent.syllablesProbabilities = [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08];
        microEvent.notes2replace = [6413, 7115, 6800, 6182, 6617, 6965, 6054, 6301];
        microEvent.completePhrase = "Achou, Vida ao oceano, fundado.";
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 3.2 --------
    mediumEvent = createMediumEvent(10);
    var tupletValue = randomInt(6, 10);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 20000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6413], ["b3", 5915], ["g#4", 6800], ["d3", 4982], ["f#3", 5417], ["a#+3", 5765], ["c+4", 6054], ["d#4", 6301]];
        microEvent.notesProbabilities = [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]; 
        // "Chão, pensou que a terra nasceu."
        microEvent.syllables = ["chão", "pen", "sou", "que", "a", "ter", "ra", "nas", "ceu"]; 
        microEvent.syllablesProbabilities = [0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111];
        microEvent.notes2replace = [6386, 7087, 6772, 6154, 6589, 6937, 6026, 6274, 6490];
        microEvent.completePhrase = "Chão, pensou que a terra nasceu.";
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 3.3 --------
    mediumEvent = createMediumEvent(11);
    var tupletValue = randomInt(6, 10);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 20000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6386], ["b4", 7087.96], ["g#4", 6772.31], ["c#+4", 6154.83], ["f#+4", 6589.91], ["a4", 6937.32], ["c+4", 6026.53], ["d#4", 6274.27]];
        microEvent.notesProbabilities = [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]; 
        //Tocou-se, ilusão,
        microEvent.syllables = ["to", "cou", "se", "i", "lu", "são"];
        microEvent.syllablesProbabilities = [0.166, 0.166, 0.166, 0.166, 0.166, 0.166];
        microEvent.notes2replace = [6386, 7087, 6772, 6154, 6589, 6937, 6026, 6274, 6490, 6683, 6856, 7014, 7158];
        microEvent.completePhrase = "Tocou-se, ilusão,";
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);
    pieceEvents.add(macroEvent);
}

else if (microEventTuplet == 2) {
    // -------- microEvent 3.1 --------
    mediumEvent = createMediumEvent(9);
    var tupletValue = randomInt(6, 10);
    totalDuration = 0;
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 22500 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6413], ["b3", 5915], ["g#4", 6800], ["d3", 4982], ["f#3", 5417], ["a#3", 5765], ["c#4", 6054], ["d#4", 6301]];
        microEvent.notesProbabilities = [0.1, 0.1, 0.1, 0.1, 0.1, 0.15, 0.15, 0.1];
        microEvent.syllables = ["a", "chou", "vi", "da", "ao", "o", "ce", "a", "no", "fun", "da", "do"];
        microEvent.syllablesProbabilities = [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08];
        microEvent.notes2replace = [6413, 7115, 6800, 6182, 6617, 6965, 6054, 6301];
        microEvent.completePhrase = "Achou, Vida ao oceano, fundado.";
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 3.2 --------
    mediumEvent = createMediumEvent(10);
    var tupletValue = randomInt(6, 10);
    totalDuration = 0;
    var breathTimeValue = 500;
        for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 20000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6413], ["b3", 5915], ["g#4", 6800], ["d3", 4982], ["f#3", 5417], ["a#+3", 5765], ["c+4", 6054], ["d#4", 6301]];
        microEvent.notesProbabilities = [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]; 
        // "Chão, pensou que a terra nasceu."
        microEvent.syllables = ["chão", "pen", "sou", "que", "a", "ter", "ra", "nas", "ceu"]; 
        microEvent.syllablesProbabilities = [0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111];
        microEvent.notes2replace = [6386, 7087, 6772, 6154, 6589, 6937, 6026, 6274, 6490];
        microEvent.completePhrase = "Chão, pensou que a terra nasceu.";
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 3.3 --------
    mediumEvent = createMediumEvent(11);
    var tupletValue = randomInt(6, 10);
    totalDuration = 0;
    var breathTimeValue = 500;
        for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 25000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6386], ["b4", 7087.96], ["g#4", 6772.31], ["c#+4", 6154.83], ["f#+4", 6589.91], ["a4", 6937.32], ["c+4", 6026.53], ["d#4", 6274.27]];
        microEvent.notesProbabilities = [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]; 
        microEvent.syllables = ["sen", "tiu", "se", "cen", "tro"];
        microEvent.syllablesProbabilities = [0.166, 0.166, 0.166, 0.166, 0.166, 0.166];
        microEvent.notes2replace = [6386, 7087, 6772, 6154, 6589, 6937, 6026, 6274, 6490, 6683, 6856, 7014, 7158];
        microEvent.completePhrase = "sentiu-se centro.";
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);
    pieceEvents.add(macroEvent);
}

else if (microEventTuplet == 3) {
    // -------- microEvent 3.1 --------
    mediumEvent = createMediumEvent(9);
    var tupletValue = randomInt(6, 10);
    totalDuration = 0;
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 37500 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        if (i == (tupletValue - 1)) {
            microEvent.clearPartialTracking = true;
        }
        microEvent.notes = [["e4", 6413], ["b3", 5915], ["g#4", 6800], ["d3", 4982], ["f#3", 5417], ["a#3", 5765], ["c#4", 6054], ["d#4", 6301]];
        microEvent.notesProbabilities = [0.1, 0.1, 0.1, 0.1, 0.1, 0.15, 0.15, 0.1];
        microEvent.syllables = ["a", "chou", "vi", "da", "ao", "o", "ce", "a", "no", "fun", "da", "do"];
        microEvent.syllablesProbabilities = [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08];
        microEvent.notes2replace = [6413, 7115, 6800, 6182, 6617, 6965, 6054, 6301];
        microEvent.completePhrase = "Achou, Vida ao oceano, fundado.";
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 3.2 --------
    mediumEvent = createMediumEvent(10);
    var tupletValue = randomInt(6, 10);
    totalDuration = 0;
    var breathTimeValue = 500;
        for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 15000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        if (i == (tupletValue - 1)) {
            microEvent.clearPartialTracking = true;
        }
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6413], ["b3", 5915], ["g#4", 6800], ["d3", 4982], ["f#3", 5417], ["a#+3", 5765], ["c+4", 6054], ["d#4", 6301]];
        microEvent.notesProbabilities = [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]; 
        microEvent.syllables = ["chão", "pen", "sou", "que", "a", "ter", "ra", "nas", "ceu"]; 
        microEvent.syllablesProbabilities = [0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111];
        microEvent.notes2replace = [6386, 7087, 6772, 6154, 6589, 6937, 6026, 6274, 6490];
        microEvent.completePhrase = "Chão, pensou que a terra nasceu.";
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 3.3 --------
    mediumEvent = createMediumEvent(11);
    var tupletValue = randomInt(6, 10);
    totalDuration = 0;
    var breathTimeValue = 500;
        for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 15000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        if (i == (tupletValue - 1)) {
            console.log("aqui");
            microEvent.clearPartialTracking = true;
        }
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6386], ["b4", 7087.96], ["g#4", 6772.31], ["c#+4", 6154.83], ["f#+4", 6589.91], ["a4", 6937.32], ["c+4", 6026.53], ["d#4", 6274.27]];
        microEvent.notesProbabilities = [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]; 
        microEvent.syllables = ["jul", "gou", "se", "di", "vi", "no"];
        microEvent.syllablesProbabilities = [0.166, 0.166, 0.166, 0.166, 0.166, 0.166];
        microEvent.notes2replace = [6386, 7087, 6772, 6154, 6589, 6937, 6026, 6274, 6490, 6683, 6856, 7014, 7158];
        microEvent.completePhrase = "Julgou-se divino";
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);
    pieceEvents.add(macroEvent);
}

// if (pieceEvents.getDuration() != 167500){
//     alert("Algum erro aconteceu, duração total: " + pieceEvents.getDuration());
// }
//
// 

// ++++++++++++++++++++++++++++++++
// ++++++++++ MACRO Event 4 +++++++
// ++++++++++++++++++++++++++++++++

macroEvent = createMacroEvent(4);
// -------- microEvent 4.1 --------
mediumEvent = createMediumEvent(12);
var tupletValue = randomInt(5, 10);
var breathTimeValue = 300;
for (var i = 0; i < tupletValue; i++) {
    var tupletValueMs = 30000 / tupletValue;
    microEvent = createMicroEvent(i + 1);
    microEvent.mkPartialTracking = true;
    microEvent.replaceNotes = false;
    microEvent.notes = [["e4", 6386], ["b4", 7087.96], ["g#4", 6772.31], ["c#+4", 6154.83], ["f#+4", 6589.91], ["a4", 6937.32], ["c+4", 6026.53], ["d#4", 6274.27]];
    microEvent.notesProbabilities = [0.1, 0.1, 0.1, 0.1, 0.1, 0.15, 0.15, 0.1];
    microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
    var probabilitiesList = [];
    for (var j = 0; j < 61; j++){
        probabilitiesList.push(1/80);
    }
    probabilitiesList.push(1/20); // Ho
    probabilitiesList.push(1/20); // mem
    probabilitiesList.push(1/20); // cri
    probabilitiesList.push(1/20); // a
    probabilitiesList.push(1/20); // do
    microEvent.syllablesProbabilities = probabilitiesList;
    microEvent.completePhrase = "";
    microEvent.breathTime = breathTimeValue;
    microEvent.possibleDurations = [tupletValueMs];
    microEvent.microEventString = "4.1." + (i + 1);
    mediumEvent.add(microEvent);
}
macroEvent.add(mediumEvent);

// -------- microEvent 4.2 --------
mediumEvent = createMediumEvent(13);
var tupletValue = randomInt(5, 10);
var breathTimeValue = 300;
for (var i = 0; i < tupletValue; i++) {
    var tupletValueMs = 30000 / tupletValue;
    microEvent = createMicroEvent(i + 1);
    microEvent.mkPartialTracking = true;
    microEvent.replaceNotes = false;
    microEvent.notes = [["e4", 6386], ["b4", 7087.96], ["g#4", 6772.31], ["c#+4", 6154.83], ["f#+4", 6589.91], ["a4", 6937.32], ["c+4", 6026.53], ["d#4", 6274.27]];
    microEvent.notesProbabilities = [0.1, 0.1, 0.1, 0.1, 0.1, 0.15, 0.15, 0.1];
    microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
    var probabilitiesList = [];
    for (var j = 0; j < 61; j++){
        probabilitiesList.push(1/80);
    }
    probabilitiesList.push(1/20); // Ho
    probabilitiesList.push(1/20); // mem
    probabilitiesList.push(1/20); // cri
    probabilitiesList.push(1/20); // a
    probabilitiesList.push(1/20); // do
    microEvent.syllablesProbabilities = probabilitiesList;
    microEvent.completePhrase = "";
    microEvent.breathTime = breathTimeValue;
    microEvent.possibleDurations = [tupletValueMs];
    microEvent.microEventString = "4.2." + (i + 1);
    mediumEvent.add(microEvent);
}
macroEvent.add(mediumEvent);
pieceEvents.add(macroEvent);

if (Math.round(pieceEvents.getDuration()) != (167500 + 60000)){
    alert("Algum erro aconteceu, duração total: " + pieceEvents.getDuration());
}


// ++++++++++++++++++++++++++++++++
// ++++++++++ MACRO Event 5 +++++++
// ++++++++++++++++++++++++++++++++
microEventTuplet = randomInt(1, 4);
console.log("Tuplet variation of Macro event 5: " + microEventTuplet);
macroEvent = createMacroEvent(5);

if (microEventTuplet == 1) {
    // -------- microEvent 5.1 --------
    mediumEvent = createMediumEvent(13);
    var tupletValue = randomInt(5, 8);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 30000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.25;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.2 --------
    mediumEvent = createMediumEvent(14);
    var tupletValue = randomInt(5, 8);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 27500 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.3) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.4;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.3 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(5, 8);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 22500 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.75) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.75;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.4 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(5, 8);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 20000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.9) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947];
        }
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.9;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.4." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

        // -------- microEvent 5.5 --------
    mediumEvent = createMediumEvent(16);
    var tupletValue = randomInt(5, 8);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 10000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        microEvent.replaceNotes = true;
        microEvent.notes2replace = [6600, 6182, 6947];
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.75;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.5." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);
    pieceEvents.add(macroEvent);
}

else if (microEventTuplet == 2) {
    // -------- microEvent 5.1 --------
    mediumEvent = createMediumEvent(13);
    var tupletValue = randomInt(4, 6);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 25000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.25;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.2 --------
    mediumEvent = createMediumEvent(14);
    var tupletValue = randomInt(10, 15);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 45000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.3) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.4;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.3 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(3, 5);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 15000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.75) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.75;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.4 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(3, 5);
    var breathTimeValue = 400;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 17500 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.9) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947];
        }
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.9;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.4." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

        // -------- microEvent 5.5 --------
    mediumEvent = createMediumEvent(16);
    var tupletValue = randomInt(1, 2);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 7500 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        microEvent.replaceNotes = true;
        microEvent.notes2replace = [6600, 6182, 6947];
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.75;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.5." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);
    pieceEvents.add(macroEvent);
}

else if (microEventTuplet == 3) {
    // -------- microEvent 5.1 --------
    mediumEvent = createMediumEvent(13);
    var tupletValue = randomInt(7, 9);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 35000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.25;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.2 --------
    mediumEvent = createMediumEvent(14);
    var tupletValue = randomInt(4, 6);
    var breathTimeValue = 300;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 20000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.3) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.4;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.3 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(3, 5);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 20000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.75) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.75;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.4 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(3, 5);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 22500 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.9) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947];
        }
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.9;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.4." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

        // -------- microEvent 5.5 --------
    mediumEvent = createMediumEvent(16);
    var tupletValue = randomInt(1, 2);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 12500 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        microEvent.replaceNotes = true;
        microEvent.notes2replace = [6600, 6182, 6947];
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.75;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.5." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);
    pieceEvents.add(macroEvent);
}

else if (microEventTuplet == 4) {
    // -------- microEvent 5.1 --------
    mediumEvent = createMediumEvent(13);
    var tupletValue = randomInt(7, 9);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 37500 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.25;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.2 --------
    mediumEvent = createMediumEvent(14);
    var tupletValue = randomInt(4, 6);
    var breathTimeValue = 300;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 22500 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.3) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.4;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.3 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(3, 5);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 20000 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.75) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.75;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.4 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(2, 4);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 12500 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.9) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947];
        }
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.9;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.4." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

        // -------- microEvent 5.5 --------
    mediumEvent = createMediumEvent(16);
    var tupletValue = randomInt(3, 5);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = 17500 / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        microEvent.replaceNotes = true;
        microEvent.notes2replace = [6600, 6182, 6947];
        microEvent.syllables = ['ha', 'vi', 'a', 'tu', 'do', 'cri', 'ou', 'se', 'o', 'na', 'da', 'tan', 'to', 'tu', 'do', 'to', 'cou', 'a', 'á', 'gua', 'a', 'chou', 'vi', 'da', 'ao', 'o', 'ce', 'a', 'no', 'fun', 'da', 'do', 'chão', 'pen', 'sou', 'que', 'a', 'ter', 'ra', 'nas', 'ceu', 'to', 'cou', 'se', 'i', 'lu', 'são', 'sen', 'tiu', 'se', 'cen', 'tro', 'do', 'to', 'do', 'jul', 'gou', 'se', 'di', 'vi', 'no', 'ho', 'mem', 'cri', 'a', 'do'];
        var probabilitiesList = [];
        for (var j = 0; j < 61; j++){
            probabilitiesList.push(1/80);
        }
        probabilitiesList.push(1/20); // Ho
        probabilitiesList.push(1/20); // mem
        probabilitiesList.push(1/20); // cri
        probabilitiesList.push(1/20); // a
        probabilitiesList.push(1/20); // do
        microEvent.syllablesProbabilities = probabilitiesList;
        microEvent.breath = true;
        microEvent.breathProbability = 0.75;
        microEvent.completePhrase = "";
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.5." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);
    pieceEvents.add(macroEvent);
}

if (Math.round(pieceEvents.getDuration()) != (110000 + 167500 + 60000)){
    alert("Algum erro aconteceu, duração total: " + pieceEvents.getDuration());
}
