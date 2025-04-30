/*----- constants -----*/
// Each of the "card" objects will be copied twice,
// then shuffled and used for the board's cards
const SOURCE_CARDS = [
  {img: 'https://upload.wikimedia.org/wikipedia/en/e/e2/Songs_in_the_key_of_life.jpg', matched: false},
  {img: 'https://upload.wikimedia.org/wikipedia/en/b/b8/Bob_Marley_and_the_Wailers_-_Exodus.png', matched: false},
  {img: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/3/11/1426099817173/f1efb3f4-9a6d-4f78-8ca8-594ab646d198-bestSizeAvailable.jpeg?width=465&dpr=1&s=none&crop=none', matched: false},
  {img: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Off_the_wall.jpg', matched: false},
  {img: 'https://upload.wikimedia.org/wikipedia/en/1/15/Travis_Scott_-_Rodeo.png', matched: false},
  {img: 'https://upload.wikimedia.org/wikipedia/en/9/99/Process_-_Sampha_album.jpg', matched: false},
  {img: 'https://upload.wikimedia.org/wikipedia/en/2/27/Ella-fitzgerald-lullabies-of-birdland.jpg', matched: false},
  {img: 'https://upload.wikimedia.org/wikipedia/en/1/14/Jazmine_Sullivan_-_Fearless_%28album_cover%29.jpg', matched: false}
];
const CARD_BACK = 'https://i.imgur.com/WoEmI2M.jpg'; 

/*----- app's state (variables) -----*/
let cards;
// My array for the card objects(16 Total)
let selectedCard;
let firstCard;
let secondCard;
let winner;
let ignoreClicks;
let countBad;

/*----- cached element references -----*/
const msgEl = document.querySelector('h4');
const moreMatchesBtn = document.getElementById('more-matches');

/*----- event listeners -----*/
  document.querySelector('main').addEventListener('click', handleChoice);
  moreMatchesBtn.addEventListener('click', init);
/*----- functions -----*/
init();


// Initialize all state, then call render()

function init() {
  cards = getShuffledCards();
  firstCard = null;
  secondCard = null;
  winner = null;
  ignoreClicks = false;
  countBad = 0;
  render();
};

/*
winner: null -> game in progress;
    true -> win (when all card objects
           have their matched property
           set to true - consider using
           the reduce() or some() iterator methods)
    false -> lost
function handleGuess(evt) {
 // Updating all impacting state

 winner = getWinner();

}
*/
function getWinner() {
  if (cards.every(card => card.matched)) {
    winner = true;
    msgEl.innerText = `🎉 Only Took You ${countBad} Tries!`;
    ignoreClicks = true;
    }
  };


 function render() {
   // renderControls();
   moreMatchesBtn.style.visibility = winner || countBad > 10 ? 'visible' : 'hidden';
    cards.forEach(function(card, idx) {
      const imgEl = document.getElementById(idx);
      const src = (card.matched || card === firstCard || card === secondCard) ? card.img: CARD_BACK;
      imgEl.src = src;
      // src(source) is the URL we set up in the index.html
      msgEl.innerHTML = `No Match: ${countBad}`;
      getWinner();
  });
 }

 function getShuffledCards() {
    const tempCards = [];
    const cards = [];
    
    SOURCE_CARDS.forEach(function (card) {
      tempCards.push({...card}, {...card});
    });

    while (tempCards.length) {
      const randomIndex = Math.floor(Math.random() * tempCards.length);
      // this would generate a random card from the SOURCE_CARDS array
      const randomCard = tempCards.splice(randomIndex, 1)[0];
      // splice always returns a new array of a single object, the [0] gives
      // the one object that is returneed in the splice array
      cards.push(randomCard);
    }
    return cards;
  };

   function handleChoice(evt) {
    const cardIdx = parseInt(evt.target.id);
    if (isNaN(cardIdx) || ignoreClicks) return;
    
    const card = cards[cardIdx];
    if (!firstCard) {
      // the ! makes the console recognize this as the first card (if no first card, make this first card)
      firstCard = card; 
      render(); 
      return;
    }
  
    if (card === firstCard || card.matched) return;
  
    secondCard = card; 
    ignoreClicks = true; 
    render(); 
    
    if (firstCard.img === secondCard.img ) {
      
      // if function for when the cards are matching
    firstCard.matched = true;
   secondCard.matched = true;
    firstCard = null;
    secondCard = null; 
   ignoreClicks = false; 
        render(); 
      } else {
      
      countBad++;
      setTimeout(() => {
        firstCard = null;
        secondCard =  null;
       // secondCard.matched = false; 
        render(); 
        ignoreClicks = false; 
      }, 500);
    }
  };
  
  
  // basically if the two cards selected are the same return true
  // Unselects the first card, stops it from being selected once a match is found
