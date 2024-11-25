// Import the 'http' module from Node.js to create and handle HTTP servers
const http = require('http');

// Define a function to handle incoming HTTP requests and send appropriate responses
function handleRequest(request, response) {
   // Check the URL of the incoming request
   if (request.url === '/currenttime') {
       // If the URL is '/currenttime', send the current date and time as the response
       response.statusCode = 200; // Set HTTP status code to 200 (OK)
       response.end('<h1>' + new Date().toISOString() + '</h1>'); // Send the current time in ISO format
    //    new Date().toISOString() is a JavaScript expression that creates a new Date object and converts it to a string in ISO 8601 format.
   } else if (request.url === '/') {
       // If the URL is '/', send a "Hello World" message
       response.statusCode = 200; // Set HTTP status code to 200 (OK)
       response.end('<h1>Hello World</h1>'); // Send a simple "Hello World" message
   }
}

// Create an HTTP server and assign the `handleRequest` function to handle incoming requests
const server = http.createServer(handleRequest);

// Start the server and listen on port 3000 for incoming connections
server.listen(3000);

// Log a message to the console to indicate that the server is running
console.log('Server running at http://localhost:3000/');
