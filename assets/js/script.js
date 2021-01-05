let imgOne = document.getElementById("image-one");
let imgTwo = document.getElementById("image-two");

imgOne.onclick = function() {
    imgOne.src = "assets/images/loading.gif"; // This image will appear while the webpage loads an image from the API
};

imgTwo.onclick = function() {
    imgTwo.src = "assets/images/loading.gif"; // This image will appear while the webpage loads an image from the API
};