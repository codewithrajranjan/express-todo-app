var mysql      = require('mysql');

// creating a database connection
var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'password',
      database : 'todo_app'
});
connection.connect();
module.exports = {
    createTask : function(req,res){
        connection.query('INSERT INTO task SET ?',req.body,function(err,result,fields){
            if(err){
                throw err;
            }
            res.status(200);
            res.json({code: "taskCreated" });
        });
    },
    getTask : function(req,res){
        connection.query('SELECT * FROM task',function(err,result,fields){
            if(err){
                throw err;
            }
            res.status(200);
            res.json({code : "taskFound",data : result});
            
        });
    },
    getTaskById : function(req,res){
        var taskId = req.params.taskId;
        connection.query('SELECT * FROM task where id=?',[taskId],function(err,result,fields){
            if(err){
                throw err;
            }
            res.status(200);
            res.json({code : "taskFound",data : result});
            
        });
    },
    deleteTaskById : function(req,res){
        var taskId = req.params.taskId;
        connection.query('DELETE FROM task where id=?',[taskId],function(err,result,fields){
            if(err){
                throw err;
            }
            res.status(200);
            res.json({code : "taskDeleted",data : result});
            
        });
    }


};
