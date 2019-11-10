// my connection to the database
const mysql = require('promise-mysql');

module.exports = {
    queryFunction
}

let db;
let dbConnection = mysql.createPool({
        connectionLimit: 100,
        host: process.env.MYSQL_URL,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
    })
    .then((c) => {
        db = c;
    })
    .catch((e) => {
        console.error(e);
    });

async function queryFunction(str) {
    await dbConnection;
    return db.query(str);
}