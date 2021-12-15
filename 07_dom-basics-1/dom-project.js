
let container = document.querySelector('.container');

let domContent = document.createElement('div');
domContent.className = 'dom-content';
container.append(domContent);
domContent.style.backgroundColor = "blueviolet";
domContent.style.padding = '100px';

let input = document.createElement('input');
input.className = 'input-text';
domContent.append(input);

let h2 = document.createElement('h2');
h2.className = 'show-text';
domContent.append(h2);

let inputText = document.querySelector('.input-text');
inputText.style.width = '100%';
let showText = document.querySelector('.show-text');
showText.textContent = 'Здесь будет введенная фраза';

let timeOutId = null;

inputText.addEventListener('input', showEnteredText);

function showEnteredText() {
  clearTimeout(timeOutId);
  timeOutId = setTimeout(getText, 300);
}

function getText() {
  showText.textContent = inputText.value;
};

