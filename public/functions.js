// =====================================
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// =====================================================
function midicent2Freq(midicent) {
    var freq = 440 * Math.pow(2, (midicent - 6900) / 1200);
    return freq;
}


// =====================================================

function freq2MidiCent(freq) {
    var midicent = 1200 * Math.log2(freq / 440) + 6900;
    return midicent;
}

// =====================================================
function replaceWithNearest(input1, input2) {
  return input1.map((num1) => {
    let nearestNum = input2[0];
    let minDiff = Math.abs(num1 - nearestNum);

    for (let i = 1; i < input2.length; i++) {
      let diff = Math.abs(num1 - input2[i]);

      if (diff < minDiff) {
        minDiff = diff;
        nearestNum = input2[i];
      }
    }

    return nearestNum;
  });
}


// =====================================================
function replaceByNearNote(input, notes2replace){
    " the input is a list of midicents, and the notes2replace is a list of notes to be replaced by the nearest note (it must be major than 6000 and minor then 7200"
    // check is notes2replace range is correct
    for (var i = 0; i < notes2replace.length; i++){
        if (notes2replace[i] < 6000 || notes2replace[i] > 7200){
            alert("Error: notes2replace the note " + notes2replace[i] + " is out of range (from 6000 to 7200)");
            return;
        }
    }
    var allNotes = [];
    for (var i = 0; i < input.length; i++){
        allNotes[i] = input[i] - 1200;
        allNotes[i] = input[i] + 1200;
        allNotes[i] = input[i];
    }

    var output = [];
    for (var i = 0; i < input.length; i++){
        output[i] = replaceWithNearest([input[i]], notes2replace)[0];
    }
    return output;
}
    
// ========================================================
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

// ========================================================
function setTheNaipe(){
    if (window.naipe == "Baixo") {
        thisNaipe = new Baixo();
    }
    else if (window.naipe == "Tenor") {
        thisNaipe = new Tenor();
    }
    else if (window.naipe == "Contralto") {
        thisNaipe = new Contralto();
    }
    else if (window.naipe == "Soprano") {
        thisNaipe = new Soprano();
    }
    else {
        alert("Não foi possível identificar o naipe, por favor, avise o Charles :).");
    }
}


// ========================================================
function midicent2note(midicent){
    var midi = midicent * 0.01;
    var midi = Math.round(midi);
    var diff = ((midicent * 0.01) - midi) * 100;
    var noteString = "";
    var classNote = midi % 12;
    var octave = Math.floor(midi / 12) - 1;
    if (classNote == 0){
        noteString = "c";
    }
    else if (classNote == 1){
        noteString = "c#";
    }
    else if (classNote == 2){
        noteString = "d";
    }
    else if (classNote == 3){
        noteString = "d#";
    }
    else if (classNote == 4){
        noteString = "e";
    }
    else if (classNote == 5){
        noteString = "f";
    }
    else if (classNote == 6){
        noteString = "f#";
    }
    else if (classNote == 7){
        noteString = "g";
    }
    else if (classNote == 8){
        noteString = "g#";
    }
    else if (classNote == 9){
        noteString = "a";
    }
    else if (classNote == 10){
        noteString = "a#";
    }
    else if (classNote == 11){
        noteString = "b";
    }
    else {
        alert("Erro ao identificar a nota");
    }
    
    if (diff > 40 && diff < 60){
        noteString = noteString + "+" + octave;
    } 
    else if (diff < -40 && diff > -60){
        // if noteString has #, then replace # by -
        if (noteString.includes("#")){
            noteString = noteString.replace("#", "+");
            noteString = noteString + octave;
        }
        else {
            noteString = noteString + "-" + octave;
        }
    }
    else {
        noteString = noteString + octave;
    }
    return noteString;
}
