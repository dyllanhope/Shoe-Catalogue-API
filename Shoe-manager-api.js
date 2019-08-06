module.exports = function (shoeService) {
    const allType = async (req, res) => {
        try {
            const type = req.params.type;
            res.json({
                status: 'success',
                shoes: await shoeService.allType(type)
            });
        } catch (err) {
            returnError(res, err);
        };
    };

    const filterColour = async (req, res) => {
        try {
            const colour = req.params.colour;
            res.json({
                status: 'success',
                shoes: await shoeService.filterColour(colour)
            });
        } catch (err) {
            returnError(res, err);
        };
    };

    const colourBrand = async (req, res) => {
        try {
            const colour = req.params.colour;
            const brand = req.params.brandname;
            res.json({
                status: 'success',
                shoes: await shoeService.colourBrand(colour, brand)
            });
        } catch (err) {
            returnError(res, err);
        };
    };

    const colourSize = async (req, res) => {
        try {
            const colour = req.params.colour;
            const size = req.params.size;
            res.json({
                status: 'success',
                shoes: await shoeService.colourSize(colour, size)
            });
        } catch (err) {
            returnError(res, err);
        };
    };

    const filterBrand = async (req, res) => {
        try {
            const brand = req.params.brandname;
            res.json({
                status: 'success',
                shoes: await shoeService.filterBrand(brand)
            });
        } catch (err) {
            returnError(res, err);
        };
    };

    const filterSize = async (req, res) => {
        try {
            const size = req.params.size;
            res.json({
                status: 'success',
                shoes: await shoeService.filterSize(size)
            });
        } catch (err) {
            returnError(res, err);
        };
    };

    const brandSize = async (req, res) => {
        try {
            const brand = req.params.brandname;
            const size = req.params.size;
            res.json({
                status: 'success',
                shoes: await shoeService.brandSize(brand, size)
            });
        } catch (err) {
            returnError(res, err);
        };
    };

    const filterByAll = async (req, res) => {
        try {
            const brand = req.params.brandname;
            const size = req.params.size;
            const colour = req.params.colour;
            res.json({
                status: 'success',
                shoes: await shoeService.filterByAll(colour, brand, size)
            });
        } catch (err) {
            returnError(res, err);
        };
    };

    const basket = async (req, res) => {
        try {
            res.json({
                status: 'success',
                shoes: await shoeService.basket()
            });
        } catch (err) {
            returnError(res, err);
        };
    };

    const updateShoeStock = async (req, res) => {
        try {
            const id = req.params.id;
            await shoeService.updateShoeStock(id);

            res.json({
                status: 'success'
            });
        } catch (err) {
            returnError(res, err);
        };
    };

    const returnItems = async (req, res) => {
        try {
            const items = req.body;
            await shoeService.returnItems(items);

            res.json({
                status: 'success'
            });
        } catch (err) {
            returnError(res, err);
        };
    };

    const addShoe = async (req, res) => {
        try {
            const shoeData = req.body;
            shoeService.addNewShoe(shoeData);

            res.json({
                status: 'success'
            });
        } catch (err) {
            returnError(res, err);
        };
    };

    const sortSizes = (list) => {
        const sizeList = [];
        const sortedList = [];
        let item;
        for (item of list) {
            sizeList.push(item.size);
        };
        sizeList.sort(function (a, b) { return a - b; });
        let y;
        for (y of sizeList) {
            let x;
            for (x of list) {
                if (y === x.size) {
                    sortedList.push({ id: x.id, size: y, stock: x.stock });
                }
            }
        }
        return sortedList;
    };

    const display = async (req, res) => {
        const id = req.params.id;
        const shoes = await shoeService.displayByID(id);
        const colour = shoes[0].colour;
        const brand = shoes[0].brand;
        const shoeOptions = await shoeService.colourBrand(colour, brand);
        const basket = await shoeService.basket();
        let item;
        let total = 0;
        for (item of basket) {
            total += item.cost;
        }
        let sizeStock = [];
        let shoe;
        for (shoe of shoeOptions) {
            if (shoe.item_stock !== 0) {
                sizeStock.push({ id: shoe.id, size: shoe.size, stock: shoe.item_stock });
            }
        }
        sizeStock = sortSizes(sizeStock);
        res.render('shoe', {
            id,
            image: shoes[0].image,
            colour: shoes[0].colour,
            brand: shoes[0].brand,
            price: shoes[0].price,
            sizeStock,
            basket,
            total
        });
    };
    const updateDisplayShoes = async (req, res) => {
        const newList = [];
        let found = false;
        const id = req.params.id;
        const basket = await shoeService.basket();
        const shoe = await shoeService.displayByID(id);
        const currentShoe = { id: id, colour: shoe[0].colour, brand: shoe[0].brand, size: shoe[0].size, qty: 1, cost: shoe[0].price };
        let item;
        if (basket.length > 0) {
            for (item of basket) {
                if (item.id === Number(currentShoe.id)) {
                    currentShoe.qty += item.qty;
                    currentShoe.cost += item.cost;
                    newList.push(currentShoe);
                    found = true;
                } else {
                    newList.push(item);
                }
            };
        } else {
            newList.push(currentShoe);
            found = true;
        };
        if (!found) {
            newList.push(currentShoe);
        } else {
            found = false;
        };

        await shoeService.updateBasket(newList);
        await shoeService.updateShoeStock(id);

        res.redirect('/shoes/display/' + id);
    };

    const updateBasket = async (req, res) => {
        const items = req.body;
        await shoeService.updateBasket(items);
    };

    const returnError = (res, err) => {
        res.json({
            status: 'error',
            error: err.stack
        });
    };

    return {
        allType,
        filterColour,
        filterBrand,
        filterSize,
        colourBrand,
        colourSize,
        brandSize,
        filterByAll,
        updateShoeStock,
        returnItems,
        addShoe,
        display,
        updateDisplayShoes,
        updateBasket,
        basket
    };
};
