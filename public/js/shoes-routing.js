/* eslint-disable no-undef */
function ShoeService () {
    function all (type) {
        return axios.get('/api/shoes/' + type);
    };

    function colour (type) {
        return axios.get('/api/shoes/colour/' + type);
    };

    function brand (type) {
        return axios.get('/api/shoes/brand/' + type);
    };

    function size (type) {
        return axios.get('/api/shoes/size/' + type);
    };

    function brandSize (brand, size) {
        return axios.get('/api/shoes/brand/' + brand + '/size/' + size);
    };

    function colourBrand (colour, brand) {
        return axios.get('/api/shoes/colour/' + colour + '/brand/' + brand);
    };

    function colourSize (colour, size) {
        return axios.get('/api/shoes/colour/' + colour + '/size/' + size);
    };

    function colourBrandSize (colour, brand, size) {
        return axios.get('/api/shoes/brand/' + brand + '/size/' + size + '/colour/' + colour);
    };

    function displayBasket () {
        return axios.get('/api/shoes/display/basket');
    };

    function updateBasket (items) {
        return axios.post('/api/shoes/basket', items);
    };

    function update (id) {
        return axios.post('/api/shoes/sold/' + id);
    };

    function returnItems (items) {
        return axios.post('/api/shoes/clear', items);
    };

    function add (shoeInfo) {
        return axios.post('/api/shoes', shoeInfo);
    };

    return {
        all,
        colour,
        brand,
        size,
        brandSize,
        colourBrand,
        colourSize,
        colourBrandSize,
        update,
        returnItems,
        add,
        updateBasket,
        displayBasket
    };
};
