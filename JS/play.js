import { alphabetListItems } from './index.js';
import { randomWord, splittedWord, wordLength, wordToGuess } from './initialize.js';

let letter;
const rightGuesses = [];

// The game starts when the user clicks on any letter
alphabetListItems.addEventListener('click', playTheGame);

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
