/*
# Node.js + MySQL code sample customized by TechieInYou 
#
# mysql library will be importing from Lambda layer
# all other libraries are available by default in Node.js runtime provided by Lambda
*/
exports.handler = async function (event, context) {
    const mysql = require('mysql');
    const http = require('http');

    // Create a connection to the database
    const connection = mysql.createConnection({
        host: process.env.database_host,
        user: process.env.database_uid,
        password: process.env.database_pwd,
        database: process.env.database_name
    });

    try {
        // Connect to the database
        connection.connect((err) => {
            if (err) throw err;
            console.log('Connected to the database!');
        });

        var options = {
            host: 'https://jsonplaceholder.typicode.com/todos/32',
            path: '/'
        }

        const req = http.request(options, (res) => {
            console.log(res)
            const query = 'SELECT * FROM ToDoItems';
            // Execute the query
            connection.query(query, (err, results) => {
                if (err) throw err;
                console.log(results);
            });
            // Close the connection
            connection.end();
        });
    } catch (e) {
        console.log(e)
    }
    return true;
};