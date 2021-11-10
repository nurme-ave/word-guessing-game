/* Grab elements */
const listItems = document.querySelector('.list-items-alphabet');
// const pickCategoryAnimals = document.querySelector('.category-item-animals');
// const pickCategoryBirds = document.querySelector('.category-item-birds');
// const pickCategoryColors = document.querySelector('.category-item-colors');
// const pickCategoryFruits = document.querySelector('.category-item-fruits');
// const pickCategoryCountries = document.querySelector('.category-item-countries');
// const pickCategoryTrees = document.querySelector('.category-item-trees');
// const pickCategoryTech = document.querySelector('.category-item-tech');
// const pickCategoryWater = document.querySelector('.category-item-water');
// const textPanel = document.querySelector('.text-panel');
// const currentCategory = document.querySelector('.current-category');
// const wordToGuess = document.querySelector('.word-to-guess');
// const youWin = document.querySelector('.you-win');
// const categories = document.querySelector('.categories');
// const newGame = document.querySelector('.new-game');


/* Declare variables */
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];

// let animals = [
// 'karu', 'jänes', 'rebane', 'hunt', 'elevant', 'panda', 'tiiger', 'lõvi', 'krokodill', 'siil', 
// 'kass', 'koer', 'hamster', 'hiir', 'dinosaurus', 'sebra', 'jääkaru', 'orav', 'põder', 'hirv', 'kits', 'ilves', 'siga'];
// let fruits = ['apelsin', 'pirn', 'õun', 'mandariin', 'mango', 'õun', 'sidrun', 'ploom', 'arbuus', 
// 'melon', 'greip', 'aprikoos', 'nektariin', 'virsik'];
// let colors = ['punane', 'sinine', 'roheline', 'kollane', 'valge', 'must', 'oranž', 'pruun', 'roosa', 'hall'];
// let birds = ['tihane', 'varblane', 'pääsuke', 'kägu', 'tuvi', 'vares', 'luik', 'part', 'kotkas', 'hani', 'toonekurg', 'flamingo', 'rähn'];
// let countries = ['Eesti', 'Ameerika', 'Taani', 'Soome', 'Inglismaa', 'Rootsi', 'Poola', 'Holland', 'Portugal', 'Norra', 'Austria', 'Läti', 'Leedu', 'Belgia'];
// let trees = ['vaher', 'kuusk', 'kask', 'mänd', 'saar', 'lepp', 'pihlakas', 'sirel'];
// let tech = ['televiisor', 'pesumasin', 'nõudepesumasin', 'mobiiltelefon', 'külmkapp', 'ahi', 'pliit', 'kuivati', 
// 'kohvimasin', 'tolmuimeja', 'arvuti', 'printer', 'triikraud', 'röster'];
// let water = ['ookean', 'järv', 'meri', 'jõgi', 'allikas', 'lomp', 'tiik'];

// let rightGuesses = [];
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
  listItems.appendChild(li);
});


// /* Event listeners */
// [pickCategoryAnimals, pickCategoryBirds, pickCategoryColors, pickCategoryFruits, pickCategoryCountries, pickCategoryTrees, pickCategoryTech, pickCategoryWater]
// .forEach(item => {
//   item.addEventListener('click', getCategory);
// });

// listItems.addEventListener('click', getLetter);
// newGame.addEventListener('click', clearAll);


// /* Play the game */
// function getCategory(id) {
//   categories.style.display = 'none';
//   newGame.style.display = 'flex';
//   textPanel.style.display = 'flex';
 
//   id = this.id;

//   switch (id) {
//     case 'animals-category':
//       category = animals;
//       theme = 'Loomad';
//       break;
//     case 'birds-category':
//       category = birds;
//       theme = 'Linnud';
//       break;
//     case 'colors-category':
//       category = colors;
//       theme = 'Värvid';
//       break;
//     case 'fruits-category':
//       category = fruits;
//       theme = 'Puuviljad';
//       break;
//     case 'countries-category':
//       category = countries;
//       theme = 'Riigid';
//       break;
//     case 'trees-category':
//       category = trees;
//       theme = 'Puud';
//       break;
//     case 'tech-category':
//       category = tech;
//       theme = 'Kodumasinad';
//       break;
//     case 'water-category':
//       category = water;
//       theme = 'Veekogud';
//       break;
//   }
  
//   randomWord = category[Math.floor(Math.random() * category.length)].toLowerCase();
//   let getRandomWordLength = randomWord.length;
//   replaceRandomWord = '_'.repeat(getRandomWordLength);
//   splitReplaceRandomWord = replaceRandomWord.split("");

//   currentCategory.innerHTML = `
//   <p class="current-category">
//     Teema: ${theme}
//   </p>
// `;

//   wordToGuess.innerHTML = `
//     <p class="word-to-guess">
//       ${replaceRandomWord}
//     </p>
//   `;
// };


// function getLetter(e) {
//   if (e.target && e.target.nodeName == "LI") {   // console.log(e.target.nodeName), it will result LI
//     letter = e.target.id;
//     ind = randomWord.indexOf(letter);
 
//     const getEl = document.getElementById(letter);
//     getEl.style.visibility = 'hidden';
//   }

//     if (randomWord.includes(letter) && (!rightGuesses.includes(letter))) {
//       for (let i = 0; i < randomWord.length; i++) {
//         console.log(randomWord[i]);
//         if (randomWord[i] === letter) {
//           rightGuesses.push(letter);
//           splitReplaceRandomWord.splice(ind, 1, letter); 
//           splitReplaceRandomWord.splice(randomWord.lastIndexOf(letter), 1, letter); 
//         }
//       }
      
//       wordToGuess.innerHTML = `
//       <p>
//         ${splitReplaceRandomWord.join(" ")}
//       </p>
//       `;

//       sortedRightGuesses = rightGuesses.sort().join("");
//       let splitRandomWord = randomWord.split("").sort().join("");

//       if (sortedRightGuesses === splitRandomWord) {
//         wordToGuess.innerHTML = `
//           <p class="you-win">
//             Tubli! Arvasid sõna ära: <span class="word-guessed">${randomWord}</span> 🥳🎉😉
//           </p>
//         `
//       }
//     } 
//   };
    

// /* Clear everything and start a new game */
// function clearAll() {
//   location.reload()
// };
