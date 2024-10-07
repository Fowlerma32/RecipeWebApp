CREATE Database RecipeApp;

CREATE TABLE UserTable
(
    User_ID int PRIMARY KEY,
    Username varchar(16),
    UserPass varchar(255)
);

CREATE TABLE Ingredients
(
    Ingredient_ID int PRIMARY KEY,
    User_ID int REFERENCES UserTable(User_ID),
    Ingredient_Name varchar(50)
);

CREATE TABLE Recipes
(
    Recipe_ID int PRIMARY KEY,
    User_ID int REFERENCES UserTable(User_ID),
    API_ID int,
    Recipe_Name varchar(255),
    Recipe_URL text
);