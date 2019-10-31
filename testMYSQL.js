// my connection to the database
const mysql = require('promise-mysql');
let db;

mysql.createPool({
        connectionLimit: 100,
        host: "localhost",
        user: "root",
        password: "beitar",
        database: "shabbos_food_platform"
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