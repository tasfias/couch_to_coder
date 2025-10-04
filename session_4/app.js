// 1. Make a request that loads in the recipes from our own backend
// 2. Capture the response value
// 3. Turn it into JavaScript
// 4. Loop through each recipe
// 5. Create the html components for these recipes
// 6. Populate the text part using innerText

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:3000/recipes");
    const recipes = await response.json();
    for (recipe of recipes) {
        //Create the container that will hold the recipe
        const recipeContainer = document.createElement("div");

        // 3 steps
        // 1. Create the element
        // 2. Give the element content
        // 3. Append it to the parent element

        //Create the name tag (h3), add text to it, glue it onto the container
        const nameTag = document.createElement("h3");
        nameTag.innerText = recipe.name;
        recipeContainer.appendChild(nameTag);

        //Same with cuisine and time tags
        const cuisineTag = document.createElement("p");
        cuisineTag.innerText = recipe.cuisine;
        recipeContainer.appendChild(cuisineTag);

        const timeTag = document.createElement("p");
        timeTag.innerText = recipe.time;
        recipeContainer.appendChild(timeTag);

        //Create the unordered list element for the ingredients
        const ingredientsListTag = document.createElement("ul");

        //Create the list items for the ingredients list
        for (ingredient of recipe.ingredients) {
            const ingredientsListItemTag = document.createElement("li");
            ingredientsListItemTag.innerText = ingredient;
            ingredientsListTag.appendChild(ingredientsListItemTag);
        }


        recipeContainer.appendChild(ingredientsListTag);

        recipeContainer.appendChild(document.createElement("br"));

        //Create the ordered list element for the steps of the recipe
        const stepsListTag = document.createElement("ol");

        //Create the list items for the steps list
        for (step of recipe.steps) {
            const stepsListItemTag = document.createElement("li");
            stepsListItemTag.innerText = step;
            stepsListTag.appendChild(stepsListItemTag);
        }


        recipeContainer.appendChild(stepsListTag);

        const recipeList = document.querySelector("#recipe-list");
        recipeList.appendChild(recipeContainer);
    }

    const recipeForm = document.querySelector("form");
    recipeForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newRecipe = {};

        newRecipe.name = event.target.name.value;
        newRecipe.cuisine = event.target.cuisine.value;
        newRecipe.time = event.target.time.value;
        const ingredientsText = event.target.ingredients.value;
        newRecipe.ingredients = ingredientsText.split(/\r?\n/);
        const stepsText = event.target.steps.value;
        newRecipe.steps = stepsText.split(/\r?\n/);

        fetch('http://localhost:3000/recipes', {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(newRecipe) // Convert the JSON object to a string
        })

    })

    const cuisineReponse = await fetch("http://localhost:3000/cuisine-data");
    const cuisineData = await cuisineReponse.json();


    const xValues = Object.keys(cuisineData);
    const yValues = Object.values(cuisineData);


    new Chart("myChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "Cuisine Popularity"
            }
        }
    })


})


