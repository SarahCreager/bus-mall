'use strict';

console.log('Greetings Earthlings');

// --------------------------------Global Variables--------------------------------//

// total of 25 selections allowed. Will increment clicks till we hit 25.
let clickCounter = 0;

// reference in HTML where all the items will go.
const itemContainerElem = document.getElementById('allItems');

// reference in HTML where canvas elem will go.
const canvasContainerElem = document.getElementById('canvasContainer');

// left item HTML reference
const leftImgElem = document.getElementById('leftItemImg');
const leftH2Elem = document.getElementById('leftItemH2');

// center item HTML reference
const centerImgElem = document.getElementById('centerItemImg');
const centerH2Elem = document.getElementById('centerItemH2');

// right item HTML reference
const rightImgElem = document.getElementById('rightItemImg');
const rightH2Elem = document.getElementById('rightItemH2');

// defining left, center, and right item variables. Null states that the object is explicitly nothing to start out.
let leftItem = null;
let centerItem = null;
let rightItem = null;

//--------------------------------Constructor Function-----------------------------//

// constructor function that creates an object associated with each Item.
function Item(name, imgPath) {
  this.name = name;
  this.img = imgPath;
  this.votes = 0;
  this.views = 0;
}

// array of all the instances of the constructor function.
Item.allItems = [];

//----------------------------Constructor Related Stuff----------------------------//

// takes in reference to img elem and h2 elem from our global variables as parameters and places image path and h2 text in HTML.
Item.prototype.renderItem = function(imgElem, h2Elem) {
  imgElem.src = this.img;
  imgElem.alt = this.name;
  h2Elem.textContent = this.name;
  // incrementing how many times the image has been shown.
  this.views++;
};

//---------------------------Global Functions-------------------------------//

// function to create new Items from the constructor function and push them into the allItems array.
function makeNewItems (name, imgPath, votes, views){
  let newItem = new Item (name, imgPath, votes, views);
  Item.allItems.push(newItem);
}


// function that randomly generates three unique items from the array.
function randomItems(){
  const doNotUse = [leftItem, centerItem, rightItem];
  // while the doNotUse array contains the leftItem, we randomize it and push a new leftItem into the array. still don't understand how it remains at 5 items long and then restarts, but it works.
  while (doNotUse.includes(leftItem)){
    let leftIndex =  Math.floor(Math.random() * Item.allItems.length);
    leftItem = Item.allItems [leftIndex];
  }
  doNotUse.push(leftItem);

  while (doNotUse.includes(centerItem)){
    let centerIndex =  Math.floor(Math.random() * Item.allItems.length);
    centerItem = Item.allItems [centerIndex];
  }
  doNotUse.push(centerItem);

  // while the doNotUse array contains the rightItem, we randomize it. We don't need to push this item into the array because the other two items will already be different from it.
  while (doNotUse.includes(rightItem)){
    let rightIndex =  Math.floor(Math.random() * Item.allItems.length);
    rightItem = Item.allItems [rightIndex];
  }
}


// renders the current randomized left, center and right items to the page using the renderItem prototype method above.
function renderThreeItems (){
  leftItem.renderItem(leftImgElem, leftH2Elem);
  centerItem.renderItem(centerImgElem, centerH2Elem);
  rightItem.renderItem(rightImgElem, rightH2Elem);
}

// renders the results to the page in the form of ul.
function renderResultsList(){
  for (let i=0; i < Item.allItems.length; i++){
    let ulElem = document.createElement('ul');
    itemContainerElem.appendChild(ulElem);
    let item = Item.allItems[i];
    let liElem = document.createElement('li');
    liElem.textContent = `${item.name} had ${item.votes} votes and was seen ${item.views} times.`;
    ulElem.appendChild(liElem);
  }
}

