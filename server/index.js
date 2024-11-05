//Main file for running the server

//get necessary packages/tools
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const axios = require("axios");
const { searchRecipes, getRecipes} = require("./recipe-API");

const app = express();

app.use(cors());
app.use(express.json());

//searches for recipes
app.get("/api/recipes/search", async(req, res) => {

  const searchTerm = req.query.searchTerm;
  const page = parseInt(req.query.page);
  const results = await searchRecipes(searchTerm, page);

  return res.json(results);
});

//searches for recipes by ingredients
app.get("/api/recipes/search/ingredients", async(req, res) => {

  const searchTerm = req.query.searchTerm;
  const page = parseInt(req.query.page);
  const cuisine = req.query.cuisine;
  const includeIngredients = req.query.includeIngredients;
  const ignorePantry = req.query.ignorePantry;
  const sort = req.query.sort;
  const results = await getRecipes(searchTerm, page, includeIngredients, ignorePantry, sort, cuisine);

  return res.json(results);
});

//inserts forms into database
app.post('/recipes/forms', async (req, res) => {
  try {
    const { searchTerm, cuisine, includeIngredients, ignorePantry, sort } = req.body;
      
    try {
      const queryText = `INSERT INTO IngredientForm (User_ID, Query, Cuisine, Ingredient_List, Ignore_Pantry, sort) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      const values = [1, searchTerm, cuisine, includeIngredients, ignorePantry, sort];
            
      const res = await pool.query(queryText, values);
      console.log('Form inserted:', res.rows[0]);
    } catch (err) {
      console.error('Error inserting form', err.message);
  }
  
    res.status(201).json({ message: 'Data received successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

//get all forms
app.get("/recipes/forms", async (req, res) => { 

  try {
    const allForms = await pool.query("SELECT * FROM IngredientForm");
    res.json(allForms.rows);
  } catch (error) {
    console.log(error);
  }
});

//delete a form
app.delete("/recipe/forms/:id", async (req, res)=>{
  try {
    const{ id } = req.params;
    const deleteForm = await pool.query("DELETE FROM IngredientForm WHERE Form_ID = $1", [id]);
    res.json("Form was deleted!");
  } catch (error) {
    console.log(error);      
  }
});

//update a form
app.put("/recipe/forms/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const { searchTerm, cuisine, includeIngredients, ignorePantry, sort } = req.body;
    const updateForm = await pool.query("UPDATE IngredientForm SET Query = $1, Cuisine = $2, Ingredient_List = $3, Ignore_Pantry = $4, sort = $5 WHERE Form_ID = $6", 
      [searchTerm, cuisine, includeIngredients, ignorePantry, sort, id]
    );

    res.json("Form was updated!");    
  } catch (error) {
    console.log(error);
  }
});

//starts server
app.listen(5000, () => {
    console.log("Server has started on port 5000");
});
