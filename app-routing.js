module.exports = (shoeManagerAPI, app) => {
    app.get('/api/shoes', shoeManagerAPI.all);
    app.get('/api/shoes/colour/:colour', shoeManagerAPI.colour);
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
};
