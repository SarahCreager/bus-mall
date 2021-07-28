'use strict';

console.log('Greetings Earthlings');



// try append child rather than hiding and rendering chart.



// --------------------------------Global Variables--------------------------------//

// total of 25 selections allowed. Will increment till we hit 25.
let clickCounter = 0;

// reference in HTML where all the items will go.
const itemContainerElem = document.getElementById('allItems');

// left item HTML reference
const leftImgElem = document.getElementById('leftItemImg');
const leftH2Elem = document.getElementById('leftItemH2');

// center item HTML reference
const centerImgElem = document.getElementById('centerItemImg');
const centerH2Elem = document.getElementById('centerItemH2');

// right item HTML reference
const rightImgElem = document.getElementById('rightItemImg');
const rightH2Elem = document.getElementById('rightItemH2');

// defining left, center, and right item variables. Null states that the Object is explicitly nothing to start.
let leftItem = null;
let centerItem = null;
let rightItem = null;

//--------------------------------Constructor Function-----------------------------//

// constructor function that creates an object associated with each Item.
function Item(name, imgPath, votes, views) {
  this.name = name;
  this.img = imgPath;
  this.votes = votes;
  this.views = views;
}

// array of all the instances of the constructor function.
Item.allItems = [];

//----------------------------Constructor Related Stuff----------------------------//

// takes in img and h2 references from our global variables above and renders a single image/h2 to each object in reference to its location in the html. (leftItem.renderItem (leftImgElem, leftH2Elem).)
Item.prototype.renderItem = function(img, h2) {
  img.src = this.img;
  h2.alt = this.name;
  h2.textContent = this.name;
  // incrementing how many times the image has been shown.
  this.views++;
};

//----------------------------------Global Functions-------------------------------//


// function that randomly generates three items from the array.
function randomItems(){

  // created an array of leftItem, centerItem, and rightItem items to keep track of which have been used, so that items are not duplicates from the immediate previous set.
  const doNotUse = [leftItem, centerItem, rightItem];
  // while the doNotUse array contains the leftItem, we randomize it and push a new left into the array.
  while (doNotUse.includes(leftItem)){
    let leftIndex =  Math.floor(Math.random() * Item.allItems.length);
    leftItem = Item.allItems [leftIndex];
  }
  /// null, null, null is still in the array but we are adding a new value to the end of the array.
  doNotUse.push(leftItem);

  // while the doNotUse array contains the centerItem, we randomize it and push a new center item into the array.
  while (doNotUse.includes(centerItem)){
    let centerIndex =  Math.floor(Math.random() * Item.allItems.length);
    centerItem = Item.allItems [centerIndex];
  }
  doNotUse.push(centerItem);

  // while the doNotUse array contains the rightItem, we randomize it. We don't need to push this item because we already have checked against the others. We want to randomize it but we do not need to push it into the do not use list because the other two items will already be different from it.
  while (doNotUse.includes(rightItem)){
    let rightIndex =  Math.floor(Math.random() * Item.allItems.length);
    rightItem = Item.allItems [rightIndex];
  }
}

// renders the left, center and right items.
function renderThreeItems (){
  leftItem.renderItem(leftImgElem, leftH2Elem);
  centerItem.renderItem(centerImgElem, centerH2Elem);
  rightItem.renderItem(rightImgElem, rightH2Elem);
}

// renders the results to the page in the form of li.
function renderResults(){
  // ulElem.textContent = '';
  for (let i=0; i < Item.allItems.length; i++){
    let ulElem = document.createElement('ul');
    itemContainerElem.appendChild(ulElem);
    let item = Item.allItems[i];
    let liElem = document.createElement('li');
    liElem.textContent = `${item.name} had ${item.votes} votes and was seen ${item.views} times.`;
    ulElem.appendChild(liElem);
  }
}

