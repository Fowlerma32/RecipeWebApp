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


export const searchRecipesBy = async (ingredients, ignorePantry, ranking) => {
    const baseUrl = new URL("http://localhost:5000/api/recipes/search/ingredients");

    baseUrl.searchParams.append("ingredients", ingredients);
    baseUrl.searchParams.append("ignorePantry", ignorePantry);
    baseUrl.searchParams.append("ranking", ranking);

    const response = await fetch(baseUrl)
    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
};
export default {searchRecipes, searchRecipesBy};