
/* Thanks to Mike Wales and Ryan Waite for their P2 webinars - 
   referenced repetitively */

// empty array to load cards in
var cardArray = [];

// variables to select DOM elements
var deck = document.querySelector('.deck');
var card = document.querySelector('.card');
var attemptCounter = document.querySelector('.attempts');
var timer = document.querySelector('.game-timer');
var modal = document.querySelector("#modal");

// creating variables and setting to 0
var attempts = 0;
var allMatches = 0;

/* referenced Udacity Scholar Matt Cranford's walkthrough
   https://matthewcranford.com/memory-game-walkthrough-part-1-setup/ 
   method for flipping cards over*/
function clickCard(click) {
    click.classList.add('open', 'show');
}

// method to push to the array
function addClickedCard(click) {
    cardArray.push(click);
}

// method to flip cards face down
function hideCard(click) {
    click.classList.remove('open', 'show');
}

/* method to distinguish between matches (by adding the match class) 
   and cards that need flipped back over due to no match */
function matchLogic() {
    if (cardArray[0].firstElementChild.className === cardArray[1].firstElementChild.className) {
        cardArray[0].classList.add('match');
        cardArray[1].classList.add('match');
        cardArray = [];
        incrementMatch();
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

// implementing provided shuffle function on the deck
function shuffleTheDeck () {
    var unshuffled = Array.from(document.querySelectorAll('.deck li'));
    var shuffled = shuffle(unshuffled);
    for (card of shuffled) {
        deck.appendChild(card);
    }
}

// function to increment the attempt counter up
function incrementCounter() {
    attempts++;
    attemptCounter.innerHTML = attempts;
}

/* StopWatch function from Udacity scholar Ryan Waite's "Script Store" -
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

/* thanks to Asmaa & drunkenkismet on Slack for #fend_live_help posts - 
   https://github.com/Zasmaa/memory-game-project-2/blob/master/JS/app.js 
   graphical star representation of how well the player did */
function starRating() {
    if (attempts >= 18 && attempts < 25) {
        document.getElementById('firstStar').style.display = 'none';
    } else if (attempts >= 26) {
        document.getElementById('secondStar').style.display = 'none';
    }
}

// translation of the # of stars received into numerical text in the modal
function modalStarCounter() {
    var three = 3;
    var two = 2;
    var one = 1;

    if (attempts <= 17) {
        return three;
    } else if (attempts >= 18 && attempts < 25) {
        return two;
    } else if (attempts >= 26) {
        return one;
    }
}

/* referenced Udacity scholar Sachin's "Modal Box" from P2 resources -
   https://codepen.io/sachin03/pen/XYgLWP?editors=1010 
   modal window to present results to the player */
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

// way to reset the players # of attempts counter
function resetAttempts() {
    attempts = 0;
    document.querySelector('.attempts').innerHTML = attempts;
}

// way to reset the timer for another game
function resetTime() {
    timer.innerText = '00:00:00';
    watch.resetTimer(function() {
        timer.innerText = watch.getTimeString();
    });
}

// function to reset visual star representation with a reset
function resetStars() {
    if (document.getElementById('firstStar').style.display === 'none' || 
        document.getElementById('secondStar').style.display === 'none') {

        document.getElementById('firstStar').style.display = 'inline';
        document.getElementById('secondStar').style.display = 'inline';
    }
}

// function to count matches
function incrementMatch () {
    allMatches += 1;
}

// function to check for a win
function win() {
    if (allMatches == 8) {
        showModal();
    }
}

/* referenced W3 schools example to figure out how to loop through the cards -
https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_document_queryselectorall_loop_p */
function resetAfterWin() {
    var allCards = document.querySelectorAll('.deck li');
    var i;
    for (i = 0; i < allCards.length; i++) {
        allCards[i].className = 'card';
    }
}

// function holding the methods to restart the game
function resetGame() {
    allMatches = 0;
    cardArray = [];

    closeModal();
    resetTime();
    resetAttempts();
    resetStars();
    resetAfterWin();
    shuffleTheDeck();


}

shuffleTheDeck();

deck.addEventListener('click', function(event) {

    let click = event.target;

    if (click.classList.contains('card') && cardArray.length < 2 && 
        !click.classList.contains('open') &&
        !click.classList.contains('show') &&
        !click.classList.contains('match')) {

        clickCard(click);
        addClickedCard(click);
        startGameTimer();
        starRating();

        if (cardArray.length === 2) {
            matchLogic(click);
            incrementCounter();
        }
    }
    win();
});