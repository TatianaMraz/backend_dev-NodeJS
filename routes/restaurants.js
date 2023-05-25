const express = require('express');
const uuid = require('uuid'); //uniqe ID generator

const restaurantData = require('../utility/restaurant-data');
const { restart } = require('nodemon');
const router = express.Router();

router.get('/confirm', (req, res) => {
    res.render('confirm');
});

router.get('/recommend', (req, res) => {
    res.render('recommend');
});

// post form data
router.post('/recommend', (req, res) => {
    const restaurant = req.body;
    restaurant.id = uuid.v4(); //for ID generator
    const restaurants = restaurantData.getStoredRestaurants();   

    restaurants.push(restaurant); //push data from html form to array to restaurants.json
    
    restaurantData.storedRestaurants(restaurants);

    res.redirect('/confirm'); //save data to confirm.html
});


router.get('/restaurants', (req, res) => {
    let order = req.query.order; //check if URL has a query parameter (key=order)
    let nextOrder = 'desc';

    if (order !== 'asc' && order !== 'desc') {
        order = 'asc';
    } 

    if (order == 'desc') {
        nextOrder = 'asc';
    } 

    const storedRestaurants = restaurantData.getStoredRestaurants(); 
    
    // sort data based on the name
    storedRestaurants.sort((restaurantA, restaurantB) => {
        if ((order == 'asc' && restaurantA.name > restaurantB.name) || (order == 'desc' && restaurantB.name > restaurantA.name)) {
            return 1
        }

        return -1
    });

    res.render('restaurants', { 
        numberOfRestaurants: storedRestaurants.length, //data from restaurant.json
        restaurants: storedRestaurants, //data from restaurant.json
        nextOrder: nextOrder
    });
});

//getting the child routes
router.get('/restaurants/:id', (req, res) => {
    const restaurantId = req.params.id;
    const storedRestaurants = restaurantData.getStoredRestaurants();   
    
    //look for specific restaurant of the array of restaurants
    for (const restaurant of storedRestaurants){
        if (restaurant.id === restaurantId){
            return res.render('restaurant-detail', { 
                restaurant: restaurant
            });
        };
    };

    res.status(404).render('404');
});

module.exports = router;