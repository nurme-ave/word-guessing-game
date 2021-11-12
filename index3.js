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

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];

// polar bear, tv set, washing machine, mobile phone, refrigerator, coffee machine, vacuum cleaner
const animals = ['polar bear', 'fox', 'wolf'];
// const animals = ['polar bear', 'fox', 'white polar white bear'];
// const animals = [
// 'bear', 'rabbit', 'fox', 'wolf', 'elephant', 'panda', 'tiger', 'lion', 'crocodile', 'hedgehog', 
// 'cat', 'dog', 'hamster', 'mouse', 'dinosaur', 'zebra', 'squirrel', 'moose', 'deer', 'goat', 'lynx', 'pig'];
const fruits = ['orange', 'pear', 'apple', 'tangerine', 'mango', 'lemon', 'plum', 'watermelon', 
'melon', 'grapefruit', 'aprikot', 'nectarine', 'peach'];
const colors = ['red', 'blue', 'green', 'yellow', 'white', 'black', 'orange', 'brown', 'pink', 'gray'];
const birds = ['sparrow', 'swallow', 'cuckoo', 'pigeon', 'crow', 'swan', 'duck', 'eagle', 'goose', 'stork', 'flamingo', 'woodpecker'];
const countries = ['Estonia', 'America', 'Denmark', 'Finland', 'England', 'Sweden', 'Poland', 'Netherlands', 'Portugal', 'Norway', 
'Austria', 'Latvia', 'Lithuania', 'Belgium'];
const trees = ['maple', 'spruce', 'birch', 'pine', 'alder', 'rowan', 'lilac'];
const tech = ['tv', 'dishwasher', 'fridge', 'oven', 'stove', 'dryer', 'computer', 'printer', 'iron', 'toaster'];

let category;
let li;
let theme;
let spaceInRandomWord;
let replaceRandomWord;
let splitRandomWord;


/* Event listeners */
[pickCategoryAnimals, pickCategoryBirds, pickCategoryColors, pickCategoryFruits, pickCategoryCountries, pickCategoryTrees, pickCategoryTech]
.forEach(item => {
  item.addEventListener('click', getCategory);
});


function createAlphabet() {
  alphabet.forEach((item) => {
    li = document.createElement('li');
    li.id = item;
    li.innerText = item;
    alphabetListItems.appendChild(li);
  })
};


/* Get category ID and display it to the user */
function getCategory(id) {
  id = this.id;
  console.log(id);

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

  currentCategory.innerHTML = `
    <p class="current-category">
      Category: ${theme}
    </p>
  `;
  
  playTheGame();
};


/* Get the random word from the selected category */
function getRandomWord() {
  randomWord = category[Math.floor(Math.random() * category.length)].toLowerCase();
  console.log(randomWord);
  return randomWord;
}


function checkForSpacesInRandomWord() {
  spaceInRandomWord = randomWord.indexOf(' ');
  console.log(spaceInRandomWord);
};


function replaceRW() {
    // if (i !== spaceInRandomWord) {
      replaceRandomWord = randomWord.replaceAll(/[a-zA-Z]/g, "_");
      console.log(replaceRandomWord);
    // }
  
    wordToGuess.innerHTML = `
      <p class="word-to-guess">
        ${replaceRandomWord}
      </p>
    `

    splitRW();

};


function splitRW() {
  splitRandomWord = randomWord.split('').sort();
  console.log(splitRandomWord);
}





// function displayRandomWord() {
//   let getRandomWordLength = randomWord.length;
//   replaceRandomWord = '_'.repeat(getRandomWordLength);
//   splitReplaceRandomWord = replaceRandomWord.split("");

//   wordToGuess.innerHTML = `
//     <p class="word-to-guess">
//       ${replaceRandomWord}
//     </p>
//   `;

//   console.log(splitReplaceRandomWord);
// }


/* Play the game */
function playTheGame() {
  categories.style.display = 'none';
  gamePage.style.display = 'flex';
  createAlphabet();
  getRandomWord();
  // displayRandomWord();
  // checkForSpacesInRandomWord();
  replaceRW();
};
