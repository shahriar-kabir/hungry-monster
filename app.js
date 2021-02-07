
// search button function
const searchButton = () =>{
  userInput(); //function connect from userInput function
  document.getElementById('allMealItems').innerHTML = '';
}

//get input data
const userInput = () => {
  let searchInput = document.getElementById('searchInput');
  mealsInfoConnect(searchInput.value); //function connect from mealsInfoConnect function
  searchInput.value = '';
}

//api call for food name
let mealsInfoConnect = (userInput) => {
    // Validation
  if (userInput !== '') {
      let inputUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`
      fetch(inputUrl)
          .then(res => res.json())
          .then(data => {
              mealInfo(data.meals) //get meal data from mealInfo function
              document.getElementById('errorShow').innerHTML = ''
              document.getElementById('allIngredient').innerHTML = ''
          })
              .catch(() => errorMessage());
        } 
  else {
      errorMessage() //function call from errorMessage function
  }
}
//error Message function
    const errorMessage = () => {
      let errorDisplay = document.getElementById('errorShow');
      let message = `
      <h2 class="text-center text-danger mt-3">Foods are not available</h2>
      <p class="text-center text-muted">Try your desire food keyword</p>
      `
      errorDisplay.innerHTML = message;
      document.getElementById('allIngredient').innerHTML = '';
    }

// get meal data using map function
const mealInfo = (data) => {
  data.map(meal => showAllMeal(meal.strMeal, meal.strMealThumb))
  displaySingeItem(); //function call from displaySingleItem function
}

// display all meal items
const showAllMeal = (itemName, imgSrc) => {
  let allMealItems = document.getElementById('allMealItems');
  let mealItems = `
      <div class = "col-md-4 items">
          <img src="${imgSrc}" class ="img-fluid custom-image">
          <h5>${itemName}</h5>
       </div>      
  `
  allMealItems.innerHTML = allMealItems.innerHTML + mealItems;
}

// Click each Item of Meal using map function
const displaySingeItem = () => {
  let allItems = document.getElementsByClassName('items'); //get single data from showAllMeal using class name
  let allItemDiv = [...allItems];
  allItemDiv.map(item => {
      item.addEventListener('click', (event) => {
          let foodName = event.currentTarget.children[1].innerText;
          singleItem(foodName); //function call from singleItem function
      })
  })
}

// api call for ingredientList
const singleItem = (singleMealItem) => {
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${singleMealItem}`
  fetch(url)
      .then(response => response.json())
      .then(data => {
          data.meals.forEach(mealsData => {
              if (mealsData.strMeal == singleMealItem) {
                allIngredient(mealsData)
              }
          });
      })
}

//show single item with ingredients
const allIngredient= (meal) => {
  let displayResult = document.getElementById('allIngredient')
  let ingredientList = '';
  for (let i = 1; i < 25; i++) {
      if (meal[`strIngredient${i}`].trim() !== '' || meal[`strMeasure${i}`].trim() !== '') {
          let ingredientText = `${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`;
          ingredientList += (`<li>♂ ${ingredientText}</li>`);
         
      } else {
          break;
      }
  }
  // show single meal item
   const displaySingleArea = `
      <div class="itemOrganize">
          <img src="${meal.strMealThumb}" alt = "food item">
          <div>
              <h3>Item Name: ${meal.strMeal}</h3>
              <h5>Ingredients:</h5>
          </div>
          <ul>${ingredientList}</ul>
      </div>
    `
    displayResult.innerHTML = displaySingleArea;
}



