/*
 * A list that holds all of your cards
 */
let currentCardIndex = -1;
let cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf",
  "bicycle", "bomb"
];

// Double each type of the initial cards

cards = cards.concat(cards);

// Few variable declarations

let moves = 0;
let matches = 0;
let time = 0;
let interval = null;

// Initial Game Setup

function setupGame() {

  // Shuffle all the cards before showing them
  cards = shuffle(cards);

  // Show game window if previously hidden by Score Card
  showGameWindow();

  // Start the timer clock when game starts
  interval = setInterval(function() {
    time++;
    $('.timer').text(time);
  }, 1000);

  // Reset the deck
  $(".deck").html('');

  // Add Random Cards to the Deck
  cards.map((card) => {
    $('.deck').append("<li class='card'><i class='fa fa-" +
      card + "'></i></li>");
  });

  // Card click listner
  $(".deck li").on('click', function() {
    let index = $(this).index();
    $(".deck li").eq(index).addClass('open show');
    if (currentCardIndex !== index) {
      // When the card is first card
      if (currentCardIndex === -1) {
        openNewCard(index);
        // When the second card matches first
      } else if (cards[currentCardIndex] === cards[index]) {
        cardMatched(index);
        // When the second card doesn't match first
      } else {
        cardUnMatched(index);
      }
      moves++;
      setRatings(moves);
      // End game condition
      if (matches === 8) {
        showScoreCard();
        if (interval) {
          clearInterval(interval);
        }
      }
    }
    // Udate number of moves on Each card match or unmatch
    $('.moves').text(Math.floor(moves / 2));
  });
}

// Changes star rating based on number of moves

function setRatings(moves) {
  $('.stars').html('');
  if (moves > 34) {
    $('.stars').html('<li><i class="fa fa-star"></i></li><li>');
  } else if (moves > 26 && moves <= 34) {
    $('.stars').html('<li><i class="fa fa-star"></i></li>' +
      '<li><i class="fa fa-star"></i></li>');
  } else {
    $('.stars').html('<li><i class="fa fa-star"></i></li>' +
      '<li><i class="fa fa-star"></i></li>' +
      '<li><i class="fa fa-star"></i></li>');
  }
}

// This function is called when the card turned is the first card

function openNewCard(index) {
  currentCardIndex = index;
}

// Contols what happens if 2nd card matches 1st card

function cardMatched(index) {
  matches++;
  setTimeout(() => {
    $(".deck li").eq(currentCardIndex).removeClass('show');

    $(".deck li").eq(currentCardIndex).addClass('match');
    $(".deck li").eq(index).addClass('match');

    $(".deck li").eq(currentCardIndex).off('click');
    $(".deck li").eq(index).off('click');

    currentCardIndex = -1;
  }, 200);

}

// Contols what happens when 2nd card doesn't match 1st

function cardUnMatched(index) {
  setTimeout(() => {

    $(".deck li").eq(currentCardIndex).removeClass('show');
    $(".deck li").eq(index).removeClass('show');

    currentCardIndex = -1;
  }, 200);
}

// Shows game when game is started, hides score card

function showGameWindow() {
  $('.deck').show();
  $('.score-panel').show();
  $('.final-score').hide();
}

// Shows score card when game ends, hides game window

function showScoreCard() {
  $('.deck').hide();
  $('.score-panel').hide();
  $('.final-score').show();
}

// Resets the game

function reset() {
  time = 0;
  moves = 0;
  matches = 0;
  $('.moves').text(0);
  $('.timer').text(0);
  if (interval) {
    clearInterval(interval);
  }
  showGameWindow();
  setupGame();
  setRatings(moves);
}

// Loads game when document is ready

$(function() {
  setupGame();
  $('.restart').click(reset);
});


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
