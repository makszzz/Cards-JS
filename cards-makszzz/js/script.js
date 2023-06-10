// script.js

/*

IMPORTANT:

* All of your code must be adequately commented.
* This includes the code that you write and the code that been provided.

*/

let deck = [];

const container = document.querySelector("#container");
const actions = document.querySelector("#actions");
const shuffleBtn = document.querySelector("#shuffle");
const removeBtn = document.querySelector("#remove");
const newDeckBtn = document.querySelector("#newdeck");
const showFacesBtn = document.querySelector("#showfaces");
const showBacksBtn = document.querySelector("#showbacks");

class PlayingCard {
  constructor(element, face, suit) {
    /*
        Create properties for:
        - element
        - suit
        - face
        - img (set this to `img/${face}_of_${suit}.png`)
        - state (set this to 0)
        */
    // properties for element, suit, face, img, and state
    this.element = element;
    this.suit = suit;
    this.face = face;
    this.img = `img/${face}_of_${suit}.png`;
    this.state = 0;

    this.element.addEventListener("click", () => {
      /*
            - The event listener must be for a click event
            - The event listener must have logic to switch out the this.element.src
            - It must also change the state if the card is flipped (this.state 0 or 1)
            - To show the back of the card use 'img/back.png'
            */
      // event listener for click event
      if (this.state === 0) {
        this.element.src = this.img;
        this.state = 1;
      } else {
        this.element.src = "img/back.png";
        this.state = 0;
      }
    });
  }

  showFaces() {
    this.element.src = this.img;
  }

  showBacks() {
    this.element.src = "img/back.png";
  }
}

const createCardImage = () => {
  /*
    - Create a constant named img and have it create a new img element
    - Set the src property of the img to 'img/back.png'
    - return the img
    */
  // create a new img element
  const img = document.createElement("img");
  img.src = "img/back.png";
  return img;
};

const displayDeck = () => {
  /*
    - Create a loop that iterates through each card in the deck array
    - in the loop, append the card.element to the container
    - Use a forEach with an arrow function
    */
  // loop through each card in the deck array
  deck.forEach((card) => {
    container.appendChild(card.element);
  });
};

const shuffleDeck = () => {
  for (let i = 0; i < 1000; i++) {
    deck.sort(() => Math.random() - 0.5);
  }
};

const removeCard = () => {
  if (deck.length != 0) {
    card = document.querySelector("img");
    card.remove();
    deck.shift();
    if (deck.length == 0) {
      actions.innerHTML = "There are no cards left in the deck.";
    }
  }
};

const buildDeck = () => {
  const suits = ["hearts", "spades", "diamonds", "clubs"];
  const faces = [
    "ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king",
  ];

  suits.forEach((suit) => {
    faces.forEach((face) => {
      /*
            - Call the createdCardImage() function and assign the return img element to a variable named image
            - Set the id attribute of the image to `${face}_of_${suit}.png`
            - Use the .push method to push a new PlayingCard object into the deck array
            - Do the .push and object creation in a single statement
            */
      // call the createCardImage() function
      const image = createCardImage();
      image.id = `${face}_of_${suit}.png`;
      deck.push(new PlayingCard(image, face, suit));
    });
  });
};

const clearActions = () => {
  actions.innerHTML = "";
};

shuffleBtn.addEventListener("click", () => {
  actions.innerHTML = "The deck of cards has been shuffled.";
  container.innerHTML = "";
  shuffleDeck();
  setTimeout(displayDeck, 500);
  setTimeout(clearActions, 10000);
});

removeBtn.addEventListener("click", () => {
  actions.innerHTML = "A card was removed.";
  removeCard();
  setTimeout(clearActions, 10000);
});

newDeckBtn.addEventListener("click", () => {
  actions.innerHTML = "A new deck of cards has been created for you.";
  deck = [];
  container.innerHTML = "";
  buildDeck();
  setTimeout(displayDeck, 500);
  setTimeout(clearActions, 10000);
});

showFacesBtn.addEventListener("click", () => {
  actions.innerHTML = "All of the card faces are now showing.";
  deck.forEach((card) => {
    card.showFaces();
  });
});

showBacksBtn.addEventListener("click", () => {
  actions.innerHTML = "All of the card backs are now showing.";
  deck.forEach((card) => {
    card.showBacks();
  });
});

const start = () => {
  buildDeck();
  shuffleDeck();
  displayDeck();
};

start();
