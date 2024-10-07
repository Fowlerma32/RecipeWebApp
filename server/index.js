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
const spoonacularUrl = `https://api.spoonacular.com/recipes/complexSearch`;

// Set up query parameters
const params = {
    query: 'pasta', 
    number: 1, 
    apiKey: API_KEY
};

// Make the request
axios.get(spoonacularUrl, { params })
    .then(response => {
        console.log('Recipes:', response.data.results); // Handle the data
    })
    .catch(error => {
        console.error('Error fetching recipes:', error.message);
    });

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});
