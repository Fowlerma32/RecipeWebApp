//File to connect with the database
//Should have a .env file with values for the environment variables
require('dotenv').config();
const Pool = require("pg").Pool;

const pool = new Pool(
{
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});


module.exports = pool;
