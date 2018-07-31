
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



/* Thanks to Mike Wales and Ryan Waite for their P2 webinars - referenced repetitively */

// empty array to load cards in
var cardArray = [];

// variables to gain HTML access
var deck = document.querySelector('.deck');
var card = document.querySelector('.card');
var attemptCounter = document.querySelector('.attempts');
var timer = document.querySelector('.game-timer');
var modal = document.querySelector("#modal");

// setting player attempts at 0 to start... guess I could be mean and change that
var attempts = 0;

/* referenced Udacity Scholar Matt Cranford's walkthrough
   https://matthewcranford.com/memory-game-walkthrough-part-1-setup/ */
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

/* Udacity provided shuffle function
   Shuffle function from http://stackoverflow.com/a/2450976 */
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

// shuffling the cards using the provided shuffle()
function shuffleTheDeck () {
    var unshuffled = [].slice.call(document.querySelectorAll('.deck li'));
    var shuffled = shuffle(unshuffled);
    for (card of shuffled) {
        deck.appendChild(card);
    }
}

// function to change the players attempts at matches and increment the counter up
function incrementCounter() {
    attempts++;
    attemptCounter.innerHTML = attempts;
}

/* StopWatch function from Udacity scholar Ryan Waite's "Script Store" 
   https://github.com/ryanwaite28/script-store/blob/master/js/stop-watch.js */
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

// creation of a new instance of the StopWatch() function
let watch = new StopWatch();

// function to begin the timer and output the time in the HTML
function startGameTimer() {
    watch.startTimer(function() {
        timer.innerText = watch.getTimeString();
    });
}

// function to stop the timer and output the time in HTML
function stopGameTimer() {
    watch.stopTimer(function() {
        timer.innerText = watch.getTimeString();
    });
}

/* graphical star representation of how well the player did
   thanks to Asmaa & drunkenkismet on Slack for #fend_live_help posts - 
   https://github.com/Zasmaa/memory-game-project-2/blob/master/JS/app.js */
function starRating() {
    if (attempts >= 12 && attempts <18) {
        document.getElementById('firstStar').style.display = 'none';
    } else if (attempts >= 19 && attempts <25) {
        document.getElementById('secondStar').style.display = 'none';
    } else if (attempts >= 26) {
        document.getElementById('thirdStar').style.display = 'none';
    }
}

// translation of the # of stars received into numerical text in the modal
function modalStarCounter() {
    var three = 3;
    var two = 2;
    var one = 1;
    var zero = 0;

    if (attempts < 11) {
        return three;
    } else if (attempts >= 12 && attempts <18) {
        return two;
    } else if (attempts >= 19 && attempts <25) {
        return one;
    } else if (attempts >= 26) {
        return zero;
    }
}

/* modal window w/ game results - referenced Udacity scholar Sachin's "Modal Box"
   https://codepen.io/sachin03/pen/XYgLWP?editors=1010 */
function showModal() {
    modal.showModal();
    stopGameTimer();

    var modalTime = document.querySelector('#modal-time');
    modalTime.innerHTML = 'Time Taken: ' + watch.getTimeString();

    var modalStars = document.querySelector('#modal-stars');
    modalStars.innerHTML = 'Star Rating: ' + modalStarCounter();

    var modalCounter = document.querySelector('#modal-counter');
    modalCounter.innerHTML = "# of Flips: " + attempts;
}

// function to close the modal 
function closeModal() {
    modal.close();
}

// way to reset the attempts counter
function resetAttempts() {
    attempts = 0;
    document.querySelector('.attempts').innerHTML = attempts;
}

// way to reset the game timer
function resetTime() {
    timer.innerText = '00:00:00';
    watch.resetTimer(function() {
        timer.innerText = watch.getTimeString();
    });
}

// resets to 3 stars when invoked
function resetStars() {
    if (document.getElementById('firstStar').style.display === 'none' || 
        document.getElementById('secondStar').style.display === 'none' ||
        document.getElementById('finalStar').style.display === 'none') {

        document.getElementById('firstStar').style.display = 'inline';
        document.getElementById('secondStar').style.display = 'inline';
        document.getElementById('finalStar').style.display = 'inline';
    } 
}

function resetGame() {
    closeModal();
    resetTime();
    resetAttempts();
    resetStars();
    shuffleTheDeck();
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
