// Picture Game section

function setGameData(spoonacularData, numberOfResults, numberOfNeededImages, allMenuItems) { // Sets the data received from the spoonacular API onto the picture game (along with the expected number of results generated and number of needed images)
    let data = spoonacularData;
    console.log(data);

    let menuItemIndex = []; // An empty array where the index number of each random meal item selected will be stored 

    let selectedNumberOfImages = 0; 
    
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
    let menuItemsImagesURLs = []; // An empty array that will store the URLs of all of the selected menus' images

    const baseImageUrlPath = "https://images.spoonacular.com/file/wximages/";

    let setImageSize; // Preset image sizes set by spoonacular which will be used interchangeably depending on the device screen size (through the manipulation of css media queries)
    const smallImageSize = "90x90"; 
    const mediumImageSize = "312x231";
    const largeImageSize = "636x393";

    setImageSize = largeImageSize;

    let menuItemId; // Unique ID of each menu item set by spoonacular
    let menuItemImageType; // Could be .png, .jpg, etc.

    for (let indexItem = 0; indexItem < menuItemIndex.length; indexItem++) { // A for loop that will iterate over the menuItemIndex array and assign each element as an index number of the spoonacular menuItems array 
        let eachMenuItem = data.menuItems[menuItemIndex[indexItem]];
        selectedMenuItems.push(eachMenuItem); // Assigning each randomly-selected menu item onto the selectedMenuItems array

        // Assigning all of the IDs and image types of the selected menu items onto their respective variables to create a comple URL path for each of the images
        menuItemId = eachMenuItem.id;
        menuItemImageType = eachMenuItem.imageType;
        let completeImageURL = `${baseImageUrlPath}${menuItemId}-${setImageSize}.${menuItemImageType}`;
        menuItemsImagesURLs.push(completeImageURL); // Adding each of the URLs onto the menuItemsImagesURLs array 
    };

    console.log(selectedMenuItems);
    console.log(menuItemsImagesURLs);

    let leftImage = document.getElementById("image-left");
    let rightImage = document.getElementById("image-right");

    let displayedImages = []; // An array that will store the images already displayed

    leftImage.innerHTML = `
        <img src="${menuItemsImagesURLs[0]}" alt="${selectedMenuItems[0].title}">
        <p>${selectedMenuItems[0].title} <br>from ${selectedMenuItems[0].restaurantChain}</p>
    `;

    rightImage.innerHTML = `
        <img src="${menuItemsImagesURLs[1]}" alt="${selectedMenuItems[1].title}">
        <p>${selectedMenuItems[1].title} <br>from ${selectedMenuItems[1].restaurantChain}</p>
    `;

    displayedImages.push(menuItemsImagesURLs[0]);
    displayedImages.push(menuItemsImagesURLs[1]);

    let firstImage = document.querySelector("#image-left img"); 
    let secondImage = document.querySelector("#image-right img");

    let numberOfSelectedURLs = 0;
    while (numberOfSelectedURLs < 15) {
        if (displayedImages.includes(menuItemsImagesURLs[numberOfSelectedURLs])) {
            continue;
        } else {
            let firstImageClicked = false;

            firstImage.onclick = function() {
                firstImageClicked = true;

                rightImage.innerHTML = `
                    <img src="assets/images/loading.gif" alt="Loading image">
                    <p>Please wait. Your image is being loaded.</p>`; // This gif will appear while the webpage loads an image from the API

                rightImage.innerHTML = `
                    <img src="${menuItemsImagesURLs[numberOfSelectedURLs]}" alt="${selectedMenuItems[numberOfSelectedURLs].title}">
                    <p>${selectedMenuItems[numberOfSelectedURLs].title} from ${selectedMenuItems[numberOfSelectedURLs].restaurantChain}</p>`;
                    displayedImages.push(menuItemsImagesURLs[numberOfSelectedURLs]);

                numberOfSelectedURLs++;
            };

            if (firstImageClicked == true) {
                continue;
            } else {
                secondImage.onclick = function() {
                    leftImage.innerHTML = `
                        <img src="assets/images/loading.gif" alt="Loading image">
                        <p>Please wait. Your image is being loaded.</p>`; // This gif will appear while the webpage loads an image from the API

                    leftImage.innerHTML = `
                        <img src="${menuItemsImagesURLs[numberOfSelectedURLs]}" alt="${selectedMenuItems[numberOfSelectedURLs].title}">
                        <p>${selectedMenuItems[numberOfSelectedURLs].title} from ${selectedMenuItems[numberOfSelectedURLs].restaurantChain}</p>`;
                        displayedImages.push(menuItemsImagesURLs[numberOfSelectedURLs]);

                    numberOfSelectedURLs++;
                };
            };
        };
    };

    // Tells the user how many menu items were loaded through their search query
    amountOfItemsLoaded = document.getElementById("amount-of-items-loaded");
    amountOfItemsLoaded.innerHTML = `<p>Your search query generated <span>${allMenuItems}</span> different menu items.</p>`;
}

