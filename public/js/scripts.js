$(document).ready(function () {
    // Add Task
    // $("#addTaskForm").submit(function (e) {
    //     e.preventDefault();
    //     const formData = $(this).serialize();
    //     $.post("/tasks", formData, function (task) {
    //         $("#tasksTable").append(`
    //             <tr data-id="${task.id}">
    //                 <td>${task.id}</td>
    //                 <td class="task-name">${task.name}</td>
    //                 <td class="task-status">${task.status}</td>
    //                 <td>
    //                     <button class="btn btn-warning btn-sm editTask">Edit</button>
    //                     <button class="btn btn-danger btn-sm deleteTask">Delete</button>
    //                 </td>
    //             </tr>
    //         `);
    //     });
    // });

    $("#addTaskForm").submit(function (e) {
    e.preventDefault(); // Prevent default form submission
    
    const formData = $(this).serialize(); // Serialize form data
    
    $.ajax({
        url: "/tasks",         // The URL to send the request to
        type: "POST",          // HTTP method
        data: formData,        // Data to send in the request
        success: function (task) {
            // Append the new task to the tasks table on success
            $("#tasksTable").append(`
                <tr data-id="${task.id}">
                    <td>${task.id}</td>
                    <td class="task-name">${task.name}</td>
                    <td class="task-status">${task.status}</td>
                    <td>
                        <button class="btn btn-warning btn-sm editTask">Edit</button>
                        <button class="btn btn-danger btn-sm deleteTask">Delete</button>
                    </td>
                </tr>
            `);
        },
        error: function (xhr, status, error) {
            // Handle any errors that occur
            console.error("Error:", status, error);
            alert("An error occurred while adding the task.");
        }
    });
});


    // Edit Task (inline)
    $(document).on("click", ".editTask", function () {
        const row = $(this).closest("tr");
        const id = row.data("id");
        const name = prompt("Enter new task name", row.find(".task-name").text());
        const status = prompt("Enter new status", row.find(".task-status").text());
        if (name && status) {
            $.ajax({
                url: `/tasks/${id}`,
                method: "PUT",
                data: { name, status },
                success: function (task) {
                    row.find(".task-name").text("task.name");
                    row.find(".task-status").text("task.status");
                },
            });
        }
    });

    // Delete Task
    $(document).on("click", ".deleteTask", function () {
        const row = $(this).closest("tr");
        const id = row.data("id");
        if (confirm("Are you sure you want to delete this task?")) {
            $.ajax({
                url: `/tasks/${id}`,
                method: "DELETE",
                success: function () {
                    row.remove();
                },
            });
        }
    });
});
