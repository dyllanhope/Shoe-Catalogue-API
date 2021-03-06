const ShoeCatalogManager = (basketData) => {
    var basketList = basketData || [];
    var total = 0.00;

    const createDisplayString = (loadData, colour, brand, size) => {
        var chosenItems = '';
        var filteredItem = [];

        if (!colour.startsWith('Select')) {
            chosenItems += ('colour,');
        }
        if (!brand.startsWith('Select')) {
            chosenItems += ('brand,');
        }
        if (!size.startsWith('Select')) {
            chosenItems += ('size');
        }

        if (chosenItems !== 'colour,brand,size') {
            var data = buildDataForDisplay(chosenItems, loadData, colour, brand);
            for (var k = 0; k < data.length; k++) {
                var categoryInfo = Object.keys(data[k]);
                var availItems = categoryInfo[1];
                var displaySizes = data[k][availItems];
                if (displaySizes.length < 1) {
                    displaySizes = 'None in stock';
                }
                switch (chosenItems) {
                case 'colour,':
                    filteredItem.push({ id: data[k].id, Avail_item: availItems, Avail_sizes: displaySizes, price: Number(data[k].price).toFixed(2), image: data[k].image });
                    break;
                case 'brand,':
                    filteredItem.push({ id: data[k].id, Avail_item: availItems, Avail_sizes: displaySizes, price: Number(data[k].price).toFixed(2), image: data[k].image });
                    break;
                case 'colour,brand,':
                    filteredItem.push({ id: data[k].id, Avail_item: availItems, Avail_sizes: displaySizes, price: Number(data[k].price).toFixed(2), image: data[k].image });
                    break;
                case 'size':
                    filteredItem.push({ id: data[k].id, Avail_item: loadData[k].colour + ' ' + loadData[k].brand, Avail_sizes: displaySizes, price: Number(loadData[k].price).toFixed(2), image: data[k].image });
                    break;
                case 'colour,size':
                    filteredItem.push({ id: data[k].id, Avail_item: loadData[k].colour + ' ' + loadData[k].brand, Avail_sizes: displaySizes, price: Number(loadData[k].price).toFixed(2), image: data[k].image });
                    break;
                case 'brand,size':
                    filteredItem.push({ id: data[k].id, Avail_item: loadData[k].colour + ' ' + loadData[k].brand, Avail_sizes: displaySizes, price: Number(loadData[k].price).toFixed(2), image: data[k].image });
                    break;
                }
            }
        } else {
            const item = loadData[0];
            if (item.item_stock) {
                filteredItem.push({ stock: item.item_stock, colour: colour, brand: brand, size: size, price: Number(item.price).toFixed(2), image: item.image });
            } else {
                filteredItem.push({ stock: 0, colour: colour, brand: brand, size: size, price: Number(item.price).toFixed(2), image: item.image });
            }
        }
        return filteredItem;
    };

    const buildDataForDisplay = (chosenItems, loadData, colour, brand) => {
        var category;

        var data = [];
        if (chosenItems === 'colour,') {
            category = 'brand';
        } else if (chosenItems === 'brand,') {
            category = 'colour';
        } else if (chosenItems === 'colour,brand,') {
            category = 'both';
        } else if (chosenItems === 'size') {
            category = 'size';
        } else if (chosenItems === 'colour,size') {
            category = 'colour size';
        } else if (chosenItems === 'brand,size') {
            category = 'brand size';
        };
        if (category === 'both') {
            var sizeList = '';
            var productName = colour + ' ' + brand;
            for (var i = 0; i < loadData.length; i++) {
                sizeList += loadData[i].size + '(Qty: ' + loadData[i].item_stock + ') ';
            };
            data.push({ id: loadData[0].id, [productName]: sizeList, price: loadData[0].price, image: loadData[0].image });
        } else if (category === 'colour' || category === 'brand') {
            for (var x = 0; x < loadData.length; x++) {
                sizeList = '';
                var product = loadData[x][category];

                for (var y = 0; y < loadData.length; y++) {
                    if (product === loadData[y][category]) {
                        sizeList += loadData[y].size + '(Qty: ' + loadData[y].item_stock + ') ';
                        if (sizeList.startsWith('undefined')) {
                            sizeList = sizeList.substring(9);
                        };
                    };
                };
                var send = { id: loadData[x].id, [product]: sizeList, price: loadData[x].price, image: loadData[x].image };
                var exists = false;
                for (var z = 0; z < data.length; z++) {
                    var list = Object.keys(data[z]);
                    if (product === list[1]) {
                        exists = true;
                    };
                };
                if (exists === false) {
                    data.push(send);
                };
            };
        } else if (category.endsWith('size')) {
            for (var l = 0; l < loadData.length; l++) {
                if (category.startsWith('colour')) {
                    productName = loadData[l].brand;
                } else if (category.startsWith('brand')) {
                    productName = loadData[l].colour;
                } else {
                    productName = loadData[l].colour + ' ' + loadData[l].brand;
                };
                data.push({ id: loadData[l].id, [productName]: loadData[l].item_stock, price: loadData[l].price, image: loadData[l].image });
            };
        };
        return data;
    };

    const createBasketItems = (loadData, colourP, brandP, sizeP, priceP, id) => {
        if (loadData) {
            if (colourP && brandP && sizeP) {
                if (!colourP.startsWith('Select') &&
                    !brandP.startsWith('Select') &&
                    !sizeP.startsWith('Select')) {
                    var currentShoe = { size: Number(sizeP), colour: colourP, brand: brandP, qty: 1, cost: 0 };

                    var existingShoeLoc = getExistingShoeLoc(currentShoe);
                    var dataIndex = getStockLoc(loadData, currentShoe);

                    if (existingShoeLoc > -1) {
                        if (loadData[dataIndex].item_stock > 0) {
                            basketList[existingShoeLoc].qty++;
                            basketList[existingShoeLoc].cost += loadData[dataIndex].price;
                        }
                    } else if (loadData[dataIndex].item_stock > 0) {
                        currentShoe.cost = loadData[dataIndex].price;
                        currentShoe.id = loadData[dataIndex].id;
                        basketList.push(currentShoe);
                    }
                }
            }
        } else {
            currentShoe = { size: Number(sizeP), colour: colourP, brand: brandP, qty: 1, cost: 0 };
            let found = false;
            if (basketList.length > 0) {
                let x;
                for (x in basketList) {
                    if (basketList[x].size === sizeP && basketList[x].colour === colourP && basketList[x].brand === brandP) {
                        found = true;
                        basketList[x].qty++;
                        basketList[x].cost += priceP;
                    }
                };
            }

            if (!found) {
                currentShoe.cost = priceP;
                currentShoe.id = id;
                basketList.push(currentShoe);
            } else {
                found = false;
            }
        }
    };
    const basket = () => { return basketList; };

    const getStockLoc = (loadData, shoeData) => {
        var coords;
        for (var x = 0; x < loadData.length; x++) {
            if (loadData[x].colour === shoeData.colour &&
                loadData[x].brand === shoeData.brand &&
                loadData[x].size === shoeData.size) {
                coords = x;
                return coords;
            }
        }
        coords = -1;
        return coords;
    };

    const getExistingShoeLoc = (shoeData) => {
        for (var x = 0; x < basketList.length; x++) {
            if (basketList[x].size === shoeData.size &&
                basketList[x].colour === shoeData.colour &&
                basketList[x].brand === shoeData.brand) {
                return x;
            }
        }
        return -1;
    };

    const newBasket = (data) => { basketList = data; };

    const clearShoppingBasket = () => {
        total = 0.00;
        basketList = [];
    };

    const resetBasket = () => {
        if (!basketList || !basketList.length) {
            return 'You have no items in your basket';
        } else {
            basketList = [];
            total = 0.00;
            return 'Items checked out successfully';
        }
    };
    const displayTotal = () => {
        total = 0;
        let item;
        for (item of basketList) {
            total += item.cost;
        };
        return total.toFixed(2);
    };
    const displayBasketList = () => {
        return basketList;
    };

    return {
        createString: createDisplayString,
        buildBasket: createBasketItems,
        clear: clearShoppingBasket,
        checkout: resetBasket,
        total: displayTotal,
        showList: displayBasketList,
        find: getStockLoc,
        basket,
        newBasket
    };
};
