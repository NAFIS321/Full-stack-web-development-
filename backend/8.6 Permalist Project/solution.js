import express from "express"; // Import the Express framework to build web servers
import bodyParser from "body-parser"; // Import body-parser to handle form submissions (parse request bodies)
import pg from "pg"; // Import 'pg' (node-postgres) to connect and query PostgreSQL database

const app = express(); // Create an Express application instance
const port = 3000; // Define the port number where the server will listen

// Configure PostgreSQL client connection
const db = new pg.Client({
  user: "postgres",       // Database username
  host: "localhost",      // Database host (local machine)
  database: "permalist",  // Database name
  password: "123456789",  // Database password
  port: 5432,             // Default PostgreSQL port
});
db.connect(); // Establish connection to the database

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded form data (extended allows nested objects)
app.use(express.static("public")); // Serve static files (CSS, JS, images) from the "public" folder

// Temporary in-memory items (initial sample data)
let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

// Route: GET request to homepage
app.get("/", async (req, res) => {
  try {
    // Query database for all items ordered by id
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    items = result.rows; // Replace local items array with database rows

    // Render index.ejs template with data
    res.render("index.ejs", {
      listTitle: "Today",   // Title for the list
      listItems: items,     // Pass items to template
    });
  } catch (err) {
    console.log(err); // Log any errors
  }
});

// Route: POST request to add new item
app.post("/add", async (req, res) => {
  const item = req.body.newItem; // Extract new item text from form input
  // items.push({title: item}); // Old in-memory push (commented out, now using DB)
  try {
    // Insert new item into database
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    res.redirect("/"); // Redirect back to homepage to show updated list
  } catch (err) {
    console.log(err);
  }
});

// Route: POST request to edit existing item
app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle; // Extract updated title from form
  const id = req.body.updatedItemId;      // Extract item id to update

  try {
    // Update item in database by id
    await db.query("UPDATE items SET title = ($1) WHERE id = $2", [item, id]);
    res.redirect("/"); // Redirect back to homepage
  } catch (err) {
    console.log(err);
  }
});

// Route: POST request to delete item
app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId; // Extract id of item to delete
  try {
    // Delete item from database by id
    await db.query("DELETE FROM items WHERE id = $1", [id]);
    res.redirect("/"); // Redirect back to homepage
  } catch (err) {
    console.log(err);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Log server start message
});

