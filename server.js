require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const registration = require('./registration.js');
const app = express();
const port = process.env.PORT || 80;
const testMYSQL = require('./testMYSQL.js');

app.set('view engine', 'ejs');

app.use(cookieParser());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.static('public'));

app.get('/userInfo/:id', (req, res) => {
    console.log(req.params.id);
    res.render('./pages/userInfo', {
        id: req.params.id,
        time: new Date()
    });
})

app.get('/', (req, res) => res.sendFile('./pages/home.html', {
    root: __dirname
}));

app.get('/test', (req, res) => {
    return testMYSQL(req, res);
});

app.get('/registrationDonor', (req, res) => res.sendFile('./pages/registrationDonor.html', {
    root: __dirname
}));
app.get('/registrationFamily', (req, res) => res.sendFile('./pages/registrationFamily.html', {
    root: __dirname
}));

app.get('/loginDonor', (req, res) => res.sendFile('./pages/loginDonor.html', {
    root: __dirname
}));
app.get('/loginFamily', (req, res) => res.sendFile('./pages/loginFamily.html', {
    root: __dirname
}));

app.get('/donations', (req, res) => res.sendFile('./pages/donations.html', {
    root: __dirname
}));
app.get('/requests', (req, res) => res.sendFile('./pages/requests.html', {
    root: __dirname
}));

app.get('/about', (req, res) => res.sendFile('./pages/about.html', {
    root: __dirname
}));
app.get('/contactUs', (req, res) => res.sendFile('./pages/contactUs.html', {
    root: __dirname
}));
app.get('/updateDetails', (req, res) => res.sendFile('./pages/updateDetails.html', {
    root: __dirname
}));


app.post('/donorRegistration/register', (req, res) => {
    return registration.register(req, res);
});
app.post('/familyRegistration/register', (req, res) => {
    return registration.register(req, res);
});

app.post('/donorRegistration/login', (req, res) => {
    return registration.login(req, res);
});
app.post('/familyRegistration/login', (req, res) => {
    return registration.login(req, res);
});


app.listen(port, () => console.log('Example app listening on port ' + port));