module.exports = function () {
    function reloadData (data) {
        if (data) {
            return 'success';
        };
    };

    function all () {
        const returnData = [
            { id: 1, colour: 'White', brand: 'New balance', price: 1000, size: 10, item_stock: 3 },
            { id: 2, colour: 'Red', brand: 'Nike', price: 400, size: 10, item_stock: 4 },
            { id: 3, colour: 'Blue', brand: 'Adidas', price: 600, size: 9, item_stock: 1 }
        ];
        return returnData;
    };

    function colour (colour) {
        if (colour === 'Red') {
            const returnData = [
                { id: 1, colour: 'Red', brand: 'New balance', price: 1000, size: 10, item_stock: 3 },
                { id: 2, colour: 'Red', brand: 'Nike', price: 400, size: 10, item_stock: 4 },
                { id: 3, colour: 'Red', brand: 'Adidas', price: 600, size: 9, item_stock: 1 }
            ];
            return returnData;
        };
    };

    function colourBrand (colour, brand) {
        if (colour === 'Blue' && brand === 'Adidas') {
            const returnData = [
                { id: 3, colour: 'Blue', brand: 'Adidas', price: 600, size: 9, item_stock: 1 }
            ];
            return returnData;
        };
    };

    function colourSize (colour, size) {
        if (colour === 'Black' && size === '11') {
            const returnData = [
                { id: 1, colour: 'Black', brand: 'New balance', price: 1000, size: 11, item_stock: 3 },
                { id: 2, colour: 'Black', brand: 'Nike', price: 400, size: 11, item_stock: 4 },
                { id: 3, colour: 'Black', brand: 'Adidas', price: 600, size: 11, item_stock: 1 }
            ];
            return returnData;
        };
    };

    function brand (brand) {
        if (brand === 'Nike') {
            const returnData = [
                { id: 1, colour: 'White', brand: 'Nike', price: 1000, size: 10, item_stock: 3 },
                { id: 2, colour: 'Red', brand: 'Nike', price: 400, size: 10, item_stock: 4 },
                { id: 3, colour: 'Blue', brand: 'Nike', price: 600, size: 9, item_stock: 1 }
            ];
            return returnData;
        }
    };

    function size (size) {
        if (size === '9') {
            const returnData = [
                { id: 1, colour: 'White', brand: 'New balance', price: 1000, size: 9, item_stock: 3 },
                { id: 2, colour: 'Red', brand: 'Nike', price: 400, size: 9, item_stock: 4 },
                { id: 3, colour: 'Blue', brand: 'Adidas', price: 600, size: 9, item_stock: 1 }
            ];
            return returnData;
        }
    };

    function brandSize (brand, size) {
        if (brand === 'New Balance' && size === '10') {
            const returnData = [
                { id: 1, colour: 'White', brand: 'New balance', price: 1000, size: 10, item_stock: 3 },
                { id: 2, colour: 'Red', brand: 'New balance', price: 400, size: 10, item_stock: 4 },
                { id: 3, colour: 'Blue', brand: 'New balance', price: 600, size: 10, item_stock: 1 }
            ];
            return returnData;
        };
    };

    function specific (colour, brand, size) {
        if (colour === 'White' && brand === 'Vans' && size === '9') {
            const returnData = [
                { id: 1, colour: 'White', brand: 'Vans', price: 1000, size: 9, item_stock: 3 }
            ];
            return returnData;
        };
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
