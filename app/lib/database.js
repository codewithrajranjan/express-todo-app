var mysql      = require('mysql');

// creating a database connection
var connection = mysql.createConnection({
      host     : '172.18.0.102',
      user     : 'root',
      password : 'password',
      database : 'todo_app'
});
connection.connect();

module.exports = {
    connection : connection
};
