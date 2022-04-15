/* 
  Fixing the mobile viewport problem with 'height: 100vh'
  which does not apply correctly on mobile devices due to
  the address bar on top of the screen.
 */

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});


import categories from './categories.js';


const pickCategory = document.querySelector('.pick-category');
const alphabetListItems = document.querySelector('.alphabet-list-items');
const wordToGuess = document.querySelector('.word-to-guess');

let randomWord;
let wordLength;
let splittedWord;
let letter;
const rightGuesses = [];


// Create the alphabet from the ASCII code
const alphabet = String.fromCharCode(...Array(91).keys()).slice(65).split('');


// The game starts when the user clicks on any letter
alphabetListItems.addEventListener('click', playTheGame);


// Create categories dynamically
const pickCategoryHtml = categories.map((category) => {
  return `<button id="${category.id}" class="pick-category-button">${category.theme}</button>`;
});
pickCategory.innerHTML = pickCategoryHtml.join('');


// Display the picked category
pickCategory.addEventListener('click', (e) => {
  const target = e.target;
  if (target.tagName === 'BUTTON') {
    const index = categories.findIndex((category) => category.id === target.id);
    document.querySelector('.current-category').textContent += categories[index].theme;
    
    const categoryList = categories[index].list;
    initializeGame(categoryList);
  }
});


// Initialize the game
function initializeGame(catList) {
  document.querySelector('.categories').style.display = 'none';
  document.querySelector('.game-page').style.display = 'flex';
  createAlphabet();
  getRandomWord(catList);
  getWordLength(randomWord);
  replaceLetters(randomWord);
}


// Display the alphabet
function createAlphabet() {
  return alphabet.map(listItem => alphabetListItems.innerHTML += `<li id="${listItem}">${listItem}</li>`)
}


// Get the random word from the selected category
function getRandomWord(list) {
  randomWord = list[Math.floor(Math.random() * list.length)].toLowerCase();
  return randomWord;
}


/*
  Detect for spaces in the randomly selected word
  and get the length of the word without spaces
*/
function getWordLength(word) {
  wordLength = word.length;
  if (word.indexOf(' ') > 0) {
    const spaces = word.match(/ /g).length;
    wordLength = wordLength - spaces;
  }
  return wordLength;
};


// Replace letters and display the hidden word to the user
function replaceLetters(word) {
  const replacedLetters = word.replaceAll(/[a-zA-Z]/g, "_");
  wordToGuess.textContent = replacedLetters;
  splitWord(replacedLetters);
};


// Split the random word into an array
function splitWord(word) {
  splittedWord = word.split('');
  return splittedWord;
};


// Play the game - guess letters
function playTheGame(e) {
  if (e.target && e.target.nodeName == "LI") {  
    letter = e.target.id;

    document.getElementById(letter).style.visibility = 'hidden';
  }
  
  letter = letter.toLowerCase()

  if (randomWord.includes(letter)) {
    for(let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] === letter) {
        splittedWord[i] = letter;
        rightGuesses.push(letter);
        wordToGuess.textContent = splittedWord.join("");
      }

      if (rightGuesses.length === wordLength) {
        winnerTakesItAll()
      }
    }
  }
};


// Declare that the user has guessed the word
function winnerTakesItAll() {
  document.querySelector('.you-win').style.visibility = 'visible'
  wordToGuess.innerHTML = `<p class="word-guessed">${randomWord}</p>`;
  document.querySelector('.party-emoticons').style.visibility = 'visible';
}


// Clear everything and start a new game
document.querySelector('.new-game').addEventListener('click', () => {
  location.reload();
});
