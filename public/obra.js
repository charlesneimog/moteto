// Description: This file contains the code to run the choir.

// set global variables
var streamAudioForPartialTracking = false;

// =====================================================
//  TODO: put this in the right place
function midicent2Freq(midicent) {
    var freq = 440 * Math.pow(2, (midicent - 6900) / 1200);
    return freq;
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

// =====================================================
function getFreqsFromPartialTracking(typeOfCalculation) {
    // if typeOfCalculation == "down" then down amplitudes get higher probability
    readTextFile("partialtracking.json" + '?' + new Date().getTime(), function(text){
        var data = JSON.parse(text);
        var freqs = data.f;
        var amps = data.a;
        
        if (freqs == undefined || amps == undefined) {
            console.log("No data from partial tracking");
            return;
        }

        if (typeOfCalculation == "down") {
            console.log("Calculating down");
            const sumAbsAmps = amps.reduce((sum, amp) => sum + Math.abs(amp), 0);
            const freqProbs = freqs.map((freq, i) => ({
              frequency: freq,
              amplitude: amps[i],
              probability: Math.abs(amps[i]) / sumAbsAmps
            }));
            freqProbs.sort((a, b) => b.probability - a.probability);
            return freqProbs;
        }

        else if (typeOfCalculation == "up") {
            // python poor translation
            var normalized_amps = [];
            var minAmp = Math.min(...amps);
            var maxAmp = Math.max(...amps);
            for (var i = 0; i < amps.length; i++) {
                normalized_amps.push((amps[i] - minAmp) / (maxAmp - minAmp));
            }
            var freq_amp_dict = {};
            for (var i = 0; i < freqs.length; i++) {
                freq_amp_dict[freqs[i]] = normalized_amps[i];
            }
            var sorted_freq_amp = [];
            for (var key in freq_amp_dict) {
                sorted_freq_amp.push([key, freq_amp_dict[key]]);
            }
            sorted_freq_amp.sort(function(a, b) {
                    return b[1] - a[1];
                }
            );
            var n = freqs.length;
            var rank_probs = [];
            for (var i = 1; i < n + 1; i++) {
                rank_probs.push(1 / i);
            }
            var sumRankProbs = rank_probs.reduce((sum, prob) => sum + prob, 0);
            rank_probs = rank_probs.map((prob) => prob / sumRankProbs);
            var freq_prob_dict = {};
            for (var i = 0; i < sorted_freq_amp.length; i++) {
                freq_prob_dict[sorted_freq_amp[i][0]] = rank_probs[i];
            }
            var table = [];
            for (var i = 0; i < freqs.length; i++) {
                table.push([freqs[i], freq_prob_dict[freqs[i]]]);
            }
            return table;
        }
    });
}


// =====================================================
function configFFT(dataArray, sampleRate){ 
    console.log("Running Partial Tracking");
    var fftSize = 4096;
    if (dataArray.length != fftSize) {
        return;
    }
    else if (onWebSite == true){
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

        var xhr = new XMLHttpRequest();
        var host = window.location.hostname;
        var port = window.location.port;
        var protocol = window.location.protocol;
        var url = protocol + '//' + host + ':' + port + '/send2pd'; 

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ 'freqs': freqs}));
        // xhr.close();


        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    console.log("Sent to PureData");
                }
                else {
                    console.log("Error sending to PD");
                }
            }
        }

        var xhrAmps = new XMLHttpRequest();
        xhrAmps.open('POST', url, true);
        xhrAmps.setRequestHeader('Content-Type', 'application/json');
        xhrAmps.send(JSON.stringify({ 'amps': amps}));
        // xhr.close();

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

// ++++++++++++++++++++++++

