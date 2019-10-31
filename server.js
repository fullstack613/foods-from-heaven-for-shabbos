const express = require('express');
const cookieParser = require('cookie-parser');
const registration = require('./registration.js');
const app = express();
const port = process.env.PORT || 80;
const testMYSQL = require('./testMYSQL');

app.use(cookieParser());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile('./pages/home.html', {
    root: __dirname
}));

app.get('/test', (req, res) => {
    return testMYSQL(req, res);
});

app.get('/registration', (req, res) => res.sendFile('./pages/Registration.html', {
    root: __dirname
}));
app.get('/login', (req, res) => res.sendFile('./pages/login.html', {
    root: __dirname
}));
app.get('/about', (req, res) => res.sendFile('./pages/about.html', {
    root: __dirname
}));

app.post('/registration/register', (req, res) => {
    return registration.register(req, res);
});
app.post('/registration/login', (req, res) => {
    return registration.login(req, res);
});


app.listen(port, () => console.log('Example app listening on port ' + port));