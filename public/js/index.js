//Model 
//none

//View
var microphoneButton = document.getElementById("record");
const downloadLink = document.getElementById('download');
//var recordingControlButtonsContainer = document.getElementsByClassName("recording-contorl-buttons-container")[0];
var stopRecordingButton = document.getElementById("stop");
var audio = document.querySelector('audio');
var inProg = document.getElementById('prog');
const saveAudioButton = document.getElementById('saveButton');

//var cancelRecordingButton = document.getElementsByClassName("cancel-recording-button")[0];
//var elapsedTimeTag = document.getElementsByClassName("elapsed-time")[0];
//var closeBrowserNotSupportedBoxButton = document.getElementsByClassName("close-browser-not-supported-box")[0];
//var overlay = document.getElementsByClassName("overlay")[0];
//var audioElement = document.getElementsByClassName("audio-element")[0];
//var audioElementSource = document.getElementsByClassName("audio-element")[0]
  //  .getElementsByTagName("source")[0];
//var textIndicatorOfAudiPlaying = document.getElementsByClassName("text-indication-of-audio-playing")[0];
inProg.style.display = "none";
saveAudioButton.style.display = "none";
//Listeners

//Listen to start recording button
microphoneButton.onclick = startAudioRecording;

//Listen to stop recording button
stopRecordingButton.onclick = stopAudioRecording;



//Listen to cancel recording button
//cancelRecordingButton.onclick = cancelAudioRecording;

//Listen to when the ok button is clicked in the browser not supporting audio recording box
//closeBrowserNotSupportedBoxButton.onclick = hideBrowserNotSupportedOverlay;

//Listen to when the audio being played ends
//audioElement.onended = hideTextIndicatorOfAudioPlaying;

/** Displays recording control buttons */
function showRecordinginProgress() {
    //Hide the microphone button that starts audio recording
    inProg.style.display = "block";

    //Display the recording control buttons
  //  recordingControlButtonsContainer.classList.remove("hide");

    //Handle the displaying of the elapsed recording time
    //handleElapsedRecordingTime();*/
}
function hideRecordinginProgress() {
    inProg.style.display = "none";
}

/** Hide the displayed recording control buttons 
function handleHidingRecordingControlButtons() {
    //Display the microphone button that starts audio recording
    microphoneButton.style.display = "block";

    //Hide the recording control buttons
    recordingControlButtonsContainer.classList.add("hide");

    //stop interval that handles both time elapsed and the red dot
    clearInterval(elapsedTimeTimer); */
//}

/** Displays browser not supported info box for the user
function displayBrowserNotSupportedOverlay() {
    overlay.classList.remove("hide");*/
//}

/** Displays browser not supported info box for the user
function hideBrowserNotSupportedOverlay() {
    overlay.classList.add("hide");*/
//}

/** Creates a source element for the the audio element in the HTML document
function createSourceForAudioElement() {
    let sourceElement = document.createElement("source");
    audioElement.appendChild(sourceElement);

    audioElementSource = sourceElement;*/
//}

/** Display the text indicator of the audio being playing in the background 
function displayTextIndicatorOfAudioPlaying() {
    textIndicatorOfAudiPlaying.classList.remove("hide");
}*/

/** Hide the text indicator of the audio being playing in the background 
function hideTextIndicatorOfAudioPlaying() {
    textIndicatorOfAudiPlaying.classList.add("hide");
}*/

//Controller

/** Stores the actual start time when an audio recording begins to take place to ensure elapsed time start time is accurate
var audioRecordStartTime;

/** Stores the maximum recording time in hours to stop recording once maximum recording hour has been reached 
var maximumRecordingTimeInHours = 1;

/** Stores the reference of the setInterval function that controls the timer in audio recording
var elapsedTimeTimer; */

