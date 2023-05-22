// Description: This file contains the code to run the choir.

// set global variables
var streamAudioForPartialTracking = false;
var clearPartialTracking = false;
var midicentsFromPartialTracking = [];


// =====================================================
function configFFT(dataArray, sampleRate){ 
    var fftSize = 4096;
    if (dataArray.length != fftSize) {
        return;
    }
    else {
        const inArray = new Float64Array(dataArray);
        const inPtr = Module._malloc(inArray.length * inArray.BYTES_PER_ELEMENT);
        const inHeap = new Float64Array(Module.HEAPF64.buffer, inPtr, inArray.length);
        inHeap.set(inArray);

        const outArray = new Float32Array(fftSize);
        const outPtr = Module._malloc(outArray.length * outArray.BYTES_PER_ELEMENT);
        const outHeap = new Float32Array(Module.HEAPF32.buffer, outPtr, outArray.length);
        
        // call the function
        Module.ccall('fft', 'number', ['number', 'number', 'number', 'number', 'number'], [inPtr, fftSize, 0, outPtr, sampleRate]);

        // `outHeap` now contains the output of the FFT
        const result = new Float32Array(Module.HEAPF32.buffer, outPtr, outArray.length);
        var freqs = [];
        var amps = [];
        for (var i = 0; i < result.length / 2; i++) {
            if (result[2 * i] !=  0) {
                var freq = result[2 * i];
                var amp = result[2 * i + 1];
                freqs.push(freq);
                amps.push(amp);
            }
        }
        Module._free(outPtr);
        Module._free(inPtr);

        
        if (freqs.length != 0 && clearPartialTracking == true) {
            midicentsFromPartialTracking = [];
        }


        for (var i = 0; i < freqs.length; i++) {
            midicentsFromPartialTracking.push(freq2MidiCent(freqs[i]));
        }
        return;
    }
}

// ========================================================
function AudioStream() {
    var audioContext = new AudioContext();
    var analyser = audioContext.createAnalyser();
    analyser.fftSize = 4096; // this will 
    var sampleRate = audioContext.sampleRate;
    var data = new Float32Array(analyser.fftSize);
    // -----------------------------------------------
    function step() {
        if (streamAudioForPartialTracking == true) {
            audioContext.resume();
            analyser.getFloatTimeDomainData(data);
            const floatData = new Float32Array(data.length);
            floatData.set(data);
            configFFT(floatData, sampleRate);
            requestAnimationFrame(step);
            streamAudioForPartialTracking = false;
        }
        else if (streamAudioForPartialTracking == false) {
            requestAnimationFrame(step);
        }
    }
    // -----------------------------------------------
    stream.then(function(stream) {
        var mediaStreamSource = audioContext.createMediaStreamSource(stream);
        mediaStreamSource.connect(analyser);
        step(); // this is a requestAnimationFrame???
    });
}

