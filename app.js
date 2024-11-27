// Import the Express framework for building the web application.
const express = require("express");

// Import the body-parser module to parse form data submitted through POST requests.
const bodyParser = require("body-parser");

// Import the fs (file system) module to read from and write to files.
const fs = require("fs");

// Import the path module to handle file and directory paths in a platform-independent way.
const path = require("path");

// Create an instance of an Express application.
const app = express();

// Middleware to parse URL-encoded data from form submissions.
// `extended: true` allows nested objects in the data to be parsed.
app.use(bodyParser.urlencoded({ extended: true }));

// Define a GET route for the root URL ("/") to serve the HTML form and display stored data.
app.get("/", (req, res) => {
    // Path to the file where the submitted data is stored.
    const filePath = path.join(__dirname, "submissions.txt");

    // Read the data from the file asynchronously.
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            // If there's an error (e.g., the file doesn't exist), log it to the console.
            console.error("Error reading file:", err);

            // Set a default message to display when there's no data.
            data = "No submissions yet.";
        }

        // Send an HTML page as a response to the client.
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Simple Form</title>
            </head>
            <body>
                <h1>Submit Your Information</h1>
                <!-- Form for the user to submit their name and email. -->
                <form action="/submit" method="POST">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required><br><br>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required><br><br>
                    <button type="submit">Submit</button>
                </form>
                <hr>
                <!-- Display the data stored in the file. -->
                <h2>Submitted Data:</h2>
                <pre>${data}</pre>
            </body>
            </html>
        `);
    });
});

// Define a POST route to handle form submissions.
app.post("/submit", (req, res) => {
    // Extract the name and email from the form data.
    const { name, email } = req.body;

    // Format the data to be saved in the file.
    const data = `Name: ${name}, Email: ${email}\n`;

    // Path to the file where the data will be stored.
    const filePath = path.join(__dirname, "submissions.txt");

    // Append the data to the file. If the file doesn't exist, it will be created.
    fs.appendFile(filePath, data, (err) => {
        if (err) {
            // Log an error if there's an issue with writing to the file.
            console.error("Error writing to file:", err);

            // Send a 500 status code (Internal Server Error) to the client.
            res.status(500).send("Internal Server Error");
            return;
        }

        // Redirect the client back to the root URL ("/") after successful submission.
        res.redirect("/");
    });
});

// Define the port number on which the server will listen for incoming requests.
const PORT = 3000;

// Start the server and log a message to the console indicating the URL.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



// Run this file: node app.js
