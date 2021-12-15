let timerId = null;
let startBtn = document.getElementById('start-btn');
let timeCount = document.getElementById('timer');
let timeEntered = document.getElementById('number-inp');

startBtn.addEventListener('click', timerCount);

function timerCount() {
  clearInterval(timerId);
  timeCount.textContent = timeEntered.value;
  timerId = setInterval(changeTime, 1000);
}

function changeTime() {
  if (timeCount.textContent >=1) {
    timeCount.textContent = timeCount.textContent - 1;
  }
  else {
    clearInterval(timerId);
  }
}

