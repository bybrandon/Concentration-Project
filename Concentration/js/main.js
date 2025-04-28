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
let firstCard;


/*----- cached element references -----*/


/*----- event listeners -----*/


/*----- functions -----*/
init();


// Initialize all state, then call render()

function init() {
  cards = getShuffledCards();
  firstCard = null;
  render();
};

 function render() {
    cards.forEach(function(card, idx) {
      const imgEl = document.getElementById(idx);
      const src = (card.matched || card === firstCard) ? card.img: CARD_BACK;
      imgEl.src = src;
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
  }

      
        
    
