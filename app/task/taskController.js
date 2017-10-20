var connection = require('../lib/database').connection;

module.exports = {
    createTask: function (req, res) {
        // accessing the data in request body
        var requestData = req.body;

        // if task message is not available then returning error
        if (!requestData.taskMessage) {
            return res.status(400).json({ code: "taskCreationFailed", message: "task message not available" });
        }

        var taskData = {
            taskMessage: requestData.taskMessage,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        //inserting data into mysql
        connection.query('INSERT INTO task SET ?', taskData, function (err, result, fields) {
            if (err) {
                console.log(err);
                return res.status(500).json({ code: "taskCreationFailed", message: "error in database entry creation" });
            }
            return res.status(200).json({ code: "taskCreated", message: "taskCreatedSuccessfully" });
        });
    },
    getTask: function (req, res) {
        //  finding all the task 
        connection.query('SELECT * FROM task', function (err, result, fields) {
            if (err) {
                console.log(err);
                return res.status(500).json({ code: "taskNotFound", message: "error in database while finding task" });
            }
            res.status(200).json({ code: "taskFound", data: result });
        });
    },
    getTaskById: function (req, res) {
        // accessing taskId to find
        var taskId = req.params.taskId;

        connection.query('SELECT * FROM task where id=?', [taskId], function (err, result, fields) {
            if (err) {
                console.log(err);
                return res.status(500).json({ code: "taskNotFound", message: "error in database while finding task" });
            }
            // checking if no data is returned from database then returning response
            if (result.length === 0) {
                return res.status(404).json({ code: "taskNotFound", message: "Task not found" });
            }
            // returning successfull response
            res.status(200).json({ code: "taskFound", data: result });

        });
    },
    deleteTaskById: function (req, res) {
        // taskId which needs to be deleted
        var taskId = req.params.taskId;

        // first we need to see that the task with id exists in database
        connection.query('SELECT * from task where id=?', [taskId], function (err, result, fields) {
            if (err) {
                console.log("Error occurred while finding task", err);
                return res.status(500).json({ code: 'taskDeleteFailed', message: "Error occured while finding task in database" });
            }
            // now we need to see if the task exists in database
            if (result.length === 0) {
                return res.status(400).json({ code: 'taskDeleteFailed', message: "Task not found" });
            }
            // now deleting the task
            connection.query('DELETE FROM task where id=?', [taskId], function (err, result, fields) {
                if (err) {
                    console.log("Error occurred while finding task", err);
                    return res.status(500).json({ code: 'taskDeleteFailed', message: "Error occured while finding task in database" });
                }
                res.status(200).json({ code: "taskDeleted"});
            });
        });

    },
    updateTaskById: function (req, res) {
        // task id which we need to update
        var taskId = req.params.taskId;

        // Request Data
        var requestData = req.body;
        // sending error if requestData doesn't contain taskMessage
        if (!requestData.taskMessage) {
            return res.status(400).json({ code: 'taskUpdateFailed', message: "Task message not available in request" });
        }

        // first we need to find if task with given id is present or not
        connection.query('SELECT * FROM task where id=?', [taskId], function (err, result, fields) {
            if (err) {
                console.log(err);
                return res.status(500).json({ code: "taskUpdateFailed", message: "error in database while finding task" });
            }
            // checking if no data is returned from database then returning response
            if (result.length === 0) {
                return res.status(400).json({ code: "taskUpdateFailed", message: "Task not found" });
            }

            // if task is found then we need to update the task
            connection.query('UPDATE task SET taskMessage=?, updatedAt=? where id=?', [requestData.taskMessage, new Date(), taskId], function (err, result, fields) {
                if (err) {
                    console.log('Error while updating task', err);
                    return res.status(500).json({ code: "tasUpdateFailed", message: "Database error occured" });
                }
                res.status(200).json({ code: "taskUpdated" });
            });
        });

    }
};