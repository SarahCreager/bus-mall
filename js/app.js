'use strict';

console.log('Greetings Earthlings');

// display three unique products by chance
// total of 25 selections made
// keep track of total number of votes
// keep track of how many times each item was shown
// keep track of the percentage of times that an item was clicked when it was shown.



// For each of the three images, increment its property of times it has been shown by one.


// --------------------------------Global Variables--------------------------------//

// total of 25 selections allowed. Increment till we hit 25.
let clickCounter = 0;

// reference in HTML where the items will go.
const chooseItemElem = document.getElementById('chooseItems');

// reference in HTML where list of items and clicked counts is kept.
const ulElem = document.getElementById('itemClicks');

// left item HTML reference
const leftImgElem = document.getElementById('leftItemImg');
const leftH2Elem = document.getElementById('leftItemH2');

// center item HTML reference
const centerImgElem = document.getElementById('centerItemImg');
const centerH2Elem = document.getElementById('centerItemH2');

// right item HTML reference
const rightImgElem = document.getElementById('rightItemImg');
const rightH2Elem = document.getElementById('rightItemH2');

// don't understand this yet.
let leftItem = null;
let centerItem = null;
let rightItem = null;


//--------------------------------Constructor Function-----------------------------//

// constructor function that creates an object associated with each product.
function Item(name, imgPath) {
  this.name = name;
  this.img = imgPath;
  this.votes = 0;
  this.imgShownCounter = 0;

  Item.allItems.push(this);
}

// array of all the Items created from (instances of) the constructor function. 
Item.allItems = [];

//----------------------------Constructor Related Stuff----------------------------//

// tells which img path and h2 text should be used for item.
Item.prototype.renderItem = function(img, h2) {
  img.src = this.img;
  h2.textContent = this.name;
}

//----------------------------------Global Functions-------------------------------//


// function that randomly generates three items from the array.
function randomItems(){
  let leftIndex =  Math.floor(Math.random() * Item.allItems.length);
  leftItem = Item.allItems [leftIndex];
  let centerIndex = Math.floor(Math.random() * Item.allItems.length);
  centerItem = Item.allItems [centerIndex];
  let rightIndex = Math.floor(Math.random() * Item.allItems.length);
  rightItem = Item.allItems [rightIndex];

  while (centerItem === null || centerItem === leftItem || centerItem === rightItem) {
    centerIndex = Math.floor(Math.random() * Item.allItems.length);
    centerItem = Item.allItems [centerIndex];
  }

  while (rightItem === null || rightItem === leftItem || rightItem === centerItem) {
    rightIndex = Math.floor(Math.random() * Item.allItems.length);
    rightItem = Item.allItems [rightIndex];
  }
}

function renderTheItems (){
  leftItem.renderItem(leftImgElem, leftH2Elem);
  centerItem.renderItem(centerImgElem, centerH2Elem);
  rightItem.renderItem(rightImgElem, rightH2Elem);
}

function renderResults(){
  ulElem.textContent = '';

  for (let i=0; i < Item.allItems.length; i++){
    let item = Item.allItems[i];
    let liElem = document.createElement('li');
    liElem.textContent = `${item.name}: ${item.votes}`;
    ulElem.appendChild(liElem);
  }
}

//when user clicks an image we want to record the item clicked. and generate three new products. Once click counter equals 25 (10 for testing) the user will see a button to click for results.(maybe a new function for this) 
function handleClick (e){
  // alert(e.target.id);
  let imageClicked = e.target.id;
  if (imageClicked === 'leftItemImg' || imageClicked === 'centerItemImg' || imageClicked === 'rightItemImg') {
    clickCounter++;
    if (imageClicked === 'leftItemImg'){
      leftItem.votes++;
      console.log(leftItem);
    }
    if (imageClicked === 'centerItemImg'){
      centerItem.votes++;
      console.log(centerItem);
    }
    if (imageClicked === 'rightItemImg'){
      rightItem.votes++;
      console.log(rightItem);
    }
    randomItems();
    renderTheItems();
  }

  if (clickCounter === 10){
    alert('show item totals')
    renderResults();
    chooseItemElem.removeEventListener('click', handleClick);
  }
}

//-------------------------------------Add Event Listeners-------------------------//

chooseItemElem.addEventListener('click', handleClick);

//-------------------------------------Call Functions------------------------------//

new Item('Bag', './images/bag.jpg');
new Item('Banana', './images/banana.jpg');
new Item('Bathroom', './images/bathroom.jpg');
new Item('Boots', './images/boots.jpg');
new Item('Breakfast', './images/breakfast.jpg');
new Item('Bubblegum', './images/bubblegum.jpg');
new Item('Chair', './images/chair.jpg');
new Item('Cthulhu', './images/cthulhu.jpg');
new Item('Dog-Duck', './images/dog-duck.jpg');
new Item('Dragon', './images/dragon.jpg');
new Item('Pen', './images/pen.jpg');
new Item('Pet-Sweep', './images/pet-sweep.jpg');
new Item('Scissors', './images/scissors.jpg');
new Item('Shark', './images/shark.jpg');
new Item('Sweep', './images/sweep.png');
new Item('Tauntaun', './images/tauntaun.jpg');
new Item('Unicorn', './images/unicorn.jpg');
new Item('Water-Can', './images/water-can.jpg');
new Item('Wine-Glass', './images/wine-glass.jpg');

randomItems();
renderTheItems();

