import express from "express"; // Imports the Express framework to build the web server
import bodyParser from "body-parser"; // Middleware to parse data from incoming POST requests (like form data)
import axios from "axios"; // A library used to make HTTP requests to external APIs

const app = express(); // Creates an instance of an Express application
const port = 3000; // Defines the port number where the server will listen for traffic

app.use(express.static("public")); // Tells Express to serve static files (CSS, images, JS) from the "public" folder
app.use(bodyParser.urlencoded({ extended: true })); // Configures body-parser to handle URL-encoded form data

// --- GET Route: Triggered when the user first loads the home page ---
app.get("/", async (req, res) => {
  try {
    // Sends a GET request to the API to get one random activity
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data; // Extracts the actual JSON data from the API response
    console.log(result); // Logs the data to the terminal for debugging
    // Renders the 'solution.ejs' file and passes the API data to it as a variable named 'data'
    res.render("solution.ejs", { data: result });
  } catch (error) {
    // If the API is down or the request fails, this block runs
    console.error("Failed to make request:", error.message);
    // Renders the page but passes an error message instead of data
    res.render("solution.ejs", {
      error: error.message,
    });
  }
});

// --- POST Route: Triggered when the user submits the form on the page ---
app.post("/", async (req, res) => {
  try {
    console.log(req.body); // Logs the form data sent by the user (e.g., { type: 'recreational', participants: '2' })
    const type = req.body.type; // Grabs the 'type' value from the submitted form
    const participants = req.body.participants; // Grabs the 'participants' value from the submitted form
    
    // Makes a filtered API request using the user's specific input criteria
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    const result = response.data; // This returns an ARRAY of activities matching the criteria
    console.log(result);
    
    // Renders the page, but picks ONE random activity from the array returned by the API
    res.render("solution.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    });
  } catch (error) {
    // Handles cases where no activities match the user's specific filter
    console.error("Failed to make request:", error.message);
    res.render("solution.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

// --- Server Startup ---
app.listen(port, () => {
  // Starts the server and keeps it running, listening for requests on port 3000
  console.log(`Server running on port: ${port}`);
});