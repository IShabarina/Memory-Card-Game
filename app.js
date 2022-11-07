(() => {

  const cards = document.querySelector('.cards');
  const controlSection = document.querySelector('.control');
  const gameOverBtn = document.querySelector('.control__game-over_alert');
  const form = document.querySelector('.control__play-form');
  const playBtn = document.querySelector('.control__play-again-btn');

  let timeoutId = null;

  let theFirstCardFlipped = false; //the 1st card not flipped
  let cardsBoardBlocked = false; // game board not blocked / 'true' - blocked until the 2nd card is chosen
  let cardsWon = [];
  let firstCard;
  let secondCard;


  //create card board
  function createCardBoard(cardArray) {

    cards.classList.remove('hide');
    controlSection.classList.add('hide');

    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement('div');
      let frontSide = document.createElement('p');
      let backSide = document.createElement('img');

      card.classList.add('card');
      card.style.width = 'calc(100% / ' + Math.sqrt(cardArray.length) + ' - 10px)';
      card.style.height = 'calc(100% / ' + Math.sqrt(cardArray.length) + ' - 10px)';

      frontSide.classList.add('front-side');
      backSide.classList.add('back-side');

      frontSide.innerHTML = cardArray[i];
      backSide.setAttribute('src', 'img/back_side_card.png');

      cards.appendChild(card);
      card.appendChild(frontSide);
      card.appendChild(backSide);

      card.addEventListener('click', flipCard);
    }
  }

  //flip card
  const flipCard = event => {
    if (cardsBoardBlocked) return; //if board blocked function stopped

    const target = event.target.parentElement;//receive div.card element

    if (target === firstCard) return; //if the same card clicked again function stoped

    target.classList.add('flip');

    if (!theFirstCardFlipped) {
      //first click
      theFirstCardFlipped = true;
      firstCard = target;
      console.log('firstcard', firstCard.firstElementChild.innerHTML);
    } else {
      //second click
      theFirstCardFlipped = false;
      secondCard = target;
      console.log('secondcard', secondCard.firstElementChild.innerHTML);
      checkForMatch();
    }
  }

  const checkForMatch = () => {
    if (firstCard.firstElementChild.innerHTML === secondCard.firstElementChild.innerHTML) {
      console.log('совпадения найдены');
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      cardsWon.push(firstCard.firstElementChild.innerHTML);
      console.log('cardsWon', cardsWon);

    } else {
      //cards board is blocking for actions till cards flipped
      cardsBoardBlocked = true;
      setTimeout(() => { //delay during 1 s for removing class 'flip'
        console.log('нет совпадений');
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        cardsBoardBlocked = false; //
      }, 1000);
    }

    // qty matched cards = q-ty cards
    if (cardsWon.length === document.querySelectorAll('.card').length / 2) {
      clearTimeout(timeoutId);
      cardsWon = [];
      setTimeout(askPlayAgain, 1000);
    };
  };


  //show button Play Again
  function askPlayAgain() {
    controlSection.classList.remove('hide');
    playBtn.classList.remove('hide');
    form.classList.add('hide');
  }

  //delete Cards board and ask cards q-ty
  function resetGame() {
    cards.classList.add('hide');
    gameOverBtn.classList.add('hide')
    playBtn.classList.add('hide');
    form.classList.remove('hide');
    while (cards.firstChild) {
      cards.removeChild(cards.firstChild);
    }
    cardsWon = [];
    theFirstCardFlipped = false; // if the firstCard flipped before Game Over;
  }

  const gameOver = () => {
    cards.classList.add('hide');
    controlSection.classList.remove('hide');
    gameOverBtn.classList.remove('hide');
    playBtn.classList.add('hide');
    form.classList.add('hide');
    setTimeout(askPlayAgain, 1000);
  };


  document.addEventListener('DOMContentLoaded', () => {
    let cardArray = [];
    let qtyCard;

    //create Cards array
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log(form.firstElementChild.value);
      cardArray = [];

      if (!form.firstElementChild.value) {
        qtyCard = '16';
      } else {
        qtyCard = Math.pow(form.firstElementChild.value, 2);
      }

      //fill in Cards array

      for (let i = 0; i < (qtyCard / 2); i++) {
        cardArray.push(i + 1);
        cardArray.push(i + 1);
      }
      console.log('cardArray', cardArray);

      //sort Cards array
      cardArray.sort(() => 0.5 - Math.random());
      console.log(cardArray);

      createCardBoard(cardArray);
      form.firstElementChild.value = '';

      timeoutId = setTimeout(() => {
        gameOver();
      }, 60000);
    })

    playBtn.addEventListener('click', resetGame);
  });

})();
