import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//Add your own bearer token from the previous lesson.
const yourBearerToken = "08f3026d-9c6c-4d88-a3b2-c579dc106247";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  try {
    const result = await axios.post(API_URL + "/secrets", req.body, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.put(
      API_URL + "/secrets/" + searchId,
      req.body,
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.patch(
      API_URL + "/secrets/" + searchId,
      req.body,
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*// Importing Express framework.
// Express helps create a web server easily.
import express from "express";

// Importing Axios library.
// Axios is used for sending HTTP requests to APIs.
import axios from "axios";

// Importing Body Parser middleware.
// It helps read form data sent from HTML forms.
import bodyParser from "body-parser";


// Creating the Express application.
const app = express();


// Defining the port number.
// The server will run on localhost:3000
const port = 3000;


// Base URL of the Secrets API.
const API_URL = "https://secrets-api.appbrewery.com";


// Your Bearer Token for authentication.
// Bearer tokens act like special permission keys 🔑
const yourBearerToken = "08f3026d-9c6c-4d88-a3b2-c579dc106247";


// Creating reusable Axios configuration object.
const config = {

  // headers contains extra information sent with requests.
  headers: {

    // Authorization header format:
    // "Bearer TOKEN"
    Authorization: `Bearer ${yourBearerToken}`
  },
};


// Middleware setup.
// This allows Express to read data from forms.
app.use(bodyParser.urlencoded({

  // extended: true allows nested objects in form data.
  extended: true
}));


// ============================
// HOME ROUTE
// ============================

// GET route for homepage "/"
app.get("/", (req, res) => {

  // Rendering index.ejs file.
  // Sending initial message to webpage.
  res.render("index.ejs", {
    content: "Waiting for data..."
  });
});


// ============================
// GET SECRET ROUTE
// ============================

// POST route for fetching a secret by ID.
app.post("/get-secret", async (req, res) => {

  // Getting the "id" value from form input.
  // Example:
  // <input name="id">
  const searchId = req.body.id;

  try {

    // Sending GET request to:
    // /secrets/:id
    const result = await axios.get(

      // Example final URL:
      // /secrets/2
      API_URL + "/secrets/" + searchId,

      // Sending Bearer Token config.
      config
    );

    // Rendering API response on webpage.
    res.render("index.ejs", {
      content: JSON.stringify(result.data)
    });

  } catch (error) {

    // If error happens, show error response.
    res.render("index.ejs", {
      content: JSON.stringify(error.response.data)
    });
  }
});


// ============================
// POST SECRET ROUTE
// ============================

// Route for creating a new secret.
app.post("/post-secret", async (req, res) => {

  try {

    // Sending POST request.
    const result = await axios.post(

      // Endpoint URL
      API_URL + "/secrets",

      // req.body contains form data entered by user.
      // This becomes the request body sent to API.
      req.body,

      // Authorization config
      config
    );

    // Showing created secret response.
    res.render("index.ejs", {
      content: JSON.stringify(result.data)
    });

  } catch (error) {

    // Showing error response.
    res.render("index.ejs", {
      content: JSON.stringify(error.response.data)
    });
  }
});


// ============================
// PUT SECRET ROUTE
// ============================

// Route for completely updating a secret.
app.post("/put-secret", async (req, res) => {

  // Getting secret ID from form.
  const searchId = req.body.id;

  try {

    // Sending PUT request.
    const result = await axios.put(

      // URL with secret ID.
      API_URL + "/secrets/" + searchId,

      // Full updated data.
      req.body,

      // Bearer token config.
      config
    );

    // Showing updated result.
    res.render("index.ejs", {
      content: JSON.stringify(result.data)
    });

  } catch (error) {

    // Showing error message.
    res.render("index.ejs", {
      content: JSON.stringify(error.response.data)
    });
  }
});


// ============================
// PATCH SECRET ROUTE
// ============================

// Route for partially updating a secret.
app.post("/patch-secret", async (req, res) => {

  // Getting secret ID.
  const searchId = req.body.id;

  try {

    // Sending PATCH request.
    const result = await axios.patch(

      // API endpoint with ID.
      API_URL + "/secrets/" + searchId,

      // Only changed fields are sent.
      req.body,

      // Authorization config.
      config
    );

    // Rendering updated response.
    res.render("index.ejs", {
      content: JSON.stringify(result.data)
    });

  } catch (error) {

    // Showing error response.
    res.render("index.ejs", {
      content: JSON.stringify(error.response.data)
    });
  }
});


// ============================
// DELETE SECRET ROUTE
// ============================

// Route for deleting a secret.
app.post("/delete-secret", async (req, res) => {

  // Getting ID from form.
  const searchId = req.body.id;

  try {

    // Sending DELETE request.
    const result = await axios.delete(

      // URL of secret to delete.
      API_URL + "/secrets/" + searchId,

      // Bearer token config.
      config
    );

    // Showing delete response.
    res.render("index.ejs", {
      content: JSON.stringify(result.data)
    });

  } catch (error) {

    // Showing error if delete fails.
    res.render("index.ejs", {
      content: JSON.stringify(error.response.data)
    });
  }
});


// ============================
// START SERVER
// ============================

// Starting Express server.
app.listen(port, () => {

  // Runs when server starts successfully.
  console.log(`Server is running on port ${port}`);
});*/