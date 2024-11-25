// Import the `http` module, which is a core Node.js module for creating HTTP servers.
const http = require('http');

// Define a function named `handleRequest` to handle incoming HTTP requests.
// This function takes two arguments:
// - `request`: Represents the incoming HTTP request object (contains details like URL, headers, etc.).
// - `response`: Represents the HTTP response object (used to send data back to the client).
function handleRequest(request, response) {
    // Set the HTTP status code of the response to 200, which means "OK" (successful request).
    response.statusCode = 200;

    // Send an HTML response with the content `<h1>Hello World!</h1>` and end the response.
    response.end('<h1>Hello World!</h1>');
}

// Create an HTTP server and pass the `handleRequest` function as the request listener.
// This means that every time the server receives a request, it will call `handleRequest`.
const server = http.createServer(handleRequest);

// Start the server and make it listen for incoming connections on port 3000.
// Once the server starts, it will accept requests at `http://localhost:3000`.
server.listen(3000);

// Log a message to the console so we know the server is running.
console.log('Server running at http://localhost:3000/');


/* How to Run This File
Save the Code: Save the above code into a file named, for example, server.js.
Make sure you have Node.js installed on your system.
Run the file using the following command: node server.js
Navigate to http://localhost:3000/
*/
