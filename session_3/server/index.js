const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const recipesFilePath = path.join(__dirname, "recipes.json");

app.get("/", (req, res) => {
    res.send("Hello Couch to Coder peeps, home page here!")
});

app.get("/recipes", (req, res) => {
    // read in the json file to get the recipes
    fs.readFile(recipesFilePath, "utf-8", (err, data) => {
        // we read in the file through the filepath, encoding is added as a security measure
        // the err variable holds errors if there are any
        // the data variable holds the data read in from the file
        // we need to parse the json data to be turned into plain javascript
        const recipes = JSON.parse(data);
        // we send the recipes like before
        res.json(recipes)
    })
});

app.get("/cuisine-data", (req, res) => {
   fs.readFile(recipesFilePath, "utf-8", (err, data) => {
       const recipes = JSON.parse(data);
       const occurances = recipes.reduce((accumulator, recipe) => {
           const currentCuisine = recipe.cuisine;
           if(accumulator[currentCuisine]){
               accumulator[currentCuisine] += 1;
           } else {
               accumulator[currentCuisine] = 1;
           }
           return accumulator;
       }, {})
       console.log(occurances)
       res.json(occurances);
   })
})


app.post("/recipes", (req, res) => {
    const newRecipe = req.body;
    fs.readFile(recipesFilePath, 'utf8', (err, data) => {
        const recipes = JSON.parse(data); // Parse the existing JSON array
        recipes.push(newRecipe); // Add the new object to the array
        
        // Write the updated array back to the file
        fs.writeFile(recipesFilePath, JSON.stringify(recipes), () => { });
    });
    res.send("Recipe added, storing your favourite dishes")
});

app.listen(port, () => {
    console.log("Server is running on http:localhost:", port)
});