const fs = require('fs'); //to open files
const path = require('path');
const express = require('express');
const app = express();

const port = 3000;

//access to static css, js files
app.use(express.static('public'));
//post data: look to incomming request and extract incomming data
app.use(express.urlencoded({ extended: false }));

//view dynamically created content
app.set('views', path.join(__dirname, 'views')); 

app.get('/', (req, res) => {
    const htmlFilepath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(htmlFilepath);
});

app.get('/about', (req, res) => {
    const htmlFilepath = path.join(__dirname, 'views', 'about.html');
    res.sendFile(htmlFilepath);
});

app.get('/confirm', (req, res) => {
    const htmlFilepath = path.join(__dirname, 'views', 'confirm.html');
    res.sendFile(htmlFilepath);
});

app.get('/recommend', (req, res) => {
    const htmlFilepath = path.join(__dirname, 'views', 'recommend.html');
    res.sendFile(htmlFilepath);
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
    const htmlFilepath = path.join(__dirname, 'views', 'restaurants.html');
    res.sendFile(htmlFilepath);
});


app.listen(port, () => {});