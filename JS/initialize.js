import { alphabetListItems } from './index.js';

const wordToGuess = document.querySelector('.word-to-guess');

let randomWord;
let wordLength;
let splittedWord;

// Create the alphabet from the ASCII code
const alphabet = String.fromCharCode(...Array(91).keys()).slice(65).split('');

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

export { initializeGame, randomWord, splittedWord, wordLength, wordToGuess };
