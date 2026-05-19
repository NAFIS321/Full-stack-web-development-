import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456789",
  port: 5432,
});

const app = express();
const port = 3000;

db.connect();

let quiz = [];
db.query("SELECT * FROM flags", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }
  db.end();
});

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.name.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

/* // Importing Express framework.
// Express helps build web servers and routes.
import express from "express";

// Importing Body Parser middleware.
// Used to read form data from requests.
import bodyParser from "body-parser";

// Importing PostgreSQL package.
// "pg" allows Node.js to communicate with PostgreSQL database.
import pg from "pg";



// ======================================================
// DATABASE CONNECTION SETUP
// ======================================================

// Creating PostgreSQL client connection.
const db = new pg.Client({

  // PostgreSQL username.
  user: "postgres",

  // Database server location.
  // localhost means your own computer.
  host: "localhost",

  // Database name.
  database: "world",

  // Database password.
  password: "123456789",

  // PostgreSQL default port.
  port: 5432,
});



// ======================================================
// EXPRESS APP SETUP
// ======================================================

// Creating Express application.
const app = express();

// Server will run on localhost:3000
const port = 3000;



// ======================================================
// CONNECTING DATABASE
// ======================================================

// Establishing connection to PostgreSQL database.
db.connect();



// ======================================================
// QUIZ DATA STORAGE
// ======================================================

// Empty array for storing quiz questions.
let quiz = [];



// ======================================================
// DATABASE QUERY
// ======================================================

// Running SQL query.
// SELECT * means:
// "Get all columns from flags table"
db.query("SELECT * FROM flags", (err, res) => {

  // If database query fails...
  if (err) {

    // Print error details.
    console.error("Error executing query", err.stack);

  } else {

    // res.rows contains all rows from database.

    // Storing database rows into quiz array.
    quiz = res.rows;
  }

  // Closing database connection.
  db.end();
});



// ======================================================
// SCORE TRACKING
// ======================================================

// Stores total correct answers.
let totalCorrect = 0;



// ======================================================
// MIDDLEWARE
// ======================================================

// Middleware for reading form data.
app.use(bodyParser.urlencoded({

  // Allows nested object parsing.
  extended: true
}));



// express.static("public")
// Allows serving static files.

// Example:
// CSS
// images
// JavaScript files

// Files inside "public" folder become accessible.
app.use(express.static("public"));



// ======================================================
// CURRENT QUESTION STORAGE
// ======================================================

// Stores currently displayed question.
let currentQuestion = {};



// ======================================================
// HOME ROUTE
// ======================================================

// GET request for homepage.
app.get("/", async (req, res) => {

  // Resetting score when homepage loads.
  totalCorrect = 0;

  // Generating next random question.
  await nextQuestion();

  // Debugging current question.
  console.log(currentQuestion);

  // Rendering index.ejs
  // Sending question object to frontend.
  res.render("index.ejs", {

    // EJS can access:
    // question.name
    // question.flag
    question: currentQuestion
  });
});



// ======================================================
// SUBMIT ANSWER ROUTE
// ======================================================

// POST request when user submits answer.
app.post("/submit", (req, res) => {

  // Getting user's answer from form.

  // trim() removes extra spaces.
  // Example:
  // " Bangladesh " -> "Bangladesh"
  let answer = req.body.answer.trim();

  // Initially assuming answer is wrong.
  let isCorrect = false;



  // Comparing correct answer with user answer.

  // toLowerCase() makes comparison case-insensitive.

  // Example:
  // "bangladesh" === "Bangladesh"
  if (
    currentQuestion.name.toLowerCase()
    ===
    answer.toLowerCase()
  ) {

    // Increase score if correct.
    totalCorrect++;

    // Debugging score.
    console.log(totalCorrect);

    // Mark answer as correct.
    isCorrect = true;
  }



  // Load another random question.
  nextQuestion();



  // Render updated page.
  res.render("index.ejs", {

    // New random question.
    question: currentQuestion,

    // Whether previous answer was correct.
    wasCorrect: isCorrect,

    // Current score.
    totalScore: totalCorrect,
  });
});



// ======================================================
// RANDOM QUESTION GENERATOR
// ======================================================

// Async function for generating random question.
async function nextQuestion() {

  // Generate random array index.

  // Math.random():
  // random decimal number

  // quiz.length:
  // total number of questions

  const randomCountry =
    quiz[Math.floor(Math.random() * quiz.length)];



  // Store selected question globally.
  currentQuestion = randomCountry;
}



// ======================================================
// START SERVER
// ======================================================

// Starting Express server.
app.listen(port, () => {

  // Runs when server starts successfully.
  console.log(
    `Server is running at http://localhost:${port}`
  );
});   

PostgreSQL Database
        ↓
Load all flags into quiz array
        ↓
Pick random country
        ↓
Show question to user
        ↓
User submits answer
        ↓
Check correctness
        ↓
Update score
        ↓
Show next question
*/