const path = require('path');

const express = require('express');

const defaultRoutes = require('./routes/default'); 
const restaurantRoutes = require('./routes/restaurants'); 

const app = express();

const port = 3000;

//view dynamically created content
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 

//access to static css, js files
app.use(express.static('public'));
//post data: look to incomming request and extract incomming data
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);

// error pages
app.use((req, res) => {
    res.status(404).render('404'); //client side error, requested URL was not found
})
app.use((error, req, res, next) => {
    res.status(500).render('500'); //server side error, request is valid but cannot be generated
})

app.listen(port, () => {});