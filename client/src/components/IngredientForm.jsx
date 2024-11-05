//File for setting up the ingredient form
import React from 'react';

const IngredientForm = ({
  searchTerm,
  setSearchTerm,
  cuisine,
  setCuisine,
  includeIngredients,
  setIncludeIngredients,
  ignorePantry,
  setIgnorePantry,
  sort,
  setSort,
  handleFormSubmit,
}) => (
  <form id="recipeForm" onSubmit={handleFormSubmit} className="create-form">
    <label htmlFor="searchTerm">Search Term:</label>
    <input 
      type="text" 
      id="searchTerm" 
      name="searchTerm" 
      placeholder="burgers"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <label htmlFor="includeIngredients">Enter ingredients (comma-separated):</label>
    <input 
      type="text" 
      id="includeIngredients" 
      name="includeIngredients" 
      placeholder="apples,flour,sugar"
      value={includeIngredients}
      onChange={(e) => setIncludeIngredients(e.target.value)}
    />

    <label htmlFor="cuisine">Cuisine:</label>
    <select 
      id="cuisine" 
      name="cuisine"
      value={cuisine}
      onChange={(e) => setCuisine(e.target.value)}
    >
      <option value="">Select a Cuisine</option>
      <option value="African">African</option>
      <option value="Asian">Asian</option>
      <option value="American">American</option>
      <option value="Indian">Indian</option>
      <option value="Italian">Italian</option>
      <option value="Mediterranean">Mediterranean</option>
      <option value="Mexican">Mexican</option>
      <option value="Nordic">Nordic</option>
      <option value="Thai">Thai</option>
    </select>

    <div>
      <input 
        type="checkbox" 
        id="ignorePantry" 
        name="ignorePantry"
        checked={ignorePantry}
        onChange={(e) => setIgnorePantry(e.target.checked)}
      />
      <label htmlFor="ignorePantry">Ignore pantry ingredients?</label>
    </div>

    <label htmlFor="sort">sort:</label>
    <select 
      id="sort" 
      name="sort"
      value={sort}
      onChange={(e) => setSort(e.target.value)}
    >
      <option value={"max-used-ingredients"}>Maximize Used Ingredients</option>
      <option value={"min-missing-ingredients"}>Minimize Missing Ingredients</option>
    </select>

    <button type="submit">Submit Form</button>
  </form>
);

export default IngredientForm;