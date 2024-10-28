import React from 'react';

const IngredientForm = ({
  ingredients,
  setIngredients,
  ignorePantry,
  setIgnorePantry,
  ranking,
  setRanking,
  handleFormSubmit,
}) => (
  <form id="recipeForm" onSubmit={handleFormSubmit}>
    <label htmlFor="ingredients">Enter ingredients (comma-separated):</label>
    <input 
      type="text" 
      id="ingredients" 
      name="ingredients" 
      required
      placeholder="apples,flour,sugar"
      value={ingredients}
      onChange={(e) => setIngredients(e.target.value)}
    />

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

    <label htmlFor="ranking">Ranking:</label>
    <select 
      id="ranking" 
      name="ranking"
      value={ranking}
      onChange={(e) => setRanking(e.target.value)}
    >
      <option value={1}>Maximize Used Ingredients</option>
      <option value={2}>Minimize Missing Ingredients</option>
    </select>

    <button type="submit">Submit Form</button>
  </form>
);

export default IngredientForm;