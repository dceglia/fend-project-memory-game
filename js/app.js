/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



var cardArray = [];
var deck = document.querySelector('.deck');
var card = document.querySelector('.card');
var attemptCounter = document.querySelector('.attempts');
var attempts = 0;
var timer = document.getElementById('game-timer');

function clickCard(click) {
    click.classList.add('open');
    click.classList.add('show');
}

function addClickedCard(click) {
    cardArray.push(click);
}

function hideCard(click) {
    click.classList.remove('open');
    click.classList.remove('show');
}

function matchLogic() {
    if (cardArray[0].firstElementChild.className === cardArray[1].firstElementChild.className) {
        cardArray[0].classList.add('match');
        cardArray[1].classList.add('match');
        cardArray = [];
    } else {
        setTimeout(function() {
            hideCard(cardArray[0]);
            hideCard(cardArray[1]);
            cardArray = [];
        },1250);
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffleTheDeck () {
    var unshuffled = [].slice.call(document.querySelectorAll('.deck li'));
    var shuffled = shuffle(unshuffled);
    for (card of shuffled) {
        deck.appendChild(card);
    }
}

function incrementCounter() {
    attempts++;
    attemptCounter.innerHTML = attempts;
}

// StopWatch function from https://github.com/ryanwaite28/script-store/blob/master/js/stop-watch.js
const StopWatch = function StopWatch() {
    const self = this;
  
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
  
    let timer;
    let on = false;
  
    self.startTimer = function(callback) {
      if(on === true) { return; }
      on = true;
      timer = setInterval(function(){
        seconds++;
        if(seconds === 60) {
          seconds = 0;
          minutes++;
          if(minutes === 60) {
            minutes = 0;
            hours++;
          }
        }
        if(callback && callback.constructor === Function) {
          callback();
        }
      }, 1000);
      console.log('timer started');
    }
  
    self.stopTimer = function() {
      clearInterval(timer);
      on = false;
      console.log('timer ended: ', self.getTimeString());
    }
  
    self.resetTimer = function() {
      self.stopTimer();
      hours = 0;
      minutes = 0;
      seconds = 0;
    }
  
    self.getTimeString = function() {
      let hour = hours > 9 ? String(hours) : '0' + String(hours);
      let minute = minutes > 9 ? String(minutes) : '0' + String(minutes);
      let second = seconds > 9 ? String(seconds) : '0' + String(seconds);
      let timeString = hour + ':' + minute + ':' + second;
      return timeString;
    }
  
    self.getHours = function() {
      return hours;
    }
  
    self.getMinutes = function() {
      return minutes;
    }
  
    self.getSeconds = function() {
      return seconds;
    }
}

let watch = new StopWatch();

function startGameTimer() {
    watch.startTimer(function() {
        timer.innerText = watch.getTimeString();
    });
}

// ==================================================================
// need to create stopGameTimer() at game win
// ==================================================================

// function stopGameTimer() {
//     watch.stopTimer();
// }

function starRating() {
    if (attempts >= 12 && attempts <18) {
        document.getElementById('firstStar').style.display = 'none';
    } else if (attempts >= 19 && attempts <25) {
        document.getElementById('secondStar').style.display = 'none';
    } else if (attempts >= 26) {
        document.getElementById('finalStar').style.display = 'none';
    }
}

shuffleTheDeck();

deck.addEventListener('click', function(event) {
    let click = event.target;
    if (click.classList.contains('card') && cardArray.length < 2 && !click.classList.contains('open') && !click.classList.contains('show') && !click.classList.contains('match')) {
        clickCard(click);
        addClickedCard(click);
        startGameTimer();
        starRating();
        if (cardArray.length === 2) {
            matchLogic(click);
            incrementCounter();
        }
    }
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
