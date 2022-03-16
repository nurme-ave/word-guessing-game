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


// Grab elements
const pickCategoryAnimals = document.querySelector('.category-item-animals');
const pickCategoryBirds = document.querySelector('.category-item-birds');
const pickCategoryColors = document.querySelector('.category-item-colors');
const pickCategoryFruits = document.querySelector('.category-item-fruits');
const pickCategoryCountries = document.querySelector('.category-item-countries');
const pickCategoryTrees = document.querySelector('.category-item-trees');
const pickCategoryTech = document.querySelector('.category-item-tech');
const categories = document.querySelector('.categories');
const gamePage = document.querySelector('.game-page');
const alphabetList = document.querySelector('.alphabet-list');
const alphabetListItems = document.querySelector('.alphabet-list-items');
const currentCategory = document.querySelector('.current-category');
const wordToGuess = document.querySelector('.word-to-guess');
const youWin = document.querySelector('.you-win');
const partyEmoticons = document.querySelector('.party-emoticons');
const newGame = document.querySelector('.new-game');


// Declare variables
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];

const animals = ['bear', 'rabbit', 'fox', 'wolf', 'elephant', 'panda', 'tiger', 'lion', 'crocodile', 'hedgehog', 'cat', 
'dog', 'hamster', 'mouse', 'dinosaur', 'zebra', 'squirrel', 'moose', 'deer', 'goat', 'lynx', 'pig', 'polar bear'];
const fruits = ['orange', 'pear', 'apple', 'tangerine', 'mango', 'lemon', 'plum', 'watermelon', 
'melon', 'grapefruit', 'aprikot', 'nectarine', 'peach'];
const colors = ['red', 'blue', 'green', 'yellow', 'white', 'black', 'orange', 'brown', 'pink', 'gray'];
const birds = ['sparrow', 'swallow', 'cuckoo', 'pigeon', 'crow', 'swan', 'duck', 'eagle', 'goose', 'stork', 'flamingo', 'woodpecker'];
const countries = ['Estonia', 'United States Of America', 'Denmark', 'Finland', 'England', 'Sweden', 'Poland', 'Netherlands', 'Portugal', 
'Norway', 'Austria', 'Latvia', 'Lithuania', 'Belgium', 'United Kingdom'];
const trees = ['maple', 'spruce', 'birch', 'pine', 'alder', 'rowan', 'lilac'];
const tech = ['dishwasher', 'fridge', 'oven', 'stove', 'dryer', 'computer', 'printer', 'iron', 'toaster', 'tv set',
'washing machine', 'mobile phone', 'refrigerator', 'coffee machine', 'vacuum cleaner'];

let category;
let theme;
let randomWord;
let wordLength;
let spaces;
let replacedLetters;
let splittedWord;
let letter;
let rightGuesses = [];


// Event listeners
[pickCategoryAnimals, pickCategoryBirds, pickCategoryColors, pickCategoryFruits, pickCategoryCountries, pickCategoryTrees, pickCategoryTech]
.forEach(item => {
  item.addEventListener('click', getCategory);
});

alphabetListItems.addEventListener('click', playTheGame);
newGame.addEventListener('click', startNewGame);


// Get category ID and display it to the user
function getCategory() {
  id = this.id;

  switch (id) {
    case 'animals-category':
      category = animals;
      theme = 'Animals';
      break;
    case 'birds-category':
      category = birds;
      theme = 'Birds';
      break;
    case 'colors-category':
      category = colors;
      theme = 'Colors';
      break;
    case 'fruits-category':
      category = fruits;
      theme = 'Fruits';
      break;
    case 'countries-category':
      category = countries;
      theme = 'Countries';
      break;
    case 'trees-category':
      category = trees;
      theme = 'Trees';
      break;
    case 'tech-category':
      category = tech;
      theme = 'Appliances';
      break;
  }

  currentCategory.textContent += theme;
  renderGame();
};


// Render the game
function renderGame() {
  categories.style.display = 'none';
  gamePage.style.display = 'flex';
  createAlphabet();
  getRandomWord();
  getWordLength(randomWord);
  replaceLetters(randomWord);
};


// Create the alphabet
function createAlphabet() {
  alphabet.forEach((item) => {
    let li = document.createElement('li');
    li.id = item;
    li.textContent = item;
    alphabetListItems.appendChild(li);
  })
};


// Get the random word from the selected category
function getRandomWord() {
  randomWord = category[Math.floor(Math.random() * category.length)].toLowerCase();
  return randomWord;
}

 
/*
  Detect for spaces in the randomly selected word
  and get the length of the word without spaces
*/
function getWordLength(word) {
  wordLength = word.length;
  if (word.indexOf(' ') > 0) {
    spaces = word.match(/ /g).length;
    wordLength = wordLength - spaces;
  }
  return wordLength;
};


// Replace letters and display the hidden word to the user
function replaceLetters(word) {
  replacedLetters = word.replaceAll(/[a-zA-Z]/g, "_");
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
  if (e.target && e.target.nodeName == "LI") {   // console.log(e.target.nodeName), it will result LI
    letter = e.target.id;

    const hideLetter = document.getElementById(letter);
    hideLetter.style.visibility = 'hidden';
  }
  
  if (randomWord.includes(letter)) {
    for(let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] === letter) {
        splittedWord[i] = letter;
        rightGuesses.push(letter);
        wordToGuess.textContent = splittedWord.join("");
      }

      if (rightGuesses.length === wordLength) {
        youWin.style.visibility = 'visible'
        wordToGuess.innerHTML = `<p class="word-guessed">${randomWord}</p>`;
        partyEmoticons.style.visibility = 'visible';
      }
    }
  }
};


// Clear everything and start a new game
function startNewGame() {
  location.reload()
};
