// Picture Game section

function foodItemSelection(selectedText) { // Loads the API after one of the food items is selected
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
            <p>You have <span id="progress-bar-remainder">25</span> clicks left to go</p> <!-- The span element will decrement every time the user clicks on an image until it hits zero -->
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

    let xhr = new XMLHttpRequest();

    xhr.open("GET", `https://api.spoonacular.com/food/menuItems/search?apiKey=${apiKey}&query=${selectedText}`);
    xhr.send();

    xhr.onreadystatechange = function() { // Setting up the XHR state listener
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
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
        let mealTypes = ["Burger", "Pizza", "Cake", "Chicken", "Steak", "Kebab", "Sushi", "Burrito", "Sea Food", "Salad", "Sandwich", "Tacos", "Pasta", "Ice Cream", "French Fries", "Pancakes", "Eggs", "Soup",];
        let mealTypesImagesNames = ["hamburger", "pizza", "cake", "chicken-leg", "steak", "kebab", "sushi", "burrito", "shrimp", "salad", "sandwich", "taco", "spaguetti", "ice-cream", "fried-potatoes", "pancake", "fried-egg", "soup",];
        let mealTypesImagesTypes = [".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png", ".png",];
            // Added names of the images that correspond with each of the meal types and their respective extensions
            // Objects could have been used instead of arrays, but constructing three arrays was more convenient than making eighteen different objects

        let randomNumber = Math.floor(Math.random() * mealTypes.length); // Chooses a random index number between 0 and 17 (length of the mealTypes array minus one) which will be assigned as an index number for each of the three above arrays
        let specificMealType = mealTypes[randomNumber];
        let specificMealTypeImage = mealTypesImagesNames[randomNumber] + mealTypesImagesTypes[randomNumber];

        if (newFoodTypeItems.includes(specificMealType)) {
            continue; // If the selected element from the mealTypes array is already in the newFoodTypeItems array, the loop will restart 
        } else {
            newFoodTypeItems.push(specificMealType);
            newFoodTypeImages.push(specificMealTypeImage);
            
            foodTypeItems[i].innerHTML = `
                <img src="assets/images/${newFoodTypeImages[i]}" alt="${newFoodTypeItems[i]} icon" class="${newFoodTypeItems[i]}" onclick="foodItemSelection(this.className)">
                <span class="${newFoodTypeItems[i]}" onclick="foodItemSelection(this.className)">${newFoodTypeItems[i]}<i class="fa fa-angle-right"></i></span>`; 
                // Each element in the newFoodTypeItems array is added onto the DOM along with its corresponding image
                // Classes are added so as to push it as a parameter onto the foodItemSelection function. The inspiration for this was found here https://www.codegrepper.com/code-examples/objectivec/javascript+get+value+of+clicked+element
            i++;
        };
    };
}