/*
async function showNoteAndBreath(pngPitchFile, eventClass, midicent) {
    // show the breath image
    var img = document.getElementById("imgNote");
    completePhrase = document.getElementById("completePhrase");
    if (midicent != 0) {
        var pngFile = "respire.png";
        if (onWebSite == true) {
            pngFile = "public/" + pngFile;
        }
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

    // delay for 500ms
    await new Promise((resolve) => setTimeout(resolve, eventClass.breathTime)); // TODO: rethink about this

    // show the note image
    img = document.getElementById("imgNote");
    if (onWebSite == true) {
        pngPitchFile = "public/" + pngPitchFile;
    }

    img.src = pngPitchFile;

    // malloc new array for double samples with eventDuration - eventClass.breathTime

    // convert ms to samples
    var durationMs = eventDuration - eventClass.breathTime;
    var durationSec = durationMs / 1000;
    var samples = Math.floor(durationSec * sampleRate);

    var samples = new Float64Array(samples);
    var samplesPtr = Module._malloc(samples.length * samples.BYTES_PER_ELEMENT);
    Module.HEAPF64.set(samples, samplesPtr >> 3);

    // Allocate memory for the frequency array and copy values
    const freqList = [midicent2Freq(midicent) * 1, midicent2Freq(midicent) * 2, midicent2Freq(midicent) * 3, midicent2Freq(midicent) * 4];
    const ampList = [0.7, 0.1, 0.05, 0.05];
    const freqPtr = Module._malloc(freqList.length * Float32Array.BYTES_PER_ELEMENT);
    Module.HEAPF32.set(freqList, freqPtr / Float32Array.BYTES_PER_ELEMENT);
    const ampPtr = Module._malloc(ampList.length * Float32Array.BYTES_PER_ELEMENT);
    Module.HEAPF32.set(ampList, ampPtr / Float32Array.BYTES_PER_ELEMENT);
    // Call the C function
    Module.ccall('generate_sines_wave', 'number', ['number', 'number', 'number', 'number', 'number', 'number'],
            [freqPtr, ampPtr, freqList.length, sampleRate, eventDuration - eventClass.breathTime, samplesPtr]);            


    // Get the output data from the buffer
    var samples = new Float64Array(Module.HEAPF64.buffer, samplesPtr, samples.length);

    // =====================
    var audioContext = new AudioContext();
    var buffer = audioContext.createBuffer(1, samples.length, sampleRate);
    var channelData = buffer.getChannelData(0);
    channelData.set(Float32Array.from(samples));
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();

    // free memory
    Module._free(samplesPtr);
    Module._free(freqPtr);
    Module._free(ampPtr);
    completePhrase.innerHTML = eventClass.completePhrase;
}
*/

// ========================================================
async function showNoteAndBreath(pngPitchFile, eventClass, midicent) {
    // show the breath image
    var img = document.getElementById("imgNote");
    completePhrase = document.getElementById("completePhrase");
    var div = document.getElementById('DurationBar');
    // set the color of the bar
    div.style.color = "red";
    var imgNotePos = img.getBoundingClientRect();
    var imgNoteWidth = imgNotePos.width;
    var imgNoteHeight = imgNotePos.height;
    completePhrase.style.position = "absolute";
    completePhrase.style.top = `${imgNotePos.bottom + 20}px`;


    if (midicent != 0) {
        var pngFile = "respire.png";
        if (onWebSite == true) {
            pngFile = "public/" + pngFile;
        }
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

    // delay for 500ms
    await new Promise((resolve) => setTimeout(resolve, eventClass.breathTime)); // TODO: rethink about this

    var div = document.getElementById('DurationBar');
    // div.style.color = "black";

    // show the note image
    img = document.getElementById("imgNote");
    if (onWebSite == true) {
        pngPitchFile = "public/" + pngPitchFile;
    }
    img.src = pngPitchFile;

    /// Synth the note
    // see time of execution
    var t0 = performance.now();
    var durationMs = eventDuration - eventClass.breathTime;
    var durationSec = durationMs / 1000;
    var samples = Math.floor(durationSec * sampleRate);
    var samples = new Float64Array(samples);
    var samplesPtr = Module._malloc(samples.length * samples.BYTES_PER_ELEMENT);
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
    var t1 = performance.now();
    completePhrase.innerHTML = eventClass.completePhrase;
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
        if (div_width == 100) {
            clearInterval(interval);
            div.style.width = 100;
        }
    }, 30);

}

