// my connection to the database
const mysql = require('promise-mysql');
let db;

mysql.createPool({
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

function returnUser() {
    console.log(users);
}
module.exports = async function (req, res) {
    let promise = db.query("select * from users");
    let users = await promise;
    res.json(users);
}