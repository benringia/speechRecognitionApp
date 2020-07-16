const msgEl = document.getElementById('msg');
const randomNum = getRandomNumber();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;;

let recognition = new window.SpeechRecognition;

//init
recognition.start();

function getRandomNumber() {
    return Math.floor(Math.random() * 100) +1;
}
function writeMessage(msg) {
    msgEl.innerHTML = `
        <div>You Said: </div>
        <span class="box">${msg}</span>
    `;
}
function checkNumber(msg) {
    const num = +msg;

    if(Number.isNaN(num)) {
        msgEl.innerHTML += `<div>${msg.toUpperCase()} is not a Number.</div>`
        return;
    }
    //range check
    if(num > 100 || num < 1) {
        msgEl.innerHTML = `<div>${num} is greater than 100.</div>`;
        return;
    }

    //number check
    if(num === randomNum) {
        document.body.innerHTML = `
            <h2>Congrats! ${num} is the correct number! <br><br></h2>
            <button class="play-again" id="play-again">Play Again</button>     
        `;
    } else if(num > randomNum) {
        msgEl.innerHTML += `<div>${num} is too high, Go lower</div>`
    } else {
        msgEl.innerHTML +=`<div>${num} is too low, Go higher</div>`
    }
}
console.log(`Number: ${randomNum}`);
function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}
//res
recognition.addEventListener('result',onSpeak);

//end
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
})

////////////////////////////////////////////////////////////


