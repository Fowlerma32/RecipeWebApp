CREATE Database RecipeApp;

CREATE TABLE UserTable
(
    User_ID SERIAL PRIMARY KEY,
    Username varchar(16),
    UserPass varchar(255)
);

CREATE TABLE IngredientForm
(
    Form_ID SERIAL PRIMARY KEY,
    User_ID int REFERENCES UserTable(User_ID),
    Query varchar(255),
    Cuisine varchar(255),
    Ingredient_List varchar(255),
    Ignore_Pantry BOOLEAN,
    Sort varchar(255)
);

CREATE TABLE SavedRecipes
(
    Recipe_ID SERIAL PRIMARY KEY,
    User_ID int REFERENCES UserTable(User_ID),
    API_ID int,
    Recipe_Name varchar(255),
    Recipe_URL text
);