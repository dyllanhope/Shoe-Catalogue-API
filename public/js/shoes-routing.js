/* eslint-disable no-undef */
const ShoeService = () => {
    const all = (type) => {
        return axios.get('/api/shoes/' + type);
    };

    const colour = (type) => { return axios.get('/api/shoes/colour/' + type); };

    const brand = (type) => { return axios.get('/api/shoes/brand/' + type); };

    const size = (type) => { return axios.get('/api/shoes/size/' + type); };

    const brandSize = (brand, size) => { return axios.get('/api/shoes/brand/' + brand + '/size/' + size); };

    const colourBrand = (colour, brand) => { return axios.get('/api/shoes/colour/' + colour + '/brand/' + brand); };

    const colourSize = (colour, size) => { return axios.get('/api/shoes/colour/' + colour + '/size/' + size); };

    const colourBrandSize = (colour, brand, size) => { return axios.get('/api/shoes/brand/' + brand + '/size/' + size + '/colour/' + colour); };

    const displayBasket = () => { return axios.get('/api/shoes/display/basket'); };

    const updateBasket = (items) => { return axios.post('/api/shoes/basket', items); };

    const update = (id) => { return axios.post('/api/shoes/sold/' + id); };

    const returnItems = (items) => { return axios.post('/api/shoes/clear', items); };

    const add = (shoeInfo) => { return axios.post('/api/shoes', shoeInfo); };

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
