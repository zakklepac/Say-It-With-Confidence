let TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
let fs = require('fs');

//fetch for bsFetch
fetch('https://corporatebs-generator.sameerkumar.website/')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        bsFetch = data;
        return bsFetch
    })

 
const textToSpeech = new TextToSpeechV1({
  username: 'zakklepac',
  password: '!To4ster',
  url: 'https://stream.watsonplatform.net/text-to-speech/api/'
});

` 
let params = {
  text: '${bsFetch}',
  voice: 'en-US_LisaVoice', // Optional voice
  accept: 'audio/ogg'
};
`
// Synthesize speech, correct the wav header, then save to disk
// (wav header requires a file length, but this is unknown until after the header is already generated and sent)
textToSpeech
  .synthesize(params, function(err, audio) {
    if (err) {
      console.log(err);
      return;
    }
    textToSpeech.repairWavHeader(audio);
    fs.writeFileSync('audio.ogg', audio);
    console.log('audio.ogg written with a corrected ogg header');
});