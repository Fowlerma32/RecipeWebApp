const API_KEY = process.env.API_KEY; 



const searchRecipes = async (searchTerm, page) => {
    if(!API_KEY)
    {
        throw new Error("API key not found");
    }
    const spoonacularUrl = new URL("https://api.spoonacular.com/recipes/complexSearch");
    const params = {
        apiKey: API_KEY,
        query: searchTerm,
        number: "2",
        offset: (page * 2).toString()
    }
    spoonacularUrl.search = new URLSearchParams(params).toString()

    try {
        const searchResponse = await fetch(spoonacularUrl);
        const resultsJson = await searchResponse.json();
        return resultsJson;
    }
    catch (error){
        console.log(error);
    }
};

//work in progress
const getRecipes = async (ingredients,ignorePantry,ranking) => {
    if(!API_KEY)
    {
        throw new Error("API key not found");
    }

    // Define the API endpoint
    const spoonacularUrl = new URL("https://api.spoonacular.com/recipes/findByIngredients");

    // Set up query parameters
    const params = {
        ingredients: ingredients, 
        number: 2, 
        ranking: ranking,
        ignorePantry: ignorePantry,
        apiKey: API_KEY
    };

    spoonacularUrl.search = new URLSearchParams(params).toString()

    try {
        const searchResponse = await fetch(spoonacularUrl);
        const resultsJson = await searchResponse.json();
        return resultsJson;
    }
    catch (error){
        console.log(error);
    }
};
module.exports = { searchRecipes, getRecipes };