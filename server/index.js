//Main file for running the server

//get necessary packages/tools
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const axios = require("axios");
const { searchRecipes } = require("./recipe-API");

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

//inserts forms into database
app.post('/recipes/forms', async (req, res) => {
    try {
      const { ingredients, ignorePantry, ranking } = req.body;
      
      try {
        const queryText = `INSERT INTO IngredientForm (User_ID, Ingredient_List, Ignore_Pantry, Ranking) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [1,ingredients, ignorePantry,ranking];
            
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
  })

//starts server
app.listen(5000, () => {
    console.log("Server has started on port 5000");
});
