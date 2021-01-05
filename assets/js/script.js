// Picture Game section

let imgLeft = document.getElementById("image-left");
let imgRight = document.getElementById("image-right");

let imgOne = document.querySelector("#image-left img");
let imgTwo = document.querySelector("#image-right img");

let clicks = 0;

imgOne.onclick = function() { // This image will appear while the webpage loads an image from the API
    imgLeft.innerHTML = `
        <img src="assets/images/loading.gif" alt="Loading image">
        <p>Please wait. Your image is being loaded.</p>`;
};

imgTwo.onclick = function() { // This image will appear while the webpage loads an image from the API
    imgRight.innerHTML = `
        <img src="assets/images/loading.gif" alt="Loading image">
        <p>Please wait. Your image is being loaded.</p>`;
};

let randomID = Math.floor(Math.random() * 1000000) + 100000; // Creates a random number between 100 000 and 999 999 to match a random food meal ID given in the API
let secondRandomID = Math.floor(Math.random() * 1000000) + 100000; // Creates another random number between 100 000 and 999 999

while (randomID === secondRandomID) { // If the secondRandomID variable is equal to the randomID, then another random number will be selected
    secondRandomID = Math.floor(Math.random() * 1000000) + 100000;
};

randomID = 424571; // testing
secondRandomID = 419357; // testing

