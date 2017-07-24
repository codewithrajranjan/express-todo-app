### Installing the app

clone the repository
```

   git clone https://github.com/self-tuts/express-todo-app.git 


```

Install the libraries from npm 

```

    npm install


```

Running the app

```

    node app.js


```


Running Test cases

```

   ./node_modules/mocha/bin/mocha test/NAME_OF_THE_FILE 


```


### Database connection

Database connection is present in app/task/taskController.js

Update this file with your own database credentials



### REST API exposed

Get all the task

```

   GET  http:\\ip-address:port\task


```


Get Task by id 
```

   GET  http:\\ip-address:port\task\id\:taskId


```

Create Task
```

   POST  http:\\ip-address:port\task


```

Delete Task by id 
```

   DELETE  http:\\ip-address:port\task\id\:taskId


```

Update Task status by id 
```

   PUT  http:\\ip-address:port\task\id\:taskId\status\:taskStatus


```

