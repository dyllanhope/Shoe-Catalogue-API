module.exports = function () {
    const reloadData = (data) => {
        if (data) {
            return 'success';
        };
    };

    const allType = () => {
        const returnData = [
            { id: 1, colour: 'White', brand: 'New balance', price: 1000, size: 10, item_stock: 3 },
            { id: 2, colour: 'Red', brand: 'Nike', price: 400, size: 10, item_stock: 4 },
            { id: 3, colour: 'Blue', brand: 'Adidas', price: 600, size: 9, item_stock: 1 }
        ];
        return returnData;
    };

    const filterColour = (colour) => {
        if (colour === 'Red') {
            const returnData = [
                { id: 1, colour: 'Red', brand: 'New balance', price: 1000, size: 10, item_stock: 3 },
                { id: 2, colour: 'Red', brand: 'Nike', price: 400, size: 10, item_stock: 4 },
                { id: 3, colour: 'Red', brand: 'Adidas', price: 600, size: 9, item_stock: 1 }
            ];
            return returnData;
        };
    };

    const colourBrand = () => {
        const returnData = [
            {
                id: 47,
                colour: 'White',
                brand: 'New balance',
                price: 950,
                size: 10,
                item_stock: 2
            }
        ];
        return returnData;
    };

    const colourSize = (colour, size) => {
        if (colour === 'Black' && size === '11') {
            const returnData = [
                { id: 1, colour: 'Black', brand: 'New balance', price: 1000, size: 11, item_stock: 3 },
                { id: 2, colour: 'Black', brand: 'Nike', price: 400, size: 11, item_stock: 4 },
                { id: 3, colour: 'Black', brand: 'Adidas', price: 600, size: 11, item_stock: 1 }
            ];
            return returnData;
        };
    };

    const filterBrand = (brand) => {
        if (brand === 'Nike') {
            const returnData = [
                { id: 1, colour: 'White', brand: 'Nike', price: 1000, size: 10, item_stock: 3 },
                { id: 2, colour: 'Red', brand: 'Nike', price: 400, size: 10, item_stock: 4 },
                { id: 3, colour: 'Blue', brand: 'Nike', price: 600, size: 9, item_stock: 1 }
            ];
            return returnData;
        }
    };

    const filterSize = (size) => {
        if (size === '9') {
            const returnData = [
                { id: 1, colour: 'White', brand: 'New balance', price: 1000, size: 9, item_stock: 3 },
                { id: 2, colour: 'Red', brand: 'Nike', price: 400, size: 9, item_stock: 4 },
                { id: 3, colour: 'Blue', brand: 'Adidas', price: 600, size: 9, item_stock: 1 }
            ];
            return returnData;
        }
    };

    const brandSize = (brand, size) => {
        if (brand === 'New Balance' && size === '10') {
            const returnData = [
                { id: 1, colour: 'White', brand: 'New balance', price: 1000, size: 10, item_stock: 3 },
                { id: 2, colour: 'Red', brand: 'New balance', price: 400, size: 10, item_stock: 4 },
                { id: 3, colour: 'Blue', brand: 'New balance', price: 600, size: 10, item_stock: 1 }
            ];
            return returnData;
        };
    };

    const filterByAll = (colour, brand, size) => {
        if (colour === 'White' && brand === 'Vans' && size === '9') {
            const returnData = [
                { id: 1, colour: 'White', brand: 'Vans', price: 1000, size: 9, item_stock: 3 }
            ];
            return returnData;
        };
    };

    const updateShoeStock = (id) => {
        if (id === '48') {
            return 'success';
        }
    };

    const returnItems = (items) => {
        if (Number(items.size) === 10 && items.colour === 'Black' && items.brand === 'Nike' && Number(items.qty === 1) && Number(items.cost === 0)) {
            return 'success';
        };
    };

    const addNewShoe = (shoeData) => {
        if (shoeData.colour === 'Red' && shoeData.brand === 'Vans' && shoeData.price === 400 && shoeData.size === 10 && shoeData.stock === 4) {
            return 'success';
        }
    };

    const updateBasket = (items) => {
        if (items[0].size === 8 && items[0].colour === 'Blue' && items[0].brand === 'Nike' && items[0].qty === 4 && items[0].cost === 1600) {
            return 'success';
        }
    };

    const basket = () => {
        return [{
            id: 47,
            colour: 'White',
            brand: 'New balance',
            price: 950,
            size: 10,
            item_stock: 2,
            image: 'https://www.newbalance.co.za/media/product/fe3/997-classic-running-cw997hda-d11.png'
        },
        {
            id: 48,
            colour: 'White',
            brand: 'New balance',
            price: 950,
            size: 11,
            item_stock: 4,
            image: 'https://www.newbalance.co.za/media/product/fe3/997-classic-running-cw997hda-d11.png'
        }];
    };

    const displayByID = (id) => {
        if (id === 48) {
            return [{
                id: 48,
                colour: 'White',
                brand: 'New balance',
                price: 950,
                size: 11,
                item_stock: 4,
                image: 'https://www.newbalance.co.za/media/product/fe3/997-classic-running-cw997hda-d11.png'
            }];
        } else {
            return [{
                id: 46,
                colour: 'White',
                brand: 'New balance',
                price: 950,
                size: 9,
                item_stock: 5,
                image: 'https://www.newbalance.co.za/media/product/fe3/997-classic-running-cw997hda-d11.png'
            }];
        }
    };

    return {
        reloadData,
        allType,
        filterColour,
        colourBrand,
        colourSize,
        filterBrand,
        filterSize,
        brandSize,
        filterByAll,
        updateShoeStock,
        returnItems,
        addNewShoe,
        updateBasket,
        basket,
        displayByID
    };
};
