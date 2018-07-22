

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


var allTheCards = document.querySelectorAll('.card');
var cardArray = [];

let firstClick = false;
let lastOne = null;

beginGame();



function flipCards() {
    allTheCards.forEach(function(card) {
        card.addEventListener('click', function(event) {
            card.classList.add('open', 'show');
        });
    });
};

function addToArray () {
    allTheCards.forEach(function(card) {
        card.addEventListener('click', function(event){
            cardArray.push(lastOneFlipped);
            cardArray.push(cardFlipped);
        });
    });
};



function hideCards () {
    allTheCards.forEach(function(card) {
        card.addEventListener('click', function(event) {
            if (cardArray.length == 2) {
                setTimeout(function() {
                    cardArray.forEach(function(card) {
                        card.classList.remove('open', 'show');
                    });
                    cardArray = [];
                }, 850);
            }
        })
    });
}

function matchLogic () {
    allTheCards.forEach(function(card) {
        card.addEventListener('click', function() {
            if (firstClick === false) {
                firstClick = true;
            }

            if(lastOne === card) { return };

            card.classList.add('open', 'show');

            if (lastOne !== null) {
                let lastOneFlipped = lastOne.children[0].className;
                let cardFlipped = card.children[0].className;
                // cardArray.push(lastOneFlipped);
                // cardArray.push(cardFlipped);

                if (lastOneFlipped === cardFlipped) {
                    lastOne = null;
                } else {
                    setTimeout(function() {
                        card.classList.remove('open', 'show');
                        lastOne.classList.remove('open', 'show');
                        lastOne = null;
                    }, 1250);
                }
            } else {
                lastOne = card;
            }
        })
    })
};

function beginGame() {

};

// matchLogic(function() {
//     addToArray();
// });

// matchLogic(function() {
//     if (lastOneFlipped.classList('open') && cardFlipped.classList('open'))
//         cardArray.push(lastOneFlipped);
//         cardArray.push(cardFlipped);
// });



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

//  ========================
//  unworking Co.de.
//  ========================

// function addToArray () {
//     allTheCards.forEach(function(card) {
//         card.addEventListener('click', function(event) {
    
//             var firstCard = cardArray[0].dataset.card;
//             var secondCard = cardArray[0].dataset.card;
    
//             if (firstCard === secondCard) {
//                 console.log(firstCard);
//                 console.log(secondCard);
//             };    
//         });
//     });
// };

// var gameCards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',
//                  'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt',
//                  'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf',
//                  'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb',
//                 ];