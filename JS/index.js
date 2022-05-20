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


/* START OF THE APP */

import categories from './categories.js';
import { initializeGame } from './initialize.js';

const pickCategory = document.getElementById('pick-category');
const alphabetListItems = document.getElementById('alphabet-list-items');

// Enter the game
document.getElementById('intro').addEventListener('click', () => {
  document.querySelector('.play-button').style.display = 'none';
  document.querySelector('.categories').style.display = 'flex';
})

// Create categories dynamically
const pickCategoryHtml = categories.map((category) => {
  return `<button id="${category.id}" class="pick-category-button">${category.theme}</button>`;
});
pickCategory.insertAdjacentHTML('afterbegin', pickCategoryHtml.join(''));


// Display the picked category
pickCategory.addEventListener('click', (e) => {
  const target = e.target;
  if (target.tagName === 'BUTTON') {
    const index = categories.findIndex((category) => category.id === target.id);
    document.getElementById('current-category').textContent += categories[index].theme;
    
    const categoryList = categories[index].list;
    initializeGame(categoryList);
  }
});

export { alphabetListItems };
