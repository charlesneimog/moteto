// =====================================================
// It requests fullscreen mode
// =====================================================
function askForFullScreen() {
  const doc = window.document;
  const docEl = doc.documentElement;
  const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

  if (requestFullScreen) {
    const btn = doc.createElement("button");
    btn.innerHTML = "Clique para entrar em modo tela cheia.";
    btn.style.position = "absolute";
    btn.id = "fullscreenBtn";
    btn.style.left = "50%";
    const completePhrase = doc.getElementById("completePhrase");
    const completePhrasePos = completePhrase.getBoundingClientRect();
    btn.style.top = `${completePhrasePos.bottom + 60}px`;
    btn.style.transform = "translate(-50%, -50%)";
    btn.style.border = "none";
    btn.style.outline = "none";
    btn.style.boxShadow = "none";
    btn.style.padding = "0.5rem 1rem";
    btn.style.backgroundColor = "#f2f2f2";
    btn.style.borderRadius = "0.25rem";
    btn.style.transition = "all 0.2s ease-in-out";

    // Add event listener to button click event
    btn.addEventListener("click", function() {
      requestFullScreen.call(docEl);
        btn.style.display = "none";
    });

    // Append the button to the body of the document
    doc.body.appendChild(btn);
  }
}



// ask for audio permission
const audioContext = new AudioContext();
const bufferSize = 4096;
const sampleRate = 16000;
var stream = navigator.mediaDevices.getUserMedia({audio: true, video: false});




// =====================================================
// Play simple video in order to not turn off the screen
// =====================================================

var promise = document.querySelector('video').play();
var Util={};
Util.base64 = function(mimeType, base64) {
return 'data:' + mimeType + ';base64,' + base64;
};
var video = document.getElementById('screenOn');
video.setAttribute('loop', '');
video.setAttribute('autoplay', '');
function addSourceToVideo(element, type, dataURI) {
    var source = document.createElement('source');
    source.src = dataURI;
    source.type = 'video/' + type;
    element.appendChild(source);
}
addSourceToVideo(video,'webm', Util.base64('video/webm', 'GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA='));
addSourceToVideo(video, 'mp4', Util.base64('video/mp4', 'AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAG21kYXQAAAGzABAHAAABthADAowdbb9/AAAC6W1vb3YAAABsbXZoZAAAAAB8JbCAfCWwgAAAA+gAAAAAAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIVdHJhawAAAFx0a2hkAAAAD3wlsIB8JbCAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAIAAAACAAAAAABsW1kaWEAAAAgbWRoZAAAAAB8JbCAfCWwgAAAA+gAAAAAVcQAAAAAAC1oZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAVmlkZW9IYW5kbGVyAAAAAVxtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAEcc3RibAAAALhzdHNkAAAAAAAAAAEAAACobXA0dgAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAIAAgASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAAFJlc2RzAAAAAANEAAEABDwgEQAAAAADDUAAAAAABS0AAAGwAQAAAbWJEwAAAQAAAAEgAMSNiB9FAEQBFGMAAAGyTGF2YzUyLjg3LjQGAQIAAAAYc3R0cwAAAAAAAAABAAAAAQAAAAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAAAEwAAAAEAAAAUc3RjbwAAAAAAAAABAAAALAAAAGB1ZHRhAAAAWG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAK2lsc3QAAAAjqXRvbwAAABtkYXRhAAAAAQAAAABMYXZmNTIuNzguMw=='));
video.play();

// =====================================================
// =====================================================
// =====================================================
