//File for setting up API endpoints and getting reacipes from API

const API_KEY = process.env.API_KEY; //gets the API key from the .env file


//Gets recipes by only using search term
const searchRecipes = async (searchTerm, page) => {
    if(!API_KEY)
    {
        throw new Error("API key not found");
    }
    // Define the API endpoint
    const spoonacularUrl = new URL("https://api.spoonacular.com/recipes/complexSearch");
    // Set up query parameters
    const params = {
        apiKey: API_KEY,
        query: searchTerm,
        number: "10",
        offset: (page * 10).toString()
    }
    spoonacularUrl.search = new URLSearchParams(params).toString()

    //get the results
    try {
        const searchResponse = await fetch(spoonacularUrl);
        const resultsJson = await searchResponse.json();
        return resultsJson;
    }
    catch (error){
        console.log(error);
    }
};

//Gets recipes by using ingredients and other parameters
const getRecipes = async (searchTerm, page, includeIngredients,ignorePantry,sort,cuisine) => {
    if(!API_KEY)
    {
        throw new Error("API key not found");
    }

    // Define the API endpoint
    const spoonacularUrl = new URL("https://api.spoonacular.com/recipes/complexSearch");

    // Set up query parameters
    const params = {
        query: searchTerm,
        cuisine: cuisine,
        includeIngredients: includeIngredients, 
        number: "5", 
        sort: sort,
        ignorePantry: ignorePantry,
        offset: (page * 5).toString(),
        apiKey: API_KEY
    };

    spoonacularUrl.search = new URLSearchParams(params).toString()
    //get the results
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