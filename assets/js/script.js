// Picture Game section

/*window.onload = function() {
};*/


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

console.log("hello hello gello")