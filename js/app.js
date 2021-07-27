'use strict';

console.log('Greetings Earthlings');


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

// defining left, center, and right item variables. value is null because null states that it has no value. Its explicitly nothing
let leftItem = null;
let centerItem = null;
let rightItem = null;

//--------------------------------Constructor Function-----------------------------//

// constructor function that creates an object associated with each product.
function Item(name, imgPath) {
  this.name = name;
  this.img = imgPath;
  this.votes = 0;
  this.views = 0;

  // Item.allItems.push(this);this funiton should not do external processes its made to define features of a produt. need to make a new function. 
}

// array of all the instances of the constructor function Item. 
Item.allItems = [];

//----------------------------Constructor Related Stuff----------------------------//

// tells which img and h2 should be updated on HTML page. leftItem.renderItem (leftImgElem, leftH2Elem).
Item.prototype.renderItem = function(img, h2) {
  img.src = this.img;
  img.alt = this.name;
  h2.textContent = this.name;
  // For each of the three images, increment its property of times it has been shown by one.
  this.views++;
}

//----------------------------------Global Functions-------------------------------//


// function that randomly generates three items from the array.
function randomItems(){
// /// includes is an array method that loops through array and gives us a true or false if that object or element exsits within the array. 
  const doNotUse = [leftItem, centerItem, rightItem];
  while (doNotUse.includes(leftItem)){
    let leftIndex =  Math.floor(Math.random() * Item.allItems.length);
    leftItem = Item.allItems [leftIndex];
  }
  /// null, null, null is still in the array but we are adding a new value to the end of the array. 
  doNotUse.push(leftItem);
  console.log(doNotUse);

  while (doNotUse.includes(centerItem)){
    let centerIndex =  Math.floor(Math.random() * Item.allItems.length);
    centerItem = Item.allItems [centerIndex];
  }
  doNotUse.push(centerItem);
  console.log(doNotUse);

  while (doNotUse.includes(rightItem)){
    let rightIndex =  Math.floor(Math.random() * Item.allItems.length);
    rightItem = Item.allItems [rightIndex];
  }
  // doNotUse.push(rightItem); don't need to do this again because we already have checked against the others. We want to randomize it but we do not need to push it into the do not use list because the other two items will already be different from it. 
}

function renderTheItems (){
  leftItem.renderItem(leftImgElem, leftH2Elem);
  centerItem.renderItem(centerImgElem, centerH2Elem);
  rightItem.renderItem(rightImgElem, rightH2Elem);
}

function renderResults(){
  // ulElem.textContent = '';
  for (let i=0; i < Item.allItems.length; i++){
    let ulElem = document.createElement('ul')
    itemContainerElem.appendChild(ulElem);
    let item = Item.allItems[i];
    let liElem = document.createElement('li');
    liElem.textContent = `${item.name} had ${item.votes} votes and was seen ${item.views} times.`;
    ulElem.appendChild(liElem);
  }
}

//when user clicks an image we want to record the item clicked. and generate three new products. Once click counter equals 25 (10 for testing) the user will see a button to click for results.(maybe a new function for this) 
function handleClick (e){
  // alert(e.target.id);
  let imageClicked = e.target.id;
  //if they made a valid pick. aka cliked an image. we go into this code block and update how many selections they made and update vote count for image. then we need to choose 3 new images (randomItems) and render those images.
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
    // choose 3 new random images
    randomItems();
    // render three images
    renderTheItems();
  }

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

function handleButton(e){
  // alert(e.target.id);
  let buttonClicked = e.target.id;
  if (buttonClicked === 'buttonSubmit') {
    renderResults();
    showChart();
    makeBarChart();
    itemContainerElem.removeEventListener('click', handleButton);
  }
}

// function to hide chart from the page until after submit button is hit
function hideChart (){
  document.getElementById('myChart').style.visibility = 'hidden';
}

// function to show chart after submit button is hit. 
function showChart (){
  document.getElementById('myChart').style.visibility = 'visible';
}

//-------------------------------------Add Event Listeners-------------------------//

itemContainerElem.addEventListener('click', handleClick);

itemContainerElem.addEventListener('click', handleButton);

//-------------------------------------Call Functions------------------------------//

//could make a function that does the push for me. refactor this later. make it work then make it pretty. function that takes these as arguments, pass through consturctor funtion then pushes.
Item.allItems.push(new Item('Bag', './img/bag.jpg'));
Item.allItems.push(new Item('Banana', './img/banana.jpg'))
Item.allItems.push(new Item('Bathroom', './img/bathroom.jpg'));
Item.allItems.push(new Item('Boots', './img/boots.jpg'));
Item.allItems.push(new Item('Breakfast', './img/breakfast.jpg'));
Item.allItems.push(new Item('Bubblegum', './img/bubblegum.jpg'));
Item.allItems.push(new Item('Chair', './img/chair.jpg'));
Item.allItems.push(new Item('Cthulhu', './img/cthulhu.jpg'));
Item.allItems.push(new Item('Dog-Duck', './img/dog-duck.jpg'));
Item.allItems.push(new Item('Dragon', './img/dragon.jpg'));
Item.allItems.push(new Item('Pen', './img/pen.jpg'));
Item.allItems.push(new Item('Pet-Sweep', './img/pet-sweep.jpg'));
Item.allItems.push(new Item('Scissors', './img/scissors.jpg'));
Item.allItems.push(new Item('Shark', './img/shark.jpg'));
Item.allItems.push(new Item('Sweep', './img/sweep.png'));
Item.allItems.push(new Item('Tauntaun', './img/tauntaun.jpg'));
Item.allItems.push(new Item('Unicorn', './img/unicorn.jpg'));
Item.allItems.push(new Item('Water-Can', './img/water-can.jpg'));
Item.allItems.push(new Item('Wine-Glass', './img/wine-glass.jpg'));

randomItems();
renderTheItems();
hideChart();

//-------------------------------------Create Bar Chart------------------------------//


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




