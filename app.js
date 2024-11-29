const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // For handling JSON payloads
app.use(methodOverride("_method"));
app.use(express.static("public")); // Serve static files

// Set up EJS
app.set("view engine", "ejs");

// Task storage (in-memory)
let tasks = [
  { id: 1, name: "Learn AJAX", status: "Pending" },
  { id: 2, name: "Build CRUD App", status: "In Progress" },
];

// Routes
app.get("/", (req, res) => {
  res.render("index", { tasks });
});

app.post("/tasks", (req, res) => {
  const { name, status } = req.body;
  const newTask = { id: tasks.length + 1, name, status };
  tasks.push(newTask);
  res.json(newTask); // Respond with the new task
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const task = tasks.find((t) => t.id === parseInt(id));
  if (task) {
    task.name = name;
    task.status = status;
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== parseInt(id));
  res.json({ success: true });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
