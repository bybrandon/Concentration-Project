/*----- constants -----*/
// Each of the "card" objects will be copied twice,
// then shuffled and used for the board's cards
const SOURCE_CARDS = [
  {img: 'https://i.imgur.com/ZXPKaiN.jpg', matched: false},
  {img: 'https://i.imgur.com/XMEsZBX.jpg', matched: false},
  {img: 'https://i.imgur.com/6jX1bMT.jpg', matched: false},
  {img: 'https://i.imgur.com/yKdqsBv.jpg', matched: false},
  {img: 'https://i.imgur.com/1BV3HLr.jpg', matched: false},
  {img: 'https://i.imgur.com/QYmN6Hp.jpg', matched: false},
  {img: 'https://i.imgur.com/D5pWE05.jpg', matched: false},
  {img: 'https://i.imgur.com/Ss4Xo3x.jpg', matched: false}
];
const CARD_BACK = 'https://i.imgur.com/WoEmI2M.jpg'; 

/*----- app's state (variables) -----*/
let cards;
// My array for the card objects(16 Total)
let selectedCard;
let firstCard;
let ignoreClicks;
let countBad ;

/*----- cached element references -----*/
const msgEl = document.querySelector('h4');

/*----- event listeners -----*/
  document.querySelector('main').addEventListener('click', handleChoice);

/*----- functions -----*/
init();


// Initialize all state, then call render()

function init() {
  cards = getShuffledCards();
  firstCard = null;
  secondCard = null;
  ignoreClicks = false;
  countBad = 0;
  winner = null;
  render();
};

 function render() {
    cards.forEach(function(card, idx) {
      const imgEl = document.getElementById(idx);
      const src = (card.matched || card === firstCard) ? card.img: CARD_BACK;
      imgEl.src = src;
      // src(source) is the URL we set up in the index.html
      msgEl.innerHTML = `No Match: ${countBad}`;
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
    if (firstCard) {
      if (firstCard.img === card.img) {
      // correct match, can't comapre objects anymore
        firstCard.matched = card.matched = true;
        // basically if the two cards selected are the same return true
        // Unselects the first card, stops it from being selected once a match is found
      } else {
          countBad++
      }
      firstCard = null;
    }  else {
        firstCard = card;
    }
    render();
   };   
        
    
