
import express from "express";        // Import the Express framework to build web applications
import bodyParser from "body-parser"; // Import body-parser to handle form data (POST requests)
import pg from "pg";                  // Import 'pg' (node-postgres) to connect and query PostgreSQL database

const app = express();                // Create an Express application instance
const port = 3000;                    // Define the port number where the server will run

// Configure PostgreSQL client connection
const db = new pg.Client({
  user: "postgres",                   // Database username
  host: "localhost",                  // Database host (local machine)
  database: "world",                  // Database name
  password: "123456789",              // Database password
  port: 5432,                         // PostgreSQL default port
});
db.connect();                         // Establish connection to the PostgreSQL database

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })); // Parse incoming request bodies (form submissions)
app.use(express.static("public"));                  // Serve static files (CSS, JS, images) from "public" folder

// Route: GET request for home page
app.get("/", async (req, res) => {
  // Query database to fetch all country codes from visited_countries table
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];                 // Initialize empty array to store country codes
  result.rows.forEach((country) => {  // Loop through each row returned from query
    countries.push(country.country_code); // Push each country_code into the array
  });

  console.log(result.rows);           // Log the raw query result rows to console (for debugging)

  // Render index.ejs template, passing countries array and total count
  res.render("index.ejs", { countries: countries, total: countries.length });

  db.end();                           // Close database connection (⚠️ risky: ends connection after first request)
});

// Start server and listen on defined port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



//-------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------
/*
Key Logic Notes:
Express setup: Creates a web server that listens on port 3000.

Database connection: Uses pg.Client to connect to PostgreSQL.

Middleware: Handles form data and serves static assets.

Route handling: The app.get("/") defines what happens when someone visits the homepage.

Query execution: Fetches country_code values from the database.

Template rendering: Passes data (countries and total) into an EJS view.

Connection closing: db.end() closes the connection after one request — usually not recommended, better to keep connection open or use pooling.
*/