// Importing The Dependencies of the App
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const getWeather = require('./src/weather');

// Initialize The App Instance of Express
const app = express();

// Creating The Directories Path of The (Views, Partials, Public).
const VIEWS_DIRECTORY_PATH = path.join(__dirname, "./templates/views");
const PARTIALS_DIRECTORY_PATH = path.join(__dirname, './templates/partials');
const PUBLIC_DIRECTORY_PATH = path.join(__dirname, './public');

// Setting The View Engine & Directory, Registering hbs Partials and use Express Static Middleware
app.set('view engine', 'hbs');
app.set('views', VIEWS_DIRECTORY_PATH);

hbs.registerPartials(PARTIALS_DIRECTORY_PATH);

app.use(express.static(PUBLIC_DIRECTORY_PATH));

/*
    Setting The Routes of The Site, Later on We'll Separate its in Module
*/

// The Home Page Route
app.get('/', (req, res) => {
    res.render('index', {
        title: "Home Page",
        msg: "Created This Site to Check Your Weather Anywhere in the World"
    });
});

// The Help Page Route
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        msg: 'We Can Help You By Providing You some Instructions Here'
    });
});

// 404 Page For "/help/any page" (Nested 404) For Learning & Testing Purposes
app.get('/help/*', (req, res) => {
    res.render('page_not_found', {
        title: "User Side Error Page",
        msg: 'You Visited a Page that Doesn\'t Exist'
    });
});

// The About Page Route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        msg: 'a Simple Page to Provide Info About The Author',
        name: 'Andrew Mead',
        job: 'Web Developer & Instructor',
        age: 28,
        website: 'https://mead.io/'
    });
});

// Weather Page Route For Current Weather Providing
app.get('/weather', (req, res) => {

    if (!req.query.city) {
        return res.send({
            error: "You Have to Provide a City Location to Get The Weather"
        });
    }
    else {
        getWeather(req.query.city).then(weather => {
            return res.send({
                weather
            })
        });
    };

});

// The Main 404 Page Route
app.get('*', (req, res) => {
    res.render('page_not_found', {
        title: 'User Side Error Page',
        msg: 'You Visited a Page that Doesn\'t Exist'
    });
});

// Launch The Server Up and Make it Listen to The incoming Requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("The Server is Up Now");
    console.log(`The Server is Running on Port ${port}`);
});
