import express from "express";        // Import Express framework to build web applications
import bodyParser from "body-parser"; // Import body-parser to parse incoming request bodies (form submissions)
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
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data (URL-encoded bodies)
app.use(express.static("public"));                  // Serve static files (CSS, JS, images) from "public" folder

// Helper function: fetch visited countries from DB
async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  // Query DB for all country codes in visited_countries table

  let countries = [];                 // Initialize empty array
  result.rows.forEach((country) => {  // Loop through each row returned
    countries.push(country.country_code); // Push each country_code into array
  });
  return countries;                   // Return array of visited country codes
}

// Route: GET request for home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted(); // Call helper to get visited countries
  res.render("index.ejs", {                // Render EJS template
    countries: countries,                  // Pass array of country codes
    total: countries.length                // Pass total count of visited countries
  });
});

// Route: POST request to add new country
app.post("/add", async (req, res) => {
  const input = req.body["country"];       // Get country name from form input

  // Query DB to find country_code for given country_name
  const result = await db.query(
    "SELECT country_code FROM countries WHERE country_name = $1",
    [input]                                // Use parameterized query to prevent SQL injection
  );

  if (result.rows.length !== 0) {          // If country exists in DB
    const data = result.rows[0];           // Get first row
    const countryCode = data.country_code; // Extract country_code

    // Insert country_code into visited_countries table
    await db.query(
      "INSERT INTO visited_countries (country_code) VALUES ($1)",
      [countryCode]
    );

    res.redirect("/");                     // Redirect back to home page to refresh list
  }
});

// Start server and listen on defined port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

