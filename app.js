const fs = require('fs'); //to open files
const path = require('path');
const express = require('express');
const uuid = require('uuid'); //uniqe ID generator
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
    restaurant.id = uuid.v4(); //for ID generator
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    
    const fileData = fs.readFileSync(filePath); //read data from restaurants.json
    const storedRestaurants = JSON.parse(fileData); //parse data from array from restaurants.json
    
    storedRestaurants.push(restaurant); //push data from html form to array to restaurants.json
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants)); //save to restaurants.json
    
    res.redirect('/confirm'); //save data to confirm.html
});

app.get('/restaurants', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath); //read data from restaurants.json
    const storedRestaurants = JSON.parse(fileData); //parse data from array from restaurants.json

    res.render('restaurants', { 
        numberOfRestaurants: storedRestaurants.length, //data from restaurant.json
        restaurants: storedRestaurants //data from restaurant.json
    });
});

//getting the child routes
app.get('/restaurants/:id', (req, res) => {
    const restaurantId = req.params.id;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    
    const fileData = fs.readFileSync(filePath); //read data from restaurants.json
    const storedRestaurants = JSON.parse(fileData); //parse data from array from restaurants.json
    
    //look for specific restaurant of the array of restaurants
    for (const restaurant of storedRestaurants){
        if (restaurant.id === restaurantId){
            return res.render('restaurant-detail', { 
                restaurant: restaurant
            });
        };
    };

    res.render('404');
});

app.use((req, res) => {
    res.render('404'); //client side error, requested URL was not found
})

app.use((error, req, res, next) => {
    res.render('500'); //server side error, request is valid but cannot be generated
})

app.listen(port, () => {});