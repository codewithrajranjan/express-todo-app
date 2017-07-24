var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var taskController = require('./app/task/taskController');


// Defining variables
var SERVER_PORT = 5000;

var app = express();


// applying middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



// create Task
app.post('/task',taskController.createTask);

// Get all task resource
app.get('/task',taskController.getTask);

// Get task by id
app.get('/task/id/:taskId',taskController.getTaskById);

// Delete task by id
app.delete('/task/id/:taskId',taskController.deleteTaskById);

// Update task status by id
app.put('/task/id/:taskId/status/:taskStatus',taskController.updateTaskStatusById);



// this wrapper is only for testing purpose
if(!module.parent){
    // staring the express server
    app.listen(SERVER_PORT,function(){
        console.log("Server is listening at port :  ",SERVER_PORT);
    });
}

module.exports = app;




