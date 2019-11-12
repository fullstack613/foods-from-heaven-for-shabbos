// this registration code file is used to push into db and check validity against db

const dbConnection = require("./dbConnection.js");

module.exports = {
    register,
    login
};

async function register(req, res) {

    let users = await dbConnection.queryFunction("select * from users");

    // console.log(users);

    for (let u of users) {
        if (req.body.userName === u.user_name) { // checking new userName against the entire array of users in the db at present time
            return res.status(500).send("User name ALREADY in use ... try a different username");
        }
    }

    // if username is unique (not in db) .. code, below, will insert iy"H new user (with ALL info from registration)

    await dbConnection.queryFunction(`insert into users (donor, family, first_name, last_name, user_name, password, size_of_family, email, home_phone, cell_phone, address, special_requests) 
    values("${req.body.donor}" , "${req.body.family}" , "${req.body.firstName}" , "${req.body.lastName}" , "${req.body.userName}" , "${req.body.password}" , "${req.body.familySize}" , "${req.body.email}" , "${req.body.homePhone}" , "${req.body.cellPhone}" , "${req.body.address}" , "${req.body.specialRequests}")`);
    res.send("Great - you are registered ... welcome to the world of ")
};


async function login(req, res) {

    let users = await dbConnection.queryFunction("select * from users"); // receive users from db

    // let activeUser = req.body; // post info for current user
    for (let u of users) {
        if (req.body.userName === u.user_name && req.body.password === u.password) {
            return res.status(200).send("WELCOME to you: " + u.first_name + " " +
                u.last_name + "  [username: " + req.body.userName + "  ] !!");
        }
    }

    return res.status(500).send("SORRY - try again as your user name and password do not match.");
}