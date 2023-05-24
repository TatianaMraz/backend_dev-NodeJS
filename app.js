const fs = require('fs'); //to open files
const path = require('path');
const express = require('express');
const app = express();

const port = 3000;

//view dynamically created content
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 

//access to static css, js files
app.use(express.static('public'));
//post data: look to incomming request and extract incomming data
app.use(express.urlencoded({ extended: false }));

//view dynamically created content
app.set('views', path.join(__dirname, 'views')); 

app.get('/', (req, res) => {
    res.render('index'); //render index.ejs and convert to index.html to be usable in browser
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/confirm', (req, res) => {
    res.render('confirm');
});

app.get('/recommend', (req, res) => {
    res.render('recommend');
});

// post form data
app.post('/recommend', (req, res) => {
    const restaurant = req.body;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    
    const fileData = fs.readFileSync(filePath); //read data from restaurants.json
    const storedRestaurants = JSON.parse(fileData); //parse data from array from restaurants.json
    
    storedRestaurants.push(restaurant); //push data from html form to array to restaurants.json
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants)); //save to restaurants.json
    
    res.redirect('/confirm'); //save data to confirm.html
});

app.get('/restaurants', (req, res) => {
    res.render('restaurants');
});


app.listen(port, () => {});