// user clicks an image, we record the item clicked and generate 3 new random items.
function handleClick (e){
  // alert(e.target.id);
  let imageClicked = e.target.id;
  //if they made a valid pick. We go into this code block and update clickCounter and vote count.
  if (imageClicked === 'leftItemImg' || imageClicked === 'centerItemImg' || imageClicked === 'rightItemImg') {
    clickCounter++;
    if (imageClicked === 'leftItemImg'){
      leftItem.votes++;
    }
    if (imageClicked === 'centerItemImg'){
      centerItem.votes++;
    }
    if (imageClicked === 'rightItemImg'){
      rightItem.votes++;
    }
    // choose 3 new random images
    randomItems();
    // render three images
    renderThreeItems();
  }

  // once clickCounter is 25, we wipe the html in this section, add the button element, and turn off the event listener.
  if (clickCounter === 25){
    itemContainerElem.textContent = '';
    let buttonElem = document.createElement('button');
    buttonElem.id = 'buttonSubmit';
    buttonElem.textContent = 'get results';
    itemContainerElem.appendChild(buttonElem);
    itemContainerElem.removeEventListener('click', handleClick);
  }
}

// once the button is clicked, we show the results list, create the bar chart, put information in local storage, and turn off the event listener.
function handleButton(e){
  // alert(e.target.id);
  let buttonClicked = e.target.id;
  //if the user clicks the button this code block is run.
  if (buttonClicked === 'buttonSubmit') {
    let canvasElem =document.createElement('canvas');
    canvasElem.id ='myChart';
    canvasContainerElem.appendChild(canvasElem);

    renderResultsList();
    makeBarChart();
    putItemsInStorage();
    itemContainerElem.removeEventListener('click', handleButton);
  }
}

// function to put allItems array in storage in a stringified array.
function putItemsInStorage (){
  let stringifiedArray = JSON.stringify(Item.allItems);
  localStorage.setItem('item', stringifiedArray);
}


// still don't understand how votes are being added, but it works.
function getItemsFromStorage(){
  let itemsInStorage = localStorage.getItem('item');
  if (itemsInStorage) {
    let parsedItems = JSON.parse(itemsInStorage);
    for (let i=0; i<parsedItems.length; i++) {
      let item = parsedItems[i];
      let newItem = new Item(item.name, item.img);
      newItem.votes = item.votes;
      newItem.views = item.views;
      Item.allItems.push(newItem);
    }
  }
}

//-------------------------------------Add Event Listeners-------------------------//

// event listener for item img selections
itemContainerElem.addEventListener('click', handleClick);

// event listener for button click
itemContainerElem.addEventListener('click', handleButton);

//-------------------------------------Call Functions------------------------------//
// pull items from storage if there are any.
getItemsFromStorage();

// only make Items if not already in storage.
if (Item.allItems.length === 0) {
  makeNewItems('Bag', './img/bag.jpg');
  makeNewItems('Banana', './img/banana.jpg');
  makeNewItems('Bathroom', './img/bathroom.jpg');
  makeNewItems('Boots', './img/boots.jpg');
  makeNewItems('Breakfast', './img/breakfast.jpg');
  makeNewItems('Bubblegum', './img/bubblegum.jpg');
  makeNewItems('Chair', './img/chair.jpg');
  makeNewItems('Cthulhu', './img/cthulhu.jpg');
  makeNewItems('Dog-Duck', './img/dog-duck.jpg');
  makeNewItems('Dragon', './img/dragon.jpg');
  makeNewItems('Pen', './img/pen.jpg');
  makeNewItems('Pet-Sweep', './img/pet-sweep.jpg');
  makeNewItems('Scissors', './img/scissors.jpg');
  makeNewItems('Shark', './img/shark.jpg');
  makeNewItems('Sweep', './img/sweep.png');
  makeNewItems('Tauntaun', './img/tauntaun.jpg');
  makeNewItems('Unicorn', './img/unicorn.jpg');
  makeNewItems('Water-Can', './img/water-can.jpg');
  makeNewItems('Wine-Glass', './img/wine-glass.jpg');
}

// calling function that randomizes 3 images.
randomItems();

// calling function that creates the left, center, and right items on page.
renderThreeItems();

//-------------------------------------Create Bar Chart------------------------------//

// function that makes a bar chart with two datasets.
function makeBarChart(){
  const ctx = document.getElementById('myChart').getContext('2d');
  let itemNames = [];
  let itemVotes = [];
  let itemViews = [];
  for (let i=0; i < Item.allItems.length; i++){
    let item = Item.allItems[i];
    itemNames.push(item.name);
    itemVotes.push(item.votes);
    itemViews.push(item.views);
  }

  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: itemNames,
      datasets: [{
        label: 'Votes',
        data: itemVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: 'Views',
        data: itemViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}




