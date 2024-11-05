//Main file for frontend

import './App.css';
import {useState, useRef, useEffect} from 'react';
import {searchRecipes, searchRecipesBy} from "./api";
import RecipeCard from "./components/RecipeCard";
import Search from './components/Search';
import IngredientForm from './components/IngredientForm';
import ShowForms from './components/ShowForms';


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedTab, setSelectedTab] = useState("search");
  const [includeIngredients, setIncludeIngredients] = useState("");
  const [ignorePantry, setIgnorePantry] = useState(false);
  const [sort, setSort] = useState("max-used-ingredients"); 
  const [cuisine, setCuisine] = useState("");
  const [forms, setForms] = useState([]);
  const pageNumber = useRef(1);
  const [searchType, setSearchType] = useState("simple");

  
  //handle the basic searching
  const handleSearch = async(event) => {
    event.preventDefault(); //prevents default refreshing
    try{
      const recipes = await searchRecipes(searchTerm, 1)
      setRecipes(recipes.results);    
      pageNumber.current = 1;  
      setSearchType("simple");
    }
    catch(e){
      console.log(e);
    }
  }

  //handle the searching with ingredient form
  const handleIngredientSearch = async(form) => {
    try {
      const recipesData = await searchRecipesBy(form.query, 1, form.cuisine, form.ingredient_list, form.ignore_pantry, form.sort);
      console.log("Recipes Data:", recipesData);
      setRecipes(Array.isArray(recipesData.results) ? recipesData.results : []); //check that recipe data is an array
      pageNumber.current = 1; 

      setSearchType("complex");
      setIncludeIngredients(form.ingredient_list);
      setCuisine(form.cuisine);
      setIgnorePantry(form.ignore_pantry);
      setSort(form.sort);

      setSelectedTab("search");
    }
    catch(e) {
      console.log(e);
      setRecipes([]);  //set empty array on error
    }
  };

  //handles the view more button
  const handleViewMoreClick = async() => {
    const nextPage = pageNumber.current + 1;
    try{
      const nextRecipes = searchType === "simple"
      ? await searchRecipes(searchTerm, nextPage)
      : await searchRecipesBy(searchTerm, nextPage, cuisine, includeIngredients, ignorePantry, sort);
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    }
    catch (error){
      console.log(error);
    }
  }

  //handles the form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); //prevents the page from refreshing on submit
  
    try {
      const formData = {
        searchTerm,
        cuisine,
        includeIngredients,
        ignorePantry,
        sort,
      };
  
      const response = await fetch('http://localhost:5000/recipes/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send form data');
      }
  
      const data = await response.json();
      console.log('Form data successfully sent:', data);

      // Reset form fields
      setSearchTerm("");
      setCuisine("");
      setIncludeIngredients("");
      setIgnorePantry(false);
      setSort("max-used-ingredients");

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  //gets all forms
  const fetchForms = async () => {
    try {
      const response = await fetch("http://localhost:5000/recipes/forms");
      if (!response.ok) {
        throw new Error('Failed to fetch forms');
      }
      const data = await response.json();
      setForms(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  useEffect(() => {
    if (selectedTab === "showForms") {
      fetchForms();
    }
  }, [selectedTab]);

  //sets up webpage layout and tabs
  return(
   <div className="app-container">
    <div className="header">
      <img src="/FoodPicture.jpg"></img>
      <div className="title">My Recipe App</div>
    </div> 
    <div className="tabs">
      <h1 
        className={selectedTab === "search"? "tab-active" : ""}
        onClick={()=> setSelectedTab("search")}>Search Recipes</h1>
      <h1 
        className={selectedTab === "addForm"? "tab-active" : ""}
        onClick={()=> setSelectedTab("addForm")}>Ingredient Form</h1>
      <h1 
        className={selectedTab === "showForms"? "tab-active" : ""}
        onClick={()=> setSelectedTab("showForms")}>Show Forms</h1>
    </div>
    {selectedTab === "search" && (<>
      <Search 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            handleSearch={handleSearch} 
      />
      <div className="recipe-grid">
      {recipes.map((recipe)=> (
        <RecipeCard recipe={recipe}/>
      ))}
      </div>

      <button
        className = "view-more-button"
        onClick = {handleViewMoreClick}> 
        View More
      </button>    
    </>)}
    {selectedTab === "addForm" && (
        <IngredientForm
        searchTerm = {searchTerm}
        setSearchTerm = {setSearchTerm} 
        cuisine = {cuisine}
        setCuisine = {setCuisine}
        includeIngredients={includeIngredients}
        setIncludeIngredients={setIncludeIngredients}
        ignorePantry={ignorePantry}
        setIgnorePantry={setIgnorePantry}
        sort={sort}
        setSort={setSort}
        handleFormSubmit={handleFormSubmit}
      />
    )}
    {selectedTab === "showForms" && (
      <ShowForms forms={forms} setForms={setForms} onUpdate={() => fetchForms()} handleIngredientSearch={handleIngredientSearch}/>
      )}
  </div>
  );
};

export default App
