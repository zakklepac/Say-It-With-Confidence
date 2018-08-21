document.addEventListener("DOMContentLoaded", () =>{ 

const fortune = document.getElementsByClassName('fortune')[0]
const proxy = "https://cors-anywhere.herokuapp.com/"

fetch(`${proxy}https://corporatebs-generator.sameerkumar.website/`)
    .then(response => response.json())
    .then(data => {
        console.log(data.phrase)
        return data.phrase // generated phrase
    })

    .then(speakPhrase => {
        fortune.appendChild.innerText(data.phrase) // add phrase to assigned div
        let TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
        let fs = require('fs');    
        const textToSpeech = new TextToSpeechV1({
        username: 'zakklepac',
        password: '!To4ster',
        url: `${proxy}https://stream.watsonplatform.net/text-to-speech/api/`
        });

        let params = {
        text: `${data.phrase}`,
        voice: 'en-US_LisaVoice',
        accept: 'audio/wav'
        };

        // Synthesize speech, correct the wav header, then save to disk
        // (ogg header requires a file length, but this is unknown until after the header is already generated and sent)
        textToSpeech
        .synthesize(params, function(err, audio) {
            if (err) {
            console.log(err);
            return;
            }
            textToSpeech.repairWavHeader(audio);
            fs.writeFileSync('audio.wav', audio);
            console.log('audio.wav written with a corrected ogg header');
        });
    })
})