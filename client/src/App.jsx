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
  const [ingredients, setIngredients] = useState("");
  const [ignorePantry, setIgnorePantry] = useState(false);
  const [ranking, setRanking] = useState(2);
  const [forms, setForms] = useState([]);
  const pageNumber = useRef(1);

  

  const handleSearch = async(event) => {
    event.preventDefault();
    try{
      const recipes = await searchRecipes(searchTerm, 1)
      setRecipes(recipes.results);    
      pageNumber.current = 1;  
    }
    catch(e){
      console.log(e);
    }
  }

  const handleIngredientSearch = async(form) => {
    try{
      const recipesData = await searchRecipesBy(form.ingredient_list, form.ignore_pantry, form.ranking)
      setRecipes(recipesData || []);
      setSelectedTab("search");

    }
    catch(e){
      console.log(e);
    }
  }

  const handleViewMoreClick = async() => {
    const nextPage = pageNumber.current + 1;
    try{
      const nextRecipes = await searchRecipes(searchTerm,nextPage);
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    }
    catch (error){
      console.log(error);
    }
  }


  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the page from refreshing on submit
  
    try {
      const formData = {
        ingredients,
        ignorePantry,
        ranking,
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
      setIngredients("");
      setIgnorePantry(false);
      setRanking(2);

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  
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
      {recipes.map((recipe)=> (
        <RecipeCard recipe={recipe}/>
      ))}

      <button
        className = "view-more-button"
        onClick = {handleViewMoreClick}> 
        View More
      </button>    
    </>)}
    {selectedTab === "addForm" && (
        <IngredientForm 
        ingredients={ingredients}
        setIngredients={setIngredients}
        ignorePantry={ignorePantry}
        setIgnorePantry={setIgnorePantry}
        ranking={ranking}
        setRanking={setRanking}
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
