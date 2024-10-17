const express = require("express");
const cors = require("cors");
const pool = require("./db");
const axios = require("axios");
const { searchRecipes } = require("./recipe-API");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/api/recipes/search", async(req, res) => {

    const searchTerm = req.query.searchTerm;
    const page = parseInt(req.query.page);
    const results = await searchRecipes(searchTerm, page);

    return res.json(results);
});



app.listen(5000, () => {
    console.log("Server has started on port 5000");
});