// ========================================================
// ======================  Functions  =====================
// ========================================================
// ++++++++++++++++++++++++
function chooseWithProbabilities(elements, probabilities) {
    // adapt probabilities to always sum 1
    var sum = 0;
    for (var i = 0; i < probabilities.length; i++) {
        sum += probabilities[i];
    }
    for (var i = 0; i < probabilities.length; i++) {
        probabilities[i] = probabilities[i] / sum;
    }

    // create cumulative probabilities
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

// ========================================================
async function showNoteAndBreath(pngPitchFile, eventClass, midicent) {

    // show the breath image
    var img = document.getElementById("imgNote");
    completePhrase = document.getElementById("completePhrase");
    var div = document.getElementById('DurationBar');
    // div.style.color = "red";
    var imgNotePos = img.getBoundingClientRect();
    var imgNoteWidth = imgNotePos.width;
    var imgNoteHeight = imgNotePos.height;
    completePhrase.style.position = "absolute";
    completePhrase.style.top = `${imgNotePos.bottom + 20}px`;

    // set the color of the bar
    if (midicent != 0) {
        var pngFile = "respire.png";
        pngFile = "public/" + pngFile;
        var eventDuration = eventClass.duration;
        img.src = pngFile;
    }
    else{
        img.src = pngPitchFile; 
        completePhrase.innerHTML = "Nenhuma nota encontrada.";
        await new Promise((resolve) => setTimeout(resolve, eventClass.breathTime));
        return;

    }
    completePhrase.innerHTML = "";

    // delay for breathTime
    // =====================
    await new Promise((resolve) => setTimeout(resolve, eventClass.breathTime)); // TODO: rethink about this
    var div = document.getElementById('DurationBar');

    // show the note image
    // =====================
    img = document.getElementById("imgNote");
    pngPitchFile = "public/" + pngPitchFile;
    img.src = pngPitchFile;
    var durationMs = eventDuration - eventClass.breathTime;
    var durationSec = durationMs / 1000;
    var samples = Math.floor(durationSec * sampleRate);
    var samples = new Float64Array(samples);
    var samplesPtr = Module._malloc(samples.length * samples.BYTES_PER_ELEMENT);

    // Send to PureData (simulating)
    // =====================
    if (onWebSite == false) {
        var xhr = new XMLHttpRequest();
        var host = window.location.hostname;
        var port = window.location.port;
        var protocol = window.location.protocol;
        var url = protocol + '//' + host + ':' + port + '/send2pd'; 
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        var playValues = [midicent, durationMs];
        xhr.send(JSON.stringify({'play': playValues}));
    }
    else{
        Module.HEAPF64.set(samples, samplesPtr >> 3);
        Module.ccall(   
            'generate_sine_wave', 'number', ['number', 'number', 'number', 'number'], 
            [midicent2Freq(midicent), sampleRate, eventDuration - eventClass.breathTime, samplesPtr]);
        var samples = new Float64Array(Module.HEAPF64.buffer, samplesPtr, samples.length);
        var audioContext = new AudioContext();
        var buffer = audioContext.createBuffer(1, samples.length, sampleRate);
        var channelData = buffer.getChannelData(0);
        channelData.set(Float32Array.from(samples));
        var source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
        Module._free(samplesPtr);
    }
    completePhrase.innerHTML = eventClass.completePhrase; //     TODO: SHOW THE PHRASE AND BOLD SYLLABLES

}

// ++++++++++++++++++++++++
function updateMeasureBarProgress(duration) {
    var start = new Date().getTime();
    var interval = setInterval(function() {
        var now = new Date().getTime();
        var progress = now - start;
        var div = document.getElementById('DurationBar');
        var div_width = Math.min(progress / duration * 100, 100);
        measureDivWidth = div_width;
        div.style.width =  div_width + '%';
        if (div_width > 99.5) {
            clearInterval(interval);
            div.style.width = 100 + '%';
        }
    }, 15);
}

// ++++++++++++++++++++++++
function StartMicroEvent(event, eventDuration) {
    // notas
    var notes = event.notes; 
    var notesProbabilities = event.notesProbabilities;
    if (event.clearPartialTracking == true){
        clearPartialTracking = true;
    }
    else{
        clearPartialTracking = false;
    }

    if (thisNaipe == undefined){
        setTheNaipe();
    }

    // print microevent
    console.log("Iniciando o Evento: " + event.microEventString);

    var higherNote = thisNaipe.higherNote;
    var lowerNote = thisNaipe.lowerNote;
    var validEvents = [];

    var goodNotes = [];
    var goodNotesProbabilities = [];
    var sendPartialTracking = Math.random();

    // ========================================================
     // NOTE: Here is where I execute the partial tracking
    if (event.mkPartialTracking == true) {
        streamAudioForPartialTracking = true;
        if (midicentsFromPartialTracking.length != 0){
            notes = [];
            var notesAlreadyAdded = [];
            for (var i = 0; i < midicentsFromPartialTracking.length; i++) {
                if (event.replaceNotes = true){
                    midicentsFromPartialTracking[i] = replaceByNearNote([midicentsFromPartialTracking[i]], event.notes2replace)[0];
                }
                var partialtrackingnotes = [];
                // check if note is already inside the array notes
                if (!notesAlreadyAdded.includes(Math.round(midicentsFromPartialTracking[i]))){ // all notes have the same probability
                    partialtrackingnotes.push(midicent2note(midicentsFromPartialTracking[i]));
                    partialtrackingnotes.push(Math.round(midicentsFromPartialTracking[i]));
                    notes.push(partialtrackingnotes);
                    notesAlreadyAdded.push(Math.round(midicentsFromPartialTracking[i]));
                }
            }
            console.log("Array not empty");
        }
        else{
            console.log("Array empty");
        }
    }
    // ========================================================
    // console.log("notes: " + notes);
    // ========================================================
    for (var i = 0; i < notes.length; i++) {
        if (notes[i][1] <= higherNote && notes[i][1] >= lowerNote) {
            var note = notes[i][0];
            var midicent = notes[i][1];
            goodNotes.push([note, midicent]);
            goodNotesProbabilities.push(notesProbabilities[i]);
        }
    }
    // console.log("Good notes: " + goodNotes);
    if (goodNotes.length > 0) {
        // notes
        if (event.mkPartialTracking == false) {
            var noteAndMidicent = chooseWithProbabilities(goodNotes, goodNotesProbabilities);
        }
        else{
            var randomIndex = Math.floor(Math.random() * goodNotes.length);
            var noteAndMidicent = goodNotes[randomIndex];
        }
        var note = noteAndMidicent[0];
        var midicent = noteAndMidicent[1];

        // silabas
        var syllables = event.syllables;
        var syllablesProbabilities = event.syllablesProbabilities;
        var syllable = chooseWithProbabilities(syllables, syllablesProbabilities);
        var noteNameString = note[0]
        var pngFile = "notes/" + noteNameString + "/" + note + "-" + syllable + ".png";
        pngFile = pngFile.replace("#", "s");
    }
    else{
        var pngFile = "public/pausa.png";
        midicent = 0;
    }
    event.duration = eventDuration;
    updateMeasureBarProgress(eventDuration);
    showNoteAndBreath(pngFile, event, midicent);
}

// ========================================================
async function startMediumEvents(eventNumber) {
    if (eventNumber == undefined) {
        eventNumber = 1;
    }
    if (window.pieceEvents.length == 0) {
        for (var i = 0; i < pieceEvents.allMacroEvents.length; i++) {
            var thisMacroEvent = pieceEvents.allMacroEvents[i];
            for (var j = 0; j < thisMacroEvent.MediumEvents.length; j++) {
                window.pieceEvents.push(thisMacroEvent.MediumEvents[j]);
            }
        }
    }
    var mediumEvent = window.pieceEvents[eventNumber - 1];
    var length = mediumEvent.MicroEvents.length;
    for (var i = 0; i < length; i++) {
        var event = mediumEvent.MicroEvents[i];
        var eventDuration = event.possibleDurations[0];
        console.log("=============================");
        StartMicroEvent(event, eventDuration);
        await new Promise((resolve) => setTimeout(resolve, eventDuration));
    }
    eventNumber = eventNumber + 1;

    if (eventNumber <= window.pieceEvents.length) {
        startMediumEvents(eventNumber);
    }
    else {
        var img = document.getElementById("imgNote");
        img.src = "./public/fim.png";
        completePhrase = document.getElementById("completePhrase");
        var imgNotePos = img.getBoundingClientRect();
        var imgNoteWidth = imgNotePos.width;
        var imgNoteHeight = imgNotePos.height;
        completePhrase.style.position = "absolute";
        completePhrase.style.top = `${imgNotePos.bottom + 20}px`;
        completePhrase.innerHTML = "Fim da peça! Obrigado!";
    }
}

// ========================================================
async function delay(ms) {
    completePhrase = document.getElementById("completePhrase");
    var img = document.getElementById("imgNote");
    completePhrase.style.color = "red";
    var cicles = Math.floor(ms / 1000);
    now = new Date().getTime();
    var end = now + ms;
    while (now < end) {
        now = new Date().getTime();
        var timeLeft = end - now;
        var ciclesLeft = Math.floor(timeLeft / 1000);
        completePhrase.innerHTML = "Aguarde " + ciclesLeft + " segundos...";
        if (ciclesLeft > 29) {
            completePhrase.style.color = "green";
        }
        else if (ciclesLeft > 15 && ciclesLeft <= 29) {
            completePhrase.style.color = "#FFBF00";
        }
        else if (ciclesLeft <= 15) {
            completePhrase.style.color = "red";
        }
        await new Promise((resolve) => setTimeout(resolve, 1));
    }
    var pngFile = "public/respire.png";
    img.src = pngFile;
    completePhrase.innerHTML = "";
    completePhrase.style.color = "black";
    return;
}

// ========================================================
async function syncStart() {
    if (thisNaipe == undefined) {
        setTheNaipe();
    }
    // Get the current time in milliseconds since the epoch
    var now = new Date().getTime();
    var thisHour = new Date().getHours();
    var thisMinutDec = Math.floor(new Date().getMinutes() / 10) * 10; // decimal of 10 minutes
    var thisMinutUnit = new Date().getMinutes() % 10; // unit of 10 minutes
    var minuteSelection = document.getElementById("minute-select").value;
    minuteSelectionInt = parseInt(minuteSelection);
    var startPieceTime = new Date();
    if (minuteSelectionInt > 59){
        thisHour = thisHour + 1;
        minuteSelectionInt = minuteSelectionInt - 60;
    }
    startPieceTime.setHours(thisHour, minuteSelectionInt, 0, 0);
    var startPieceTimeMs = startPieceTime.getTime();
    var delayTime = startPieceTimeMs - now;
    var completePhrase = document.getElementById("completePhrase");
    var allMediumEvents;
    delayTime = 0;

    delay(delayTime).then(function() {
        startMediumEvents(1);
    });
}

