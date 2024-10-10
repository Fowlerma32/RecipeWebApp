const express = require("express");
const cors = require("cors");
const pool = require("./db");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/api/recipes/search", async(req, res) => {
    res.json({message: 'sucess'});
});


const API_KEY = process.env.API_KEY; 

// Define the API endpoint
const spoonacularUrl = `https://api.spoonacular.com/recipes/findByIngredients`;

// Set up query parameters
const params = {
    ingredients: 'apples,flour,sugar', 
    number: 1, 
    ranking: 2,
    ignorePantry: false,
    apiKey: API_KEY
};

// Make the request
axios.get(spoonacularUrl, { params })
    .then(response => {
        const recipes = response.data;
        recipes.forEach(async (recipe) => {
            const recipeUrl = `https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`;

            try {
                const queryText = `INSERT INTO recipes (Recipe_ID, User_ID, API_ID, Recipe_Name, Recipe_URL) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
                const values = [1,1,recipe.id, recipe.title, recipeUrl];
                
                const res = await pool.query(queryText, values);
                console.log('Recipe inserted:', res.rows[0]);
            } catch (err) {
                console.error('Error inserting recipe:', err.message);
            }


        });
    })
    .catch(error => {
        console.error('Error fetching recipes:', error.message);
    });




app.listen(5000, () => {
    console.log("Server has started on port 5000");
});
