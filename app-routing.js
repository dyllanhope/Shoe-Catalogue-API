module.exports = (shoeManagerAPI, app) => {
    app.get('/shoes/display/:id', shoeManagerAPI.display);
    app.get('/api/shoes/:type', shoeManagerAPI.allType);
    app.get('/api/shoes/colour/:colour', shoeManagerAPI.filterColour);
    app.get('/api/shoes', shoeManagerAPI.allType);
    app.get('/api/shoes/colour/:colour/brand/:brandname', shoeManagerAPI.colourBrand);
    app.get('/api/shoes/colour/:colour/size/:size', shoeManagerAPI.colourSize);
    app.get('/api/shoes/brand/:brandname', shoeManagerAPI.filterBrand);
    app.get('/api/shoes/size/:size', shoeManagerAPI.filterSize);
    app.get('/api/shoes/brand/:brandname/size/:size', shoeManagerAPI.brandSize);
    app.get('/api/shoes/brand/:brandname/size/:size/colour/:colour', shoeManagerAPI.filterByAll);
    app.get('/api/shoes/display/basket', shoeManagerAPI.basket);
    app.post('/api/shoes/basket', shoeManagerAPI.updateBasket);
    app.post('/shoes/display/:id', shoeManagerAPI.updateDisplayShoes);
    app.post('/api/shoes/sold/:id', shoeManagerAPI.updateShoeStock);
    app.post('/api/shoes/clear', shoeManagerAPI.returnItems);
    app.post('/api/shoes', shoeManagerAPI.addShoe);
};
