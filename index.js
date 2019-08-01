'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const ShoeAPI = require('./Shoe-manager-api');
const data = require('./public/js/data');
const ShoeService = require('./shoes-service');
const AppRouting = require('./app-routing');

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

const shoeService = ShoeService(pool);
const shoeManagerAPI = ShoeAPI(shoeService);

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

if (process.env.RELOAD_DATA) {
    console.log('About to reload data');
    shoeService.reloadData(data);
} else {
    console.log('Data not reloaded');
};

AppRouting(shoeManagerAPI, app);

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('App started on port:', PORT);
});

module.exports = app;
