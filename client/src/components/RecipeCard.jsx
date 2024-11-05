//Gets the images of recipes, and makes them clickable
const RecipeCard = ({recipe}) => {
    const recipeUrl = `https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`;
    return(
        <div className="recipe-card">
            <a href={recipeUrl} target="_blank">
                <img src={recipe.image}></img>
            </a>
            <div className="recipe-card-title">
                <h3>{recipe.title}</h3>
            </div>

        </div>
    )

}

export default RecipeCard;