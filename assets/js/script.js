// Picture Game section

function setGameData(spoonacularData, numberOfResults) { // Sets the data received from the spoonacular API onto the picture game
    let data = spoonacularData;
    console.log(data);

    let numberOfMenuItems = data.totalMenuItems; // Assigns the number of menu items loaded from our search query onto a variable

    let menuItemIndex = []; // An empty array where the index number of each random meal item selected will be stored 

    let selectedNumberOfImages = 0; 
    let numberOfNeededImages = 15; // Since there are 15 "clicks" needed until the user's selection will be affirmed, we will need 15 different images (and other information on the menu item)
    
    while (selectedNumberOfImages < numberOfNeededImages) {
        let randomMealItemIndex = Math.floor(Math.random() * numberOfResults); // Chooses a random integer from 0 to 99, which will be used as the index number of the various loaded menu items

        if (menuItemIndex.includes(randomMealItemIndex)) {
            continue; // Makes sure that the randomMealItemIndex is not added twice meaning that the image will not be repeated
        } else {
            menuItemIndex.push(randomMealItemIndex);
        };

        selectedNumberOfImages++;
    }; 

    console.log(menuItemIndex);

    let selectedMenuItems = []; // Create an array that will store all of the objects (and the information contained within those objects) of all the selected menu items 

    for (let indexItem = 0; indexItem < menuItemIndex.length; indexItem++) { // 
        let eachMenuItem = data.menuItems[menuItemIndex[indexItem]];
        selectedMenuItems.push(eachMenuItem);
    };

    console.log(selectedMenuItems);

    const baseImageUrlPath = "https://images.spoonacular.com/file/wximages/";

    const smallImageSize = "90x90"; // Preset image size set by spoonacular which will be used interchangeably depending on the device screen size (through the manipulation of css media queries)
    const mediumImageSize = "312x231";
    const largeImageSize = "636x393";

    let setImageSize = largeImageSize;
    let menuItemId; // to be added later. Unique ID of each menu item set by spoonacular
    let menuItemImageType; // to be added later. Could be .png, .jpg, etc

    let completeImageUrl = `${baseImageUrlPath}${menuItemId}-${setImageSize}.${menuItemImageType}`
}

function foodItemSelection(selectedText) { // Loads the API after one of the food items is selected with the food item name being transferred as a paramater of the function 
    let changedBody = document.getElementById("changed-body");

    // Loading of the new HTML code
    changedBody.innerHTML = `
        <h2>Click on one of the images below</h2>

        <ul id="clickable-images">
            <li id="image-left">
                <img src="assets/images/image-one-default.jpg" alt="The default first image (of croissants) inserted onto the page if the API fails to load correctly">
                <p>Image One meal name</p>
            </li>
            <span>OR</span> <!-- This element will be in between the two different items, helping guide the user in what their options are -->
            <li id="image-right">
                <img src="assets/images/image-two-default.jpg" alt="The default second image (of pancakes) inserted onto the page if the API fails to load correctly">
                <p>Image Two meal name</p>
            </li>
        </ul>

        <div id="progress-bar-display">
            <div class="light-gray-background progress-bar-background"> 
                <div class="green-background progress-bar-foreground"></div> <!-- Every time the user clicks on an image the green background will increment its width by 4% -->
            </div>
            <p>You have <span id="progress-bar-remainder">15</span> clicks left to go</p> <!-- The span element will decrement every time the user clicks on an image until it hits zero -->
        </div>

        <div class="user-buttons">
            <button id="finished-button">FINISHED</button>
            <button id="restart-button">RESTART</button>
            <button id="back-button">BACK</button>
        </div>
    `    

    // Loading of the images that will change based on clicks
    let imgLeft = document.getElementById("image-left");
    let imgRight = document.getElementById("image-right");

    let imgOne = document.querySelector("#image-left img");
    let imgTwo = document.querySelector("#image-right img");

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

    // Calling the Spoonacular API
    selectedText = selectedText.toLowerCase(); // The selectedText paramater should be lowercase as it will be used as the search query for the API

    const apiKey = "0bd6828e250e4d07b2474b71ff63b815"; // Unique API key assigned by Spoonacular

    const expectedResults = 100; // Spoonacular only allows a maximum number of 100 expected results to be loaded from a search query

    let xhr = new XMLHttpRequest();

    xhr.open("GET", `https://api.spoonacular.com/food/menuItems/search?apiKey=${apiKey}&query=${selectedText}&number=${expectedResults}`);
    xhr.send();

    xhr.onreadystatechange = function() { // Setting up the XHR state listener
        if (this.readyState == 4 && this.status == 200) {
            setGameData(JSON.parse(this.responseText), expectedResults); // Calling the function that will set the parsed spoonacular data
        }
    };
};

