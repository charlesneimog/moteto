var pdIsInitialized = false;
window.pd4webGuiValues = {};

// ====================
function JS_AddUIButtons(audioContext, audioWorkletNode) {
  if (audioContext.state === "running") {
    audioContext.suspend();
  }
  const startButton = document.getElementById("Start-Audio-Button");
  startButton.onclick = () => {
    const iconElement = document.getElementById("SoundIcon");
    if (iconElement.classList.contains("fa-volume-xmark")) {
      iconElement.className = "fa-solid fa-volume-high fa-2x";
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      // audioWorkletNode.connect(audioContext.destination);
    } else {
      iconElement.className = "fa-solid fa-volume-xmark fa-2x";
      if (audioContext.state === "running") {
        audioContext.suspend();
      }
    }
  };

  async function init(stream) {
    const mic = audioContext.createMediaStreamSource(stream);
    const clickListenerMic = (_) => {
      if (audioContext.state !== "running") {
        mic.connect(audioWorkletNode);
        startButton.removeEventListener("click", clickListenerMic);
      } else {
        audioContext.suspend();
      }
    };
    startButton.addEventListener("click", clickListenerMic);
  }

  navigator.mediaDevices
    .getUserMedia({
      video: false,
      audio: {
        latency: 0,
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        channelCount: 1,
      },
    })
    .then((stream) => init(stream));
}

// ====================
function JS_LoadFinished() {
  pdIsInitialized = true;
  var soundIcon = document.getElementById("SoundIcon");
  soundIcon.className = "fa-solid fa-volume-xmark fa-beat fa-2x";
}

// ====================
function JS_setFloat(symbol, value) {
  window.pd4webGuiValues[symbol] = value;
}

// ====================
function JS_setSymbol(symbol, value) {
  window.pd4webGuiValues[symbol] = value;
}

// ====================
function sendFloat(receiver, f) {
  if (Module === undefined) {
    alert("Module is undefined!");
    return;
  }
  var str_rawReceiver = new TextEncoder().encode(receiver);
  var ptrReceiver = Module._webpd_malloc(str_rawReceiver.length + 1);
  var chunkReceiver = Module.HEAPU8.subarray(
    ptrReceiver,
    ptrReceiver + str_rawReceiver.length,
  );
  chunkReceiver.set(str_rawReceiver);
  Module.HEAPU8[ptrReceiver + str_rawReceiver.length] = 0; // Null-terminate the string
  const result = Module._sendFloatToPd(ptrReceiver, f);
  if (result !== 0) {
    console.error("Error sending float to pd");
  }
  Module._webpd_free(ptrReceiver);
}

// ====================
function sendBang(receiver) {
  if (Module === undefined) {
    alert("Module is undefined!");
    return;
  }
  var str_rawReceiver = new TextEncoder().encode(receiver);
  var ptrReceiver = Module._webpd_malloc(str_rawReceiver.length + 1);
  var chunkReceiver = Module.HEAPU8.subarray(
    ptrReceiver,
    ptrReceiver + str_rawReceiver.length,
  );
  chunkReceiver.set(str_rawReceiver);
  Module.HEAPU8[ptrReceiver + str_rawReceiver.length] = 0; // Null-terminate the string
  if (Module._sendBangToPd(ptrReceiver) !== 0) {
    console.error("Error sending float to pd");
  }
  Module._webpd_free(ptrReceiver);
}

// ====================
function sendString(receiver, str) {
  if (pdIsInitialized === false) {
    console.log("Pd is not initialized yet!");
    return;
  }
  var str_rawReceiver = new TextEncoder().encode(receiver);
  var ptrReceiver = Module._webpd_malloc(str_rawReceiver.length + 1);
  var chunkReceiver = Module.HEAPU8.subarray(
    ptrReceiver,
    ptrReceiver + str_rawReceiver.length,
  );
  chunkReceiver.set(str_rawReceiver);
  Module.HEAPU8[ptrReceiver + str_rawReceiver.length] = 0; // Null-terminate the string

  var str_rawThing = new TextEncoder().encode(str);
  var ptrThing = Module._webpd_malloc(str_rawThing.length + 1);
  var chunkReceiver = Module.HEAPU8.subarray(
    ptrThing,
    ptrThing + str_rawThing.length,
  );
  chunkReceiver.set(str_rawThing);
  Module.HEAPU8[ptrThing + str_rawThing.length] = 0; // Null-terminate the string

  var result = Module._sendSymbolToPd(ptrReceiver, ptrThing);

  Module._webpd_free(ptrReceiver);
  Module._webpd_free(ptrThing);

  if (result !== 0) {
    console.error("Error sending float to pd");
  }
}

// ====================
function sendToPureData(receiver, thing) {
  // check if receiver is a string
  if (typeof receiver !== "string") {
    console.error("Receiver is not a string!");
    return;
  }
  if (typeof thing === "number") {
    sendFloat(receiver, thing);
  }
  // check if thing is a string
  else if (typeof thing === "string") {
    sendString(receiver, thing);
  } else if (Array.isArray(thing)) {
    alert("Array is not supported yet!");
  }
}