function foodItemSelection(selectedText) { // Loads the API after one of the food items is selected with the food item name being transferred as a paramater of the function 
    let changedBody = document.getElementById("changed-body");
    
    let expectedImages = 15; // Since there are 15 "clicks" needed until the user's selection will be affirmed, we will need 15 different images (and other information on the menu item)

    // Loading of the new HTML code
    changedBody.innerHTML = `
        <h2>Click on one of the images below</h2>

        <ul id="clickable-images">
            <li id="image-left">
                <img>
                <p></p>
            </li>
            <span>OR</span> <!-- This element will be in between the two different items, helping guide the user in what their options are -->
            <li id="image-right">
                <img>
                <p></p>
            </li>
        </ul>

        <div id="progress-bar-display">
            <div class="light-gray-background progress-bar-background"> 
                <div class="green-background progress-bar-foreground"></div> <!-- Every time the user clicks on an image the green background will increment its width by 4% -->
            </div>
            <p>You have <span id="progress-bar-remainder">${expectedImages}</span> clicks left to go</p> <!-- The span element will decrement every time the user clicks on an image until it hits zero -->
        </div>

        <div class="user-buttons">
            <button id="finished-button">FINISHED</button>
            <button id="restart-button">RESTART</button>
            <button id="back-button">BACK</button>
        </div>

        <div id="amount-of-items-loaded">
            <p>Your search query generated <span>0</span> different menu items.</p>
        </div>
    `    

    // Calling the Spoonacular API
    selectedText = selectedText.toLowerCase(); // The selectedText paramater should be lowercase as it will be used as the search query for the API

    const apiKey = "0bd6828e250e4d07b2474b71ff63b815"; // Unique API key assigned by Spoonacular

    const expectedResults = 100; // Spoonacular only allows a maximum number of 100 results to be loaded from a search query, which unfortunately harms the UX as a larger number would give greater variety of results

    let initialXHR = new XMLHttpRequest(); // Setting up the initial API request (will be used to load one of the search parameters given by the API, which will then be used to initialize the request with a random number for a different parameter)

    initialXHR.open("GET", `https://api.spoonacular.com/food/menuItems/search?apiKey=${apiKey}&query=${selectedText}&number=${expectedResults}`);
    initialXHR.send();

    initialXHR.onreadystatechange = function() { // Setting up the XHR state listener
        if (this.readyState == 4 && this.status == 200) {
            let numberOfMenuItemsAvailable = JSON.parse(this.responseText).totalMenuItems; // Assigns the number of menu items loaded from our search query onto a variable that will be used as an arguement for the setGameData function
            let pagingNumber = Math.ceil(numberOfMenuItemsAvailable / expectedResults); // Divides the number of loaded menu items by 100, which gives the total number of pages where all of the data is sorted
                // pagingNumber is rounded up to the next largest integer as the number of pages always increments by one if there are remaining data results available
            let randomOffset = Math.floor(Math.random() * pagingNumber);

            let mainXHR = new XMLHttpRequest(); // Had to use the initial request to generate a random offset number, which generates greater variety for the user everytime a search is made
            mainXHR.open("GET", `https://api.spoonacular.com/food/menuItems/search?apiKey=${apiKey}&query=${selectedText}&number=${expectedResults}&offset=${randomOffset}`);
            mainXHR.send();
            mainXHR.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    setGameData(JSON.parse(this.responseText), expectedResults, expectedImages, numberOfMenuItemsAvailable); // Calling the function that will set the parsed spoonacular data
                } else { // Loading of the images that will change based on clicks (will only load if the API does not load)
                    let imgLeft = document.getElementById("image-left");
                    let imgRight = document.getElementById("image-right");

                    imgLeft.innerHTML = `
                    <img src="assets/images/image-one-default.jpg" alt="The default first image (of croissants) inserted onto the page if the API fails to load correctly">
                    <p>Image One meal name</p>`

                    imgRight.innerHTML = `
                    <img src="assets/images/image-two-default.jpg" alt="The default second image (of pancakes) inserted onto the page if the API fails to load correctly">
                    <p>Image Two meal name</p>`
                };
            };
        };
    };
};

function loadFoodItems() { // Loads the initial items in a random order
    let foodTypeItems = document.getElementsByClassName("food-type-items");

    let foodTypeItemsLength = foodTypeItems.length;

    let newFoodTypeItems = [];
    let newFoodTypeImages = [];

    let i = 0;

    while (i < foodTypeItemsLength) { // A while loop that allows us to add elements onto the newFoodTypeItems array and print them into the console as long as a certain condition is being met
        let mealTypes = ["Burger", "Pizza", "Cake", "Chicken", "Steak", "Kebab", "Burrito", "Seafood", "Salad", "Sandwich", "Tacos", "Pasta", "Ice Cream", "French Fries", "Pancakes", "Noodles", "Soup", "Hot Dog", "Donuts", "Fish",];
        let mealTypesImagesNames = ["hamburger", "pizza", "cake", "chicken-leg", "steak", "kebab", "burrito", "shrimp", "salad", "sandwich", "taco", "spaguetti", "ice-cream", "fried-potatoes", "pancake", "noodles", "soup", "hot-dog", "donut", "salmon",];
        let mealTypesImagesTypes = [".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png",];
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
        
            