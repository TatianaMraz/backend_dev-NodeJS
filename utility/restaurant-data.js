const fs = require('fs'); //to open files
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

function getStoredRestaurants() {
    const fileData = fs.readFileSync(filePath); //read data from restaurants.json
    const storedRestaurants = JSON.parse(fileData); //parse data from array from restaurants.json

    return storedRestaurants;
};

function storeRestaurants(storableRestaurants) {
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants)); //save to restaurants.json
};

// export functions to be accessible to other files
module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    storedRestaurants: storeRestaurants
};