// Importing the Express framework.
// Express helps us create a web server easily.
import express from "express";

// Importing Axios library.
// Axios is used to make HTTP requests to APIs.
import axios from "axios";

// Creating an Express application.
// Think of this as creating the main "server app".
const app = express();

// Defining which port the server will run on.
// Port 3000 means the app will open at localhost:3000
const port = 3000;

// Base URL of the API we will communicate with.
const API_URL = "https://secrets-api.appbrewery.com";

// Your login username for Basic Authentication.
const yourUsername = "ahmmed";

// Your login password for Basic Authentication.
const yourPassword = "12345";

// API key used for API Key Authentication.
const yourAPIKey =  "d12bbd4c-b859-4cf0-b0e0-c241eb35eb9f";

// Bearer token used for Bearer Token Authentication.
const yourBearerToken ="b4969f1f-103e-46af-84b2-c0e99047adfa";


// ============================
// HOME ROUTE
// ============================

// Creating a GET route for "/"
// When someone visits localhost:3000/
app.get("/", (req, res) => {

  // Rendering the "index.ejs" file
  // and sending an object with content data.
  res.render("index.ejs", { content: "API Response." });
});


// ============================
// NO AUTHENTICATION ROUTE
// ============================

// Route for testing API without authentication.
app.get("/noAuth", async (req, res) => {

  // try block handles successful API requests.
  try {

    // Sending GET request to:
    // https://secrets-api.appbrewery.com/random
    // This endpoint does not require authentication.
    const result = await axios.get(API_URL + "/random");

    // result.data contains the API response data.
    // JSON.stringify converts object into readable string.
    res.render("index.ejs", {
      content: JSON.stringify(result.data)
    });

  } catch (error) {

    // If any error happens, send error message.
    res.status(404).send(error.message);
  }
});


// ============================
// BASIC AUTHENTICATION ROUTE
// ============================

// Route using username + password authentication.
app.get("/basicAuth", async (req, res) => {

  try {

    // Sending GET request with Basic Authentication.
    const result = await axios.get(

      // Endpoint URL
      API_URL + "/all?page=2",

      

      // THIRD PARAMETER = configuration object
      {
        auth: {

          // Username sent to API
          username: yourUsername,

          // Password sent to API
          password: yourPassword,
        },
      }
    );

    // Showing API response in browser.
    res.render("index.ejs", {
      content: JSON.stringify(result.data)
    });

  } catch (error) {

    // Error handling
    res.status(404).send(error.message);
  }
});


// ============================
// API KEY AUTHENTICATION ROUTE
// ============================

// Route using API Key authentication.
app.get("/apiKey", async (req, res) => {

  try {

    // Sending GET request with query parameters.
    const result = await axios.get(API_URL + "/filter", {

      // params automatically creates URL query strings.
      // Final URL becomes:
      // /filter?score=5&apiKey=YOUR_KEY
      params: {

        // Filtering secrets with score 5
        score: 5,

        // Sending API key
        apiKey: yourAPIKey,
      },
    });

    // Render response data
    res.render("index.ejs", {
      content: JSON.stringify(result.data)
    });

  } catch (error) {

    // Error handling
    res.status(404).send(error.message);
  }
});


// ============================
// BEARER TOKEN CONFIGURATION
// ============================

// Creating reusable configuration object.
const config = {

  headers: {

    // Sending Authorization header.
    // Format must be:
    // Authorization: Bearer TOKEN
    Authorization: `Bearer ${yourBearerToken}`
  },
};


// ============================
// BEARER TOKEN ROUTE
// ============================

// Route using Bearer Token Authentication.
app.get("/bearerToken", async (req, res) => {

  try {

    // Sending GET request with Authorization header.
    const result = await axios.get(
      API_URL + "/secrets/2",
      config
    );

    // Showing response data
    res.render("index.ejs", {
      content: JSON.stringify(result.data)
    });

  } catch (error) {

    // Error handling
    res.status(404).send(error.message);
  }
});


// ============================
// STARTING THE SERVER
// ============================

// Starts the Express server.
app.listen(port, () => {

  // Runs when server starts successfully.
  console.log(`Server is running on port ${port}`);
});
