// Set up MySQL connection.
var mysql = require("mysql");


var config = require('../.env')

var connection;
// If I am in hosted/production mode, use line 6, else use the other connection
if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection ({
    host: 'localhost',
    user: config.username,
    password: config.password,
    database: 'burgers_db'
  })
}
// create an environment variable
// process.env stands for which node process environment am I in right now



// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;