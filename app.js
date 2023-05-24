const path = require('path');
const express = require('express');
const app = express();

const port = 3000;

//access to static css, js files
app.use(express.static('public'));

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

app.get('/restaurants', (req, res) => {
    const htmlFilepath = path.join(__dirname, 'views', 'restaurants.html');
    res.sendFile(htmlFilepath);
});

app.listen(port, () => {});