// ++++++++++++++++++++++++
function StartMicroEvent(event, eventDuration) {
    // notas
    var notes = event.notes; 
    var notesProbabilities = event.notesProbabilities;

    if (thisNaipe == undefined){
        setTheNaipe();
    }

    var higherNote = thisNaipe.higherNote;
    var lowerNote = thisNaipe.lowerNote;
    var validEvents = [];

    var goodNotes = [];
    var goodNotesProbabilities = [];
    var sendPartialTracking = Math.random();

    // ========================================================
    //  NOTE: Here is where I execute the partial tracking
    if (sendPartialTracking > 0.1 && event.mkPartialTracking == true && onWebSite == false) {
        streamAudioForPartialTracking = true;
    }
    // ========================================================

    // remove not valid notes
    for (var i = 0; i < notes.length; i++) {
        if (notes[i][1] <= higherNote && notes[i][1] >= lowerNote) {
            var note = notes[i][0];
            var midicent = notes[i][1];
            goodNotes.push([note, midicent]);
            goodNotesProbabilities.push(notesProbabilities[i]);
        }
    }
    if (goodNotes.length > 0) {
        var noteAndMidicent = chooseWithProbabilities(goodNotes, goodNotesProbabilities);
        var note = noteAndMidicent[0];
        var midicent = noteAndMidicent[1];
naipe.png
        // silabas
        var syllables = event.syllables;
        var syllablesProbabilities = event.syllablesProbabilities;
        var syllable = chooseWithProbabilities(syllables, syllablesProbabilities);
        if (onWebSite == true) {
            var noteNameString = note[0]
            var pngFile = "./notes/" + noteNameString + "/" + note + "-" + syllable + ".png";
        }
        else{
            var pngFile = "./notes/" + noteNameString + "/" + note + "-" + syllable + ".png";
        }
        pngFile = pngFile.replace("#", "s");
    }
    else{
        var pngFile = "./public/pausa.png";
        midicent = 0;
    }
    event.duration = eventDuration;
    updateMeasureBarProgress(eventDuration);
    showNoteAndBreath(pngFile, event, midicent);
}

// ========================================================
async function startMacroEvent(eventNumber) {
    var start = new Date().getTime();
    // convert to São Paulo time
    start = start - 10800000;
    var startString = new Date(start).toISOString().slice(11, -1);

    /*
    var xhr = new XMLHttpRequest();
    var host = window.location.hostname;
    var port = window.location.port;
    var protocol = window.location.protocol;
    var url = protocol + '//' + host + ':' + port + '/send2pd'; // WARNING: This is an standard, all the requests must be sent to this url
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const userAgent = navigator.userAgent;
    const deviceName = userAgent.match(/\(([^)]+)\)/)[1];
    xhr.send(JSON.stringify({ 'started': startString}));
    */

    if (eventNumber == undefined) {
        eventNumber = 1;
    }
    completePhrase = document.getElementById("completePhrase");
    completePhrase.innerHTML = "Evento " + eventNumber + " de " + pieceEvents.length;

    var mediumEvent = pieceEvents.find(event => event.eventNumber === eventNumber);
    var length = mediumEvent.MicroEvents.length;
    var possibleDurationsLength = mediumEvent.MicroEvents[0].possibleDurations.length;
    var durationIndex = Math.floor(Math.random() * possibleDurationsLength);
    for (var i = 0; i < length; i++) {
        console.log("MacroEvent: " + eventNumber + " MicroEvent: " + (i + 1));
        var event = mediumEvent.MicroEvents[i];
        var eventDuration = event.possibleDurations[durationIndex];
        StartMicroEvent(event, eventDuration);
        await new Promise((resolve) => setTimeout(resolve, eventDuration));
    }
    eventNumber = eventNumber + 1;

    // console.log("eventNumber: " + eventNumber);
    // console.log("pieceEvents.length: " + pieceEvents.length);

    if (eventNumber <= pieceEvents.length) {
        startMacroEvent(eventNumber);
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
        completePhrase.innerHTML = "Fim da peça!";
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
    if (onWebSite == true){
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
        if (thisMinutUnit >= minuteSelection) {
            thisMinutDec = thisMinutDec + 10 + minuteSelectionInt;
        }
        else {
            thisMinutDec = thisMinutDec + minuteSelectionInt;
        }
                
        var startPieceTime = new Date();
        startPieceTime.setHours(thisHour, thisMinutDec, 0, 0);
        var startPieceTimeMs = startPieceTime.getTime();

        var delayTime = startPieceTimeMs - now;

        var completePhrase = document.getElementById("completePhrase");

        delay(delayTime).then(function() {
            startMacroEvent(1);
        });

    }
    else{
        readTextFile("public/start.json" + '?' + new Date().getTime(), function(text){
            var data = JSON.parse(text);
            var now = new Date().getTime();
            var startTime = data.startTime * 1000; // convert time.time from Python to milliseconds
            var delayTime = startTime - now;
            if (startTime != 0 && onWebSite == false) {
                var fullScreenButton = document.getElementById("fullscreenBtn");
                if (fullScreenButton != null){
                    fullScreenButton.style.display = "none";
                }
                delay(delayTime).then(function() {
                    startMacroEvent(1);
                });
            }
            else{   
                setTimeout(function() {
                    syncStart(); // Call syncStart() again after 500 ms
                }, 1);
            }
        });
    }
}