//when user clicks an image we want to record the item clicked. and generate three new products. Once click counter equals 25 the user will see a button to click for results.(maybe could add a new function to make button).
function handleClick (e){
  // alert(e.target.id);
  let imageClicked = e.target.id;
  //if they made a valid pick. aka cliked an image. we go into this code block and update how many selections they made and update vote count for each image clicked. Then we need to choose 3 new images (randomItems) and render those images.
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

  // once the alloted selections are up, we wipe the html in this section and add the button element. we also turn off the event listener for item clicks.
  if (clickCounter === 25){
    // alert('show item totals');
    itemContainerElem.textContent = '';
    let buttonElem = document.createElement('button');
    buttonElem.id = 'buttonSubmit';
    buttonElem.textContent = 'get results';
    itemContainerElem.appendChild(buttonElem);

    itemContainerElem.removeEventListener('click', handleClick);
  }
}

// once the button is clicked we show the results list and make the <canvas> element visible and create the bar chart. We also turn off the button listener.
function handleButton(e){
  // alert(e.target.id);
  let buttonClicked = e.target.id;
  //ensures the click that triggers an action is the button click.
  if (buttonClicked === 'buttonSubmit') {
    renderResults();
    showChart();
    makeBarChart();
    putItemsInStorage();
    itemContainerElem.removeEventListener('click', handleButton);
  }
}

// function to hide the bar chart from the page until after the submit button is hit
function hideChart (){
  document.getElementById('myChart').style.visibility = 'hidden';
}

// function to show the bar chart after submit button is hit.
function showChart (){
  document.getElementById('myChart').style.visibility = 'visible';
}


function putItemsInStorage (){
  let stringifiedArray = JSON.stringify(Item.allItems);
  localStorage.setItem('item', stringifiedArray);
}


/// need to somehow update vote and view count when storing new item
function getItemsFromStorage(){
  let itemsInStorage = localStorage.getItem('item');
  if (itemsInStorage) {
    let parsedItems = JSON.parse(itemsInStorage);
    for (let i=0; i<parsedItems.length; i++) {
      let item = parsedItems[i];
      let newItem = new Item (item.name,item.imgPath, item.votes, item.views);
      console.log('new item' + newItem);
      randomItems();
      renderThreeItems();
    }
  }
}

//-------------------------------------Add Event Listeners-------------------------//

// event listener for item selections
itemContainerElem.addEventListener('click', handleClick);

// event listener for button click
itemContainerElem.addEventListener('click', handleButton);

//-------------------------------------Call Functions------------------------------//

function makeNewItems (name, imgPath, votes, views){
  let newItem = new Item (name, imgPath, votes, views);
  Item.allItems.push(newItem);
}

if (Item.allItems.length === 0) {
  makeNewItems('Bag', './img/bag.jpg', 0, 0);
  makeNewItems('Banana', './img/banana.jpg', 0, 0);
  makeNewItems('Bathroom', './img/bathroom.jpg', 0, 0);
  makeNewItems('Boots', './img/boots.jpg', 0, 0);
  makeNewItems('Breakfast', './img/breakfast.jpg', 0, 0);
  makeNewItems('Bubblegum', './img/bubblegum.jpg', 0, 0);
  makeNewItems('Chair', './img/chair.jpg', 0, 0);
  makeNewItems('Cthulhu', './img/cthulhu.jpg', 0, 0);
  makeNewItems('Dog-Duck', './img/dog-duck.jpg', 0, 0);
  makeNewItems('Dragon', './img/dragon.jpg', 0, 0);
  makeNewItems('Pen', './img/pen.jpg', 0, 0);
  makeNewItems('Pet-Sweep', './img/pet-sweep.jpg', 0, 0);
  makeNewItems('Scissors', './img/scissors.jpg', 0, 0);
  makeNewItems('Shark', './img/shark.jpg', 0, 0);
  makeNewItems('Sweep', './img/sweep.png', 0, 0);
  makeNewItems('Tauntaun', './img/tauntaun.jpg', 0, 0);
  makeNewItems('Unicorn', './img/unicorn.jpg', 0, 0);
  makeNewItems('Water-Can', './img/water-can.jpg', 0, 0);
  makeNewItems('Wine-Glass', './img/wine-glass.jpg', 0, 0);
}

// calling function that randomizes 3 images.
randomItems();

// calling function that creates the left, center, and right items. trying to move this into my makeNewItems broke my code. figure out how to consolidate later.
renderThreeItems();

// hides the <canvas> element until the submit button is clicked.
hideChart();

getItemsFromStorage();
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


  // eslint-disable-next-line no-unused-vars
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