/** Starts the audio recording*/
function startAudioRecording() {

    console.log("Recording Audio...");
    showRecordinginProgress();
    
/**
    //If a previous audio recording is playing, pause it
    let recorderAudioIsPlaying = !audioElement.paused; // the paused property tells whether the media element is paused or not
    console.log("paused?", !recorderAudioIsPlaying);
    if (recorderAudioIsPlaying) {
        audioElement.pause();
        //also hide the audio playing indicator displayed on the screen
        hideTextIndicatorOfAudioPlaying();
    } */

    //start recording using the audio recording API
    audioRecorder.start() 

    /**
        .then(() => { //on success

            //store the recording start time to display the elapsed time according to it
            audioRecordStartTime = new Date();

            //display control buttons to offer the functionality of stop and cancel
            handleDisplayingRecordingControlButtons();
        })
        .catch(error => { //on error
            //No Browser Support Error
            if (error.message.includes("mediaDevices API or getUserMedia method is not supported in this browser.")) {
                console.log("To record audio, use browsers like Chrome and Firefox.");
                displayBrowserNotSupportedOverlay();
            }

            //Error handling structure
            switch (error.name) {
                case 'AbortError': //error from navigator.mediaDevices.getUserMedia
                    console.log("An AbortError has occured.");
                    break;
                case 'NotAllowedError': //error from navigator.mediaDevices.getUserMedia
                    console.log("A NotAllowedError has occured. User might have denied permission.");
                    break;
                case 'NotFoundError': //error from navigator.mediaDevices.getUserMedia
                    console.log("A NotFoundError has occured.");
                    break;
                case 'NotReadableError': //error from navigator.mediaDevices.getUserMedia
                    console.log("A NotReadableError has occured.");
                    break;
                case 'SecurityError': //error from navigator.mediaDevices.getUserMedia or from the MediaRecorder.start
                    console.log("A SecurityError has occured.");
                    break;
                case 'TypeError': //error from navigator.mediaDevices.getUserMedia
                    console.log("A TypeError has occured.");
                    break;
                case 'InvalidStateError': //error from the MediaRecorder.start
                    console.log("An InvalidStateError has occured.");
                    break;
                case 'UnknownError': //error from the MediaRecorder.start
                    console.log("An UnknownError has occured.");
                    break;
                default:
                    console.log("An error occured with the error name " + error.name);
            };
        });
} */}
/** Stop the currently started audio recording & sends it
 */
function stopAudioRecording() {

    console.log("Stopping Audio Recording...");
    hideRecordinginProgress();

    //stop the recording using the audio recording API
    audioRecorder.stop()
        .then(audioAsblob => {
            // Play recorder audio
            playAudio(audioAsblob);
            saveHandler(audioAsblob);


            //hide recording control button & return record icon
            //handleHidingRecordingControlButtons();
        })
        .catch(error => {
            //Error handling structure
            switch (error.name) {
                case 'InvalidStateError': //error from the MediaRecorder.stop
                    console.log("An InvalidStateError has occured.");
                    break;
                default:
                    console.log("An error occured with the error name " + error.name + error.message);
            }
        });
}



/** Cancel the currently started audio recording */
function cancelAudioRecording() {
    console.log("Canceling audio...");

    //cancel the recording using the audio recording API
    audioRecorder.cancel();

    //hide recording control button & return record icon
    //handleHidingRecordingControlButtons();
}

/** Plays recorded audio using the audio element in the HTML document
  @param {Blob} recorderAudioAsBlob - recorded audio as a Blob Object 
*/
function playAudio(recorderAudioAsBlob) {
   
    var url = URL.createObjectURL(recorderAudioAsBlob);
    audio.src = url;
 
    downloadLink.href = URL.createObjectURL(recorderAudioAsBlob)
    //downloadLink.download = test2.wav
    }

function saveHandler (audioBlob) {
    saveAudioButton.style.display = "block";
    saveAudioButton.onclick = () => saveRecording(audioBlob);
}

function saveRecording (audioBlob) {
    //the form data that will hold the Blob to upload
    const formData = new FormData();
    //add the Blob to formData
    formData.append('userAudio', audioBlob, 'recording.wav');
    //send the request to the endpoint
    fetch('/record', {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then(() => {
            alert("Your recording is saved");
            //reset for next recording
           // resetRecording();
            //fetch recordings
            fetchRecordings();
        })
        .catch((err) => {
            console.error(err);
            alert("An error occurred, please try again later");
            //reset for next recording
            //resetRecording();
        })
}

function fetchRecordings () {
    fetch('/recordings')
        .then((response) => response.json())
        .catch((err) => console.error(err));
}


//
// async function uploadAudio(audioAsBlob) {
//     try{
//         console.log('trying to upload file');
//         const response = await drive.files.create({
//             requestBody: {
//                 name: 'recording.wav', //file name
//                 mimeType: 'audio/wav; codecs=opus' ,
//             },
//             media: {
//                 mimeType: 'audio/wav; codecs=opus' ,
//                 body: audioAsBlob,
//             },
//         });
//         // report the response from the request
//         console.log(response.data);
//     }catch (error) {
//         //report the error message
//         console.log(error.message);
//     }};
//
//     read content and convert it to a URL (base64)
//    reader.readAsDataURL(recorderAudioAsBlob);


