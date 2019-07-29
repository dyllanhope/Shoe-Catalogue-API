'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const ShoeAPI = require('./public/Shoe-manager-api');
const data = require('../shoes_api/public/js/data');

const app = express();

const pg = require('pg');
const Pool = pg.Pool;

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/Shoes';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

const shoeManagerAPI = ShoeAPI(pool, data);

app.use(session({
    secret: 'yikes',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

const handlebarSetup = exphbs({
    partialsDir: './views',
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

shoeManagerAPI.load();
// routes
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/api/shoes', shoeManagerAPI.all);
app.get('/api/shoes/colour/:colour', shoeManagerAPI.colour);
app.get('/api/shoes/colour/:colour/brand/:brandname', shoeManagerAPI.colourBrand);
app.get('/api/shoes/colour/:colour/size/:size', shoeManagerAPI.colourSize);
app.get('/api/shoes/brand/:brandname', shoeManagerAPI.brand);
app.get('/api/shoes/size/:size', shoeManagerAPI.size);
app.get('/api/shoes/brand/:brandname/size/:size', shoeManagerAPI.brandSize);
app.get('/api/shoes/brand/:brandname/size/:size/colour/:colour', shoeManagerAPI.specific);
app.post('/api/shoes/sold/:id', shoeManagerAPI.update);
app.post('/api/shoes/clear', shoeManagerAPI.returnItems);
app.post('/api/shoes', shoeManagerAPI.addShoe);

const PORT = process.env.PORT || 3021;

app.listen(PORT, function () {
    console.log('app started at port: ' + PORT);
});
