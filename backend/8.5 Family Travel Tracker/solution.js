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

// Track which user is currently active
let currentUserId = 1;                // Default active user ID

// Local cache of users (initial seed, later replaced by DB query)
let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

// Helper: fetch visited countries for current user
async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1; ",
    [currentUserId]                    // Only fetch rows belonging to current user
  );
  let countries = [];
  result.rows.forEach((country) => {   // Loop through each row returned
    countries.push(country.country_code); // Push each country_code into array
  });
  return countries;                    // Return array of visited country codes
}

// Helper: fetch all users and return the current one
async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users"); // Query all users from DB
  users = result.rows;                                  // Update local cache
  return users.find((user) => user.id == currentUserId); // Return active user object
}

// Route: GET request for home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted(); // Get visited countries for current user
  const currentUser = await getCurrentUser(); // Get active user details
  res.render("index.ejs", {                // Render EJS template
    countries: countries,                  // Pass array of country codes
    total: countries.length,               // Pass total count of visited countries
    users: users,                          // Pass all users for dropdown selection
    color: currentUser.color,              // Pass active user's color for UI styling
  });
});

// Route: POST request to add new country for current user
app.post("/add", async (req, res) => {
  const input = req.body["country"];       // Get country name from form input
  const currentUser = await getCurrentUser(); // Fetch active user details

  try {
    // Query DB to find country_code for given country_name (case-insensitive, partial match)
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()] // This is the parameter array passed to the query.
    );

    const data = result.rows[0];           // Get first matching row
    const countryCode = data.country_code; // Extract country_code

    try {
      // Insert country_code into visited_countries table for current user
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");                   // Redirect back to home page to refresh list
    } catch (err) {
      // Error occurs if country already exists for this user (duplicate key)
      console.log(err);
    }
  } catch (err) {
    // Error occurs if country name does not exist in countries table
    console.log(err);
  }
});

// Route: POST request to switch user or add new user
app.post("/user", async (req, res) => {
  if (req.body.add === "new") {            // If "new" selected in form
    res.render("new.ejs");                 // Render form to create new user
  } else {
    currentUserId = req.body.user;         // Switch active user ID
    res.redirect("/");                     // Reload home page with new user's data
  }
});

// Route: POST request to create a new user
app.post("/new", async (req, res) => {
  const name = req.body.name;              // Get new user's name from form
  const color = req.body.color;            // Get new user's color preference

  // Insert new user into DB and return inserted row
  const result = await db.query(
    //After inserting, PostgreSQL will return the entire row that was just created.
    "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
    [name, color]
  );

  const id = result.rows[0].id;            // Extract new user's ID
  currentUserId = id;                      // Set new user as active

  res.redirect("/");                       // Redirect to home page with new user active
});

// Start server and listen on defined port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

