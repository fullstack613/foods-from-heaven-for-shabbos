module.exports = {
    register,
    login
};

let users = [];

function register(req, res) {
    let user = {
        userName: req.body.userName,
        password: req.body.password,
    }
    for (let user of users) {
        if (user.userName === req.body.userName) {
            return res.status(500).send("User name ALREADY in use ... try a different username");
        }
    }
    users.push(user);
    console.log(users);
    res.send("OK - you are in ... welcome to the world if registered users!")

    console.log("WELCOME OUR DEAR USER!")
}

function login(req, res) {
    for (let user of users) {
        if (user.userName === req.body.userName && user.password === req.body.password) {
            return res.send("WELCOME to you: " + user.userName);
        }
        return res.status(500).send("SORRY - try again as your user name and password do not match.");
    }

}