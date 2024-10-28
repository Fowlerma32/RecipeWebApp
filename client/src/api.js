const searchRecipes = async (searchTerm, page) => {
    const baseUrl = new URL("http://localhost:5000/api/recipes/search");
    baseUrl.searchParams.append("searchTerm",searchTerm);
    baseUrl.searchParams.append("page", page);

    const response = await fetch(baseUrl)
    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
};

export default searchRecipes;