function loadFoodItems() { // Loads the initial items in a random order
    let foodTypeItems = document.getElementsByClassName("food-type-items");

    let foodTypeItemsLength = foodTypeItems.length;

    let newFoodTypeItems = [];
    let newFoodTypeImages = [];

    let i = 0;

    while (i < foodTypeItemsLength) { // A while loop that allows us to add elements onto the newFoodTypeItems array and print them into the console as long as a certain condition is being met
        let mealTypes = ["Burger", "Pizza", "Cake", "Chicken", "Steak", "Kebab", "Sushi", "Burrito", "Seafood", "Salad", "Sandwich", "Tacos", "Pasta", "Ice Cream", "French Fries", "Pancakes", "Noodles", "Soup", "Hot Dog", "Donuts", "Fish",];
        let mealTypesImagesNames = ["hamburger", "pizza", "cake", "chicken-leg", "steak", "kebab", "sushi", "burrito", "shrimp", "salad", "sandwich", "taco", "spaguetti", "ice-cream", "fried-potatoes", "pancake", "noodles", "soup", "hot-dog", "donut", "salmon",];
        let mealTypesImagesTypes = [".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png",];
            // Added names of the images that correspond with each of the meal types and their respective extensions
            // Objects could have been used instead of arrays, but constructing three arrays was more convenient than making eighteen different objects

        let randomNumber = Math.floor(Math.random() * mealTypes.length); // Chooses a random index number between 0 and the length of the mealTypes array minus one which will be assigned as an index number for each of the three above arrays
        let specificMealType = mealTypes[randomNumber];
        let specificMealTypeImage = mealTypesImagesNames[randomNumber] + mealTypesImagesTypes[randomNumber];

        if (newFoodTypeItems.includes(specificMealType)) {
            continue; // If the selected element from the mealTypes array is already in the newFoodTypeItems array, the loop will restart 
        } else {
            newFoodTypeItems.push(specificMealType);
            newFoodTypeImages.push(specificMealTypeImage);
            
            foodTypeItems[i].innerHTML = `
                <img src="assets/images/${newFoodTypeImages[i]}" alt="${newFoodTypeItems[i]} icon" class="${newFoodTypeItems[i]} food-item-image${i}" onclick="foodItemSelection(this.className)">
                <span class="${newFoodTypeItems[i]} food-item-span${i}" onclick="foodItemSelection(this.className)">${newFoodTypeItems[i]}<i class="fa fa-angle-right"></i></span>`; 
                // Each element in the newFoodTypeItems array is added onto the DOM along with its corresponding image
                // Classes are added so as to push it as a parameter onto the foodItemSelection function. The inspiration for this was found here https://www.codegrepper.com/code-examples/objectivec/javascript+get+value+of+clicked+element
            i++;
        };
    };

    for (let j = 0; j < foodTypeItemsLength; j++) { // A for loop whose purpose is to change the css of the span elements (using jQuery) whenever the image icons and the span elements are hovered upon
        $(`.food-item-image${j}`).mouseenter(function() {
            $(`.food-item-span${j}`).addClass("red-hover");
        })
        .mouseleave(function() {
            $(`.food-item-span${j}`).removeClass("red-hover");
        });
    };
}
        
            