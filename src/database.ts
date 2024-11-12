import mysql from 'mysql';

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'pai_dbs_1'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

export default connection;