//File for getting api results from backend

//basic search function
export const searchRecipes = async (searchTerm, page) => {
    const baseUrl = new URL("http://localhost:5000/api/recipes/search");
    baseUrl.searchParams.append("searchTerm",searchTerm);
    baseUrl.searchParams.append("page", page);

    const response = await fetch(baseUrl)
    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
};

//complex search function
export const searchRecipesBy = async (searchTerm, page, cuisine, includeIngredients, ignorePantry, sort) => {
    const baseUrl = new URL("http://localhost:5000/api/recipes/search/ingredients");

    baseUrl.searchParams.append("searchTerm", searchTerm);
    baseUrl.searchParams.append("cuisine", cuisine);
    baseUrl.searchParams.append("includeIngredients", includeIngredients);
    baseUrl.searchParams.append("ignorePantry", ignorePantry);
    baseUrl.searchParams.append("sort", sort);
    baseUrl.searchParams.append("page", page);

    const response = await fetch(baseUrl)
    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
};
export default {searchRecipes, searchRecipesBy};