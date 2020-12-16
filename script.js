/*********************************
 VARIABLES DOM
 ********************************/

const timeLeftDOM = document.getElementById('timeleft');
const playButton = document.getElementById('buttonPlay');
const pauseButton = document.getElementById('BtnPause');
const resetButton = document.getElementById('buttonReset');
const sessionLengthDOM = document.getElementById('sessionLength');
const sessionIncrement = document.getElementById('sessionIncrement');
const sessionDecrement = document.getElementById('sessionDecrement');
const breakLengthDOM = document.getElementById('breakLength');
const breakIncrement = document.getElementById('breakIncrement');
const breakDecrement = document.getElementById('breakDecrement');
const relaxSong = document.getElementById('relaxSong');

let valueSession = 25;
let valueBreak = 5;
let sec = 59;
let interval = null;

class Countdowm {
  constructor() {
    playButton.addEventListener('click', this.startTimer);
    pauseButton.addEventListener('click', this.stopTimer);
    resetButton.addEventListener('click', this.resetTimer);
  }

  startTimer() {
    interval = setInterval(() => {
      if (sec < 10) {
        sec = '0' + sec;
      }
      timeLeftDOM.innerHTML = valueSession - 1 + ' : ' + sec;
      sec--;
      if (sec === 0) {
        valueSession--;
        sec = 59;
        if (valueSession === 0) {
          relaxSong.play();
          valueSession = valueBreak;
        }
        if (valueBreak === 0) {
          valueBreak = valueSession;
        }
      }
      playButton.classList.add('hide');
    }, 1000);
  }

  stopTimer() {
    playButton.classList.remove('hide');
    clearInterval(interval);
  }

  resetTimer() {
    valueBreak = 5;
    valueSession = 25;
    sec = 59;
    sessionLengthDOM.innerHTML = 25;
    breakLengthDOM.innerHTML = 5;
    clearInterval(interval);
    timeLeftDOM.innerHTML = valueSession + ' : ' + '0' + 0;
    playButton.classList.remove('hide');
    new SessionAndBreakLength(valueSession, valueBreak);
  }
}

class SessionAndBreakLength {
  constructor(valueSession, valueBreak) {
    (this.valueBreak = valueBreak),
      (this.valueSession = valueSession),
      this.incrementDecrementValue(
        'Break',
        valueBreak,
        breakLengthDOM,
        breakIncrement,
        breakDecrement
      );
    this.incrementDecrementValue(
      'Session',
      valueSession,
      sessionLengthDOM,
      sessionIncrement,
      sessionDecrement
    );
  }

  incrementDecrementValue(
    flag,
    value,
    lenghtDOM,
    sectionIncrement,
    sectionDecrement
  ) {
    sectionIncrement.addEventListener('click', () => {
      if (value >= 60) {
        return;
      }
      lenghtDOM.innerHTML = ++value;
      this.updateCountdown(flag, value);
    });
    sectionDecrement.addEventListener('click', () => {
      if (value <= 1) {
        return;
      }
      lenghtDOM.innerHTML = --value;
      this.updateCountdown(flag, value);
    });
  }

  // Update Countdowm in the DOM

  updateCountdown(flag, value) {
    playButton.classList.remove('hide');
    clearInterval(interval);
    flag === 'Session' ? (valueSession = value) : (valueBreak = value);
    timeLeftDOM.innerHTML = valueSession + ' : ' + '00';
  }
}

new Countdowm();
new SessionAndBreakLength(valueSession, valueBreak);