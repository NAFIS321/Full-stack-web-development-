import express from "express"; // Import Express framework to build the web server
import bodyParser from "body-parser"; // Import body-parser to parse form data (POST requests)
import pg from "pg"; // Import 'pg' library to connect and query PostgreSQL database

const app = express(); // Create Express application instance
const port = 3000;     // Define port number for server

// Configure PostgreSQL client connection
const db = new pg.Client({
  user: "postgres",       // Database username
  host: "localhost",      // Database host (local machine)
  database: "world",      // Database name (must exist in PostgreSQL)
  password: "123456789",  // Database password
  port: 5432,             // Default PostgreSQL port
});

db.connect(); // Establish connection to PostgreSQL database

// Initial quiz data (fallback if DB not loaded yet)
let quiz = [
  { country: "France", capital: "Paris" },
  { country: "United Kingdom", capital: "London" },
  { country: "United States of America", capital: "New York" },
];

// Query database for all capitals
db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack); // Log error if query fails
  } else {
    quiz = res.rows; // Replace quiz array with rows from DB
  }
  db.end(); // Close database connection after fetching data
});

let totalCorrect = 0; // Track total correct answers

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })); // Parse form submissions
app.use(express.static("public")); // Serve static files (CSS, JS, images) from "public" folder

let currentQuestion = {}; // Store the current quiz question

// Route: GET homepage
app.get("/", async (req, res) => {
  totalCorrect = 0; // Reset score when starting fresh
  await nextQuestion(); // Pick a random question
  console.log(currentQuestion); // Log current question for debugging
  res.render("index.ejs", { question: currentQuestion }); 
  // Render EJS template with current question
});

// Route: POST submit answer
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim(); // Get submitted answer from form
  let isCorrect = false; // Flag for correctness

  // Compare submitted answer with correct capital (case-insensitive)
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++; // Increase score if correct
    console.log(totalCorrect); // Log score
    isCorrect = true; // Mark as correct
  }

  nextQuestion(); // Load next random question

  // Render template with feedback
  res.render("index.ejs", {
    question: currentQuestion, // Next question
    wasCorrect: isCorrect,     // Whether last answer was correct
    totalScore: totalCorrect,  // Current score
  });
});

// Function: pick next random question
async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry; // Store chosen question
}

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
