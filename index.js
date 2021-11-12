/* 
  Fixing the mobile viewport problem with 'height: 100vh'
  which does not apply correctly on mobile devices.
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


/* Grab elements */
const categories = document.querySelector('.categories');
const pickCategoryAnimals = document.querySelector('.category-item-animals');
const pickCategoryBirds = document.querySelector('.category-item-birds');
const pickCategoryColors = document.querySelector('.category-item-colors');
const pickCategoryFruits = document.querySelector('.category-item-fruits');
const pickCategoryCountries = document.querySelector('.category-item-countries');
const pickCategoryTrees = document.querySelector('.category-item-trees');
const pickCategoryTech = document.querySelector('.category-item-tech');
const alphabetList = document.querySelector('.alphabet-list');
const alphabetListItems = document.querySelector('.alphabet-list-items');
const gamePage = document.querySelector('.game-page');
const newGame = document.querySelector('.new-game');
const textPanel = document.querySelector('.text-panel');
const currentCategory = document.querySelector('.current-category');
const wordToGuess = document.querySelector('.word-to-guess');
const youWin = document.querySelector('.you-win');
const partyEmoticons = document.querySelector('.party-emoticons');


/* Declare variables */
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];

// polar bear, tv set, washing machine, mobile phone, refrigerator, coffee machine, vacuum cleaner

let animals = [
'bear', 'rabbit', 'fox', 'wolf', 'elephant', 'panda', 'tiger', 'lion', 'crocodile', 'hedgehog', 
'cat', 'dog', 'hamster', 'mouse', 'dinosaur', 'zebra', 'squirrel', 'moose', 'deer', 'goat', 'lynx', 'pig'];
let fruits = ['orange', 'pear', 'apple', 'tangerine', 'mango', 'lemon', 'plum', 'watermelon', 
'melon', 'grapefruit', 'aprikot', 'nectarine', 'peach'];
let colors = ['red', 'blue', 'green', 'yellow', 'white', 'black', 'orange', 'brown', 'pink', 'gray'];
let birds = ['sparrow', 'swallow', 'cuckoo', 'pigeon', 'crow', 'swan', 'duck', 'eagle', 'goose', 'stork', 'flamingo', 'woodpecker'];
let countries = ['Estonia', 'America', 'Denmark', 'Finland', 'England', 'Sweden', 'Poland', 'Netherlands', 'Portugal', 'Norway', 
'Austria', 'Latvia', 'Lithuania', 'Belgium'];
let trees = ['maple', 'spruce', 'birch', 'pine', 'alder', 'rowan', 'lilac'];
let tech = ['tv', 'dishwasher', 'fridge', 'oven', 'stove', 'dryer', 'computer', 'printer', 'iron', 'toaster'];

let rightGuesses = [];
// let replaceRandomWord;
// let ind;
// let randomWord;
// let category;
let li;


/* Create/display the alphabet */
alphabet.forEach((item) => {
  li = document.createElement("li");
  li.id = item;
  li.innerText = item;
  alphabetListItems.appendChild(li);
});


/* Event listeners */
[pickCategoryAnimals, pickCategoryBirds, pickCategoryColors, pickCategoryFruits, pickCategoryCountries, pickCategoryTrees, pickCategoryTech]
.forEach(item => {
  item.addEventListener('click', getCategory);
});

alphabetListItems.addEventListener('click', getLetter);
newGame.addEventListener('click', clearAll);


/* Play the game */
function getCategory(id) {
  categories.style.display = 'none';
  gamePage.style.display = 'flex';
 
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
      theme = 'Home Appliances';
      break;
  }
  
  randomWord = category[Math.floor(Math.random() * category.length)].toLowerCase();
  let getRandomWordLength = randomWord.length;
  replaceRandomWord = '_'.repeat(getRandomWordLength);
  splitReplaceRandomWord = replaceRandomWord.split("");

  currentCategory.innerHTML = `
  <p class="current-category">
    Category: ${theme}
  </p>
`;

  wordToGuess.innerHTML = `
    <p class="word-to-guess">
      ${replaceRandomWord}
    </p>
  `;
};


function getLetter(e) {
  if (e.target && e.target.nodeName == "LI") {   // console.log(e.target.nodeName), it will result LI
    letter = e.target.id;
    ind = randomWord.indexOf(letter);
 
    const getEl = document.getElementById(letter);
    getEl.style.visibility = 'hidden';
  }

    if (randomWord.includes(letter) && (!rightGuesses.includes(letter))) {
      for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === letter) {
          rightGuesses.push(letter);
          splitReplaceRandomWord.splice(ind, 1, letter); 
          splitReplaceRandomWord.splice(randomWord.lastIndexOf(letter), 1, letter); 
        }
      }
      
      wordToGuess.innerHTML = `
      <p>
        ${splitReplaceRandomWord.join(" ")}
      </p>
      `;

      sortedRightGuesses = rightGuesses.sort().join("");
      let splitRandomWord = randomWord.split("").sort().join("");

      if (sortedRightGuesses === splitRandomWord) {
        currentCategory.style.display = 'none';
        youWin.style.display = 'flex';
        wordToGuess.innerHTML = `<p class="word-guessed">${randomWord}</p>`;
        partyEmoticons.style.display = 'flex';
      }
    } 
  };
    

/* Clear everything and start a new game */
function clearAll() {
  location.reload()
};