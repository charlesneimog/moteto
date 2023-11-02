// Description: This file contains the code to run the choir.

// set global variables
var streamAudioForPartialTracking = false;
var clearPartialTracking = false;
var lastPartialTracking = new Date().getTime();
// const midicentsFromPartialTracking = [];
window.midicentsFromPartialTracking = [];
window.doingPartialTracking = false;

// =====================================================
function configFFT(dataArray, sampleRate) {
  var fftSize = 4096;
  if (dataArray.length != fftSize) {
    return;
  }
  var now = new Date().getTime();
  // just make fft each 0.25 seconds
  if (now - lastPartialTracking < 250) {
    return;
  } else {
    lastPartialTracking = now;
    // console.log("Fazendo FFT");
    const inArray = new Float64Array(dataArray);
    const inPtr = Module._malloc(inArray.length * inArray.BYTES_PER_ELEMENT);
    const inHeap = new Float64Array(
      Module.HEAPF64.buffer,
      inPtr,
      inArray.length,
    );
    inHeap.set(inArray);

    const outArray = new Float32Array(fftSize);
    const outPtr = Module._malloc(outArray.length * outArray.BYTES_PER_ELEMENT);
    // const outHeap = new Float32Array(Module.HEAPF32.buffer, outPtr, outArray.length);

    // call the function
    Module.ccall(
      "fft",
      "number",
      ["number", "number", "number", "number", "number"],
      [inPtr, fftSize, 0, outPtr, sampleRate],
    );

    // `outHeap` now contains the output of the FFT
    const resultC = new Float32Array(
      Module.HEAPF32.buffer,
      outPtr,
      outArray.length,
    );
    const result = resultC.slice(0);
    var freqs = [];
    var amps = [];
    for (var i = 0; i < result.length / 2; i++) {
      if (result[2 * i] != 0) {
        var freq = result[2 * i];
        var amp = result[2 * i + 1];
        if (freq != undefined && amp != undefined) {
          freqs.push(freq);
          amps.push(amp);
        }
      }
    }
    for (var a = 0; a < freqs.length; a++) {
      var partialTrackingResult = freq2MidiCent(freqs[a]);
      if (partialTrackingResult !== undefined) {
        window.midicentsFromPartialTracking.push(partialTrackingResult);
      }
    }
    // console.log(window.midicentsFromPartialTracking);
    Module._free(outPtr);
    Module._free(inPtr);
    window.doingPartialTracking = false;
    // console.log("FFT done");
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
    } else if (streamAudioForPartialTracking == false) {
      requestAnimationFrame(step);
    }
  }
  // -----------------------------------------------
  stream.then(function (stream) {
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
  while (
    index < cumulativeProbabilities.length &&
    cumulativeProbabilities[index] < random
  ) {
    index++;
  }
  return elements[index];
}

// ========================================================
async function showNoteAndBreath(pngPitchFile, eventClass, midicent) {
  // show the breath image
  var img = document.getElementById("imgNote");
  completePhrase = document.getElementById("completePhrase");
  // var div = document.getElementById('DurationBar');
  // div.style.color = "red";
  var imgNotePos = img.getBoundingClientRect();
  // var imgNoteWidth = imgNotePos.width;
  // var imgNoteHeight = imgNotePos.height;
  completePhrase.style.position = "absolute";
  completePhrase.style.top = `${imgNotePos.bottom + 20}px`;

  if (midicent != 0) {
    var pngFile = "respire.png";
    pngFile = "public/" + pngFile;
    var eventDuration = eventClass.duration;
    img.src = pngFile;
    completePhrase.innerHTML = eventClass.completePhrase;
  } else {
    img.src = pngPitchFile;
    if (pngPitchFile == "public/pausa.png") {
      completePhrase.innerHTML = "";
    } else if (pngPitchFile == "public/respire.png") {
      completePhrase.innerHTML = " _ ";
    } else if (pngPitchFile == "public/ouvir.png") {
      completePhrase.innerHTML = " _ ";
    } else {
      completePhrase.innerHTML = "Nenhuma nota encontrada.";
    }
    await new Promise((resolve) => setTimeout(resolve, eventClass.breathTime));
    return;
  }

  // delay for breathTime
  // =====================
  await new Promise((resolve) => setTimeout(resolve, eventClass.breathTime)); // TODO: rethink about this
  var div = document.getElementById("DurationBar");

  // show the note image
  // =====================
  img = document.getElementById("imgNote");
  pngPitchFile = "public/" + pngPitchFile;

  // check if pngPitchFile exists
  // var http = new XMLHttpRequest();
  // http.open('HEAD', pngPitchFile, false);
  // http.send();
  // if (http.status == 404) {
  //     pngPitchFile = "public/pausa.png";
  //     midicent = 0;
  //     img.src = pngPitchFile;
  //     return;
  // }

  img.src = pngPitchFile;
  var durationMs = eventDuration - eventClass.breathTime;
  var durationSec = durationMs / 1000;
  var samples = Math.floor(durationSec * sampleRate);
  var samples = new Float64Array(samples);
  var samplesPtr = Module._malloc(samples.length * samples.BYTES_PER_ELEMENT);

  onwebSite = true;
  Module.HEAPF64.set(samples, samplesPtr >> 3);
  Module.ccall(
    "generate_sine_wave",
    "number",
    ["number", "number", "number", "number"],
    [
      midicent2Freq(midicent),
      sampleRate,
      eventDuration - eventClass.breathTime,
      samplesPtr,
    ],
  );
  var samples = new Float64Array(
    Module.HEAPF64.buffer,
    samplesPtr,
    samples.length,
  );
  var audioContext = new AudioContext();
  var buffer = audioContext.createBuffer(1, samples.length, sampleRate);
  var channelData = buffer.getChannelData(0);
  channelData.set(Float32Array.from(samples));
  var source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
  Module._free(samplesPtr);
  completePhrase.innerHTML = eventClass.completePhrase; //     TODO: SHOW THE PHRASE AND BOLD SYLLABLES
}

// ++++++++++++++++++++++++
function updateMeasureBarProgress(duration) {
  var start = new Date().getTime();
  var interval = setInterval(function () {
    var now = new Date().getTime();
    var progress = now - start;
    var div = document.getElementById("DurationBar");
    var div_width = Math.min((progress / duration) * 100, 100);
    measureDivWidth = div_width;
    div.style.width = div_width + "%";
    if (div_width > 99.5) {
      clearInterval(interval);
      div.style.width = 100 + "%";
    }
  }, 15);
}

// ++++++++++++++++++++++++
function StartMicroEvent(event, eventDuration) {
  // notas
  var notes = event.notes;
  var notesProbabilities = event.notesProbabilities;

  if (thisNaipe == undefined) {
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
    if (window.midicentsFromPartialTracking.length != 0) {
      notes = [];
      var localMidicentsOfPartialTracking =
        window.midicentsFromPartialTracking.slice();
      var notesAlreadyAdded = [];
      for (var i = 0; i < localMidicentsOfPartialTracking.length; i++) {
        if (event.replaceNotes === true) {
          localMidicentsOfPartialTracking[i] = replaceByNearNote(
            [localMidicentsOfPartialTracking[i]],
            event.notes2replace,
          )[0];
        }
        var partialtrackingnotes = [];
        // check if note is already inside the array notes
        if (
          !notesAlreadyAdded.includes(
            Math.round(localMidicentsOfPartialTracking[i]),
          ) &&
          localMidicentsOfPartialTracking[i] != undefined
        ) {
          partialtrackingnotes.push(
            midicent2note(localMidicentsOfPartialTracking[i]),
          );
          partialtrackingnotes.push(
            Math.round(localMidicentsOfPartialTracking[i]),
          );
          notes.push(partialtrackingnotes);
          notesAlreadyAdded.push(
            Math.round(localMidicentsOfPartialTracking[i]),
          );
        }
      }
      // console.log("Array not empty");
    } else {
      console.log("Array empty");
    }
  }

  if (event.clearPartialTracking == true) {
    // console.log("Clearing array of partial tracking");
    window.midicentsFromPartialTracking = [];
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

  var breathEvent = false;
  if (event.breath === true) {
    if (Math.random() < event.breathProbability) {
      // this that if the Math.random() is
      console.log("Breath Event");
      breathEvent = true;
    }
  }
  if (goodNotes.length > 0 && breathEvent === false) {
    // notes
    if (event.mkPartialTracking == false) {
      var noteAndMidicent = chooseWithProbabilities(
        goodNotes,
        goodNotesProbabilities,
      );
    } else {
      var randomIndex = Math.floor(Math.random() * goodNotes.length);
      var noteAndMidicent = goodNotes[randomIndex];
      // console.log(noteAndMidicent);
    }
    var note = noteAndMidicent[0];
    var midicent = noteAndMidicent[1];

    // silabas
    var syllables = event.syllables;
    var syllablesProbabilities = event.syllablesProbabilities;
    var syllable = chooseWithProbabilities(syllables, syllablesProbabilities);
    var noteNameString = note[0];
    var pngFile =
      "notes/" + noteNameString + "/" + note + "-" + syllable + ".webp";
    pngFile = pngFile.replace("#", "s");
  } else if (breathEvent === true) {
    var pngFile = "public/ouvir.png";
    midicent = 0;
  } else {
    console.log("No good notes or breath event");
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
    // console.log("=============================");
    StartMicroEvent(event, eventDuration);
    await new Promise((resolve) => setTimeout(resolve, eventDuration));
  }
  eventNumber = eventNumber + 1;

  if (eventNumber <= window.pieceEvents.length) {
    startMediumEvents(eventNumber);
  } else {
    var img = document.getElementById("imgNote");
    img.src = "./public/fim.png";
    completePhrase = document.getElementById("completePhrase");
    var imgNotePos = img.getBoundingClientRect();
    console.log(
      "A obra acabou no hora: " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes(),
    );
    completePhrase.style.position = "absolute";
    completePhrase.style.top = `${imgNotePos.bottom + 20}px`;
    completePhrase.innerHTML = "Fim da peça! Obrigado!";
    // wait for 5 seconds and redirect to the home page
    setTimeout(function () {
      window.location.href = "./poemas.html";
    }, 5000);
  }
}

// ========================================================
async function syncStart() {
  if (thisNaipe == undefined) {
    setTheNaipe();
  }
  // Get the current time in milliseconds since the epoch
  var now = new Date().getTime();
  var thisHour = new Date().getHours();
  // var thisMinutDec = Math.floor(new Date().getMinutes() / 10) * 10; // decimal of 10 minutes
  // var thisMinutUnit = new Date().getMinutes() % 10; // unit of 10 minutes
  var minuteSelection = document.getElementById("minute-select").value;
  minuteSelectionInt = parseInt(minuteSelection);
  var startPieceTime = new Date();
  if (minuteSelectionInt > 59) {
    thisHour = thisHour + 1;
    minuteSelectionInt = minuteSelectionInt - 60;
  }
  startPieceTime.setHours(thisHour, minuteSelectionInt, 0, 0);
  var startPieceTimeMs = startPieceTime.getTime();
  var delayTime = startPieceTimeMs - now;
  // var completePhrase = document.getElementById("completePhrase");
  // var allMediumEvents;
  // delayTime = 0;

  delay(delayTime).then(function () {
    console.log(
      "A obra iniciu na hora: " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes(),
    );
    startMediumEvents(1);
  });
}
