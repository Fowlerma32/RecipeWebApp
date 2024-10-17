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
module.exports = { searchRecipes };



//work in progress
const getRecipes = () => {
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
    axios.get(spoonacularUrl, { params }).then(response => {
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
};
