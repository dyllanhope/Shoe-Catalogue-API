module.exports = function () {
    function reloadData (data) {
        if (data) {
            return 'success';
        };
    };

    function all () {
        return 'success';
    };

    function colour (colour) {
        if (colour === 'Red') {
            return 'success';
        };
    };

    function colourBrand (colour, brand) {
        if (colour === 'Blue' && brand === 'Adidas') {
            return 'success';
        };
    };

    function colourSize (colour, size) {
        if (colour === 'Black' && size === '11') {
            return 'success';
        };
    };

    function brand (brand) {
        if (brand === 'Nike') {
            return 'success';
        }
    };

    function size (size) {
        if (size === '9') {
            return 'success';
        }
    };

    function brandSize (brand, size) {
        if (brand === 'New Balance' && size === '10') {
            return 'success';
        };
    };

    function specific (colour, brand, size) {
        if (colour === 'White' && brand === 'Vans' && size === '9') {
            return 'success';
        }
    };

    function update (id) {
        if (id === '48') {
            return 'success';
        }
    };

    function returnItems (items) {
        if (Number(items.size) === 10 && items.colour === 'Black' && items.brand === 'Nike' && Number(items.qty === 1) && Number(items.cost === 0)) {
            return 'success';
        };
    };

    function add (shoeData) {
        if (shoeData.colour === 'Red' && shoeData.brand === 'Vans' && shoeData.price === 400 && shoeData.size === 10 && shoeData.stock === 4) {
            return 'success';
        }
    };

    return {
        reloadData,
        all,
        colour,
        colourBrand,
        colourSize,
        brand,
        size,
        brandSize,
        specific,
        update,
        returnItems,
        add
    };
};
