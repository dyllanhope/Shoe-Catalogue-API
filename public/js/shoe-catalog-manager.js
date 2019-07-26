function ShoeCatalogManager () {
    var basketList = [];
    var passed = false;
    var total = 0.00;
    var keepStock = 0;

    function createDisplayString (loadData, colour, brand, size) {
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
                var availItems = categoryInfo[0];
                var displaySizes = data[k][availItems];
                if (displaySizes.length < 1) {
                    displaySizes = 'None in stock';
                }
                switch (chosenItems) {
                case 'colour,':
                    filteredItem.push({ Avail_item: availItems, Avail_sizes: displaySizes, price: Number(data[k].price).toFixed(2) });
                    break;
                case 'brand,':
                    filteredItem.push({ Avail_item: availItems, Avail_sizes: displaySizes, price: Number(data[k].price).toFixed(2) });
                    break;
                case 'colour,brand,':
                    filteredItem.push({ Avail_item: availItems, Avail_sizes: displaySizes, price: Number(data[k].price).toFixed(2) });
                    break;
                case 'size':
                    filteredItem.push({ Avail_item: loadData[k].colour + ' ' + loadData[k].brand, Avail_sizes: displaySizes, price: Number(loadData[k].price).toFixed(2) });
                    break;
                case 'colour,size':
                    filteredItem.push({ Avail_item: loadData[k].colour + ' ' + loadData[k].brand, Avail_sizes: displaySizes, price: Number(loadData[k].price).toFixed(2) });
                    break;
                case 'brand,size':
                    filteredItem.push({ Avail_item: loadData[k].colour + ' ' + loadData[k].brand, Avail_sizes: displaySizes, price: Number(loadData[k].price).toFixed(2) });
                    break;
                }
            }
        } else {
            const item = loadData[0];
            if (item.item_stock) {
                filteredItem.push({ stock: item.item_stock, colour: colour, brand: brand, size: size, price: Number(item.price).toFixed(2) });
            } else {
                filteredItem.push({ stock: 0, colour: colour, brand: brand, size: size, price: Number(item.price).toFixed(2) });
            }
        }
        return filteredItem;
    }

    function buildDataForDisplay (chosenItems, loadData, colour, brand) {
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
            data.push({ [productName]: sizeList, price: loadData[0].price });
        } else if (category === 'colour' || category === 'brand') {
            for (var x = 0; x < loadData.length; x++) {
                sizeList = '';
                var test = loadData[x][category];

                for (var y = 0; y < loadData.length; y++) {
                    if (test === loadData[y][category]) {
                        sizeList += loadData[y].size + '(Qty: ' + loadData[y].item_stock + ') ';
                        if (sizeList.startsWith('undefined')) {
                            sizeList = sizeList.substring(9);
                        };
                    };
                };
                var send = { [test]: sizeList, price: loadData[x].price };
                var exists = false;
                for (var z = 0; z < data.length; z++) {
                    var list = Object.keys(data[z]);
                    if (test === list[0]) {
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
                data.push({ [productName]: loadData[l].item_stock, price: loadData[l].price });
            };
        };
        return data;
    };

    function buildLists (loadData, info) {
        if (info !== 'size') {
            var string = 'Select ' + info;
            var list = [string];
        } else {
            list = [];
        }
        var dataMap = {};
        for (var x = 0; x < loadData.length; x++) {
            if (dataMap[loadData[x][info]] === undefined) {
                dataMap[loadData[x][info]] = 0;
                list.push(loadData[x][info]);
            }
        };
        if (info === 'size') {
            list = list.sort((a, b) => a - b);
            list.unshift('Select size');
        };

        return list;
    };

    function createBasketItems (loadData, colourP, brandP, sizeP) {
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
                        total += loadData[dataIndex].price;
                    }
                } else if (loadData[dataIndex].item_stock > 0) {
                    currentShoe.cost = loadData[dataIndex].price;
                    total += loadData[dataIndex].price;
                    basketList.push(currentShoe);
                }
            }
        }
    };
    function basket () {
        return basketList;
    };

    function getStockLoc (loadData, shoeData) {
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
    }

    function getExistingShoeLoc (shoeData) {
        for (var x = 0; x < basketList.length; x++) {
            if (basketList[x].size === shoeData.size &&
                basketList[x].colour === shoeData.colour &&
                basketList[x].brand === shoeData.brand) {
                return x;
            }
        }
        return -1;
    }

    function clearShoppingBasket () {
        for (var x = 0; x < loadData.length; x++) {
            for (var y = 0; y < basketList.length; y++) {
                if (loadData[x].colour === basketList[y].colour &&
                    loadData[x].brand === basketList[y].brand &&
                    loadData[x].size === basketList[y].size) {
                    loadData[x].item_stock += basketList[y].qty;
                }
            }
        }
        total = 0.00;
        basketList = [];
    }

    function updateRecords (colour, brand, price, size, stock) {
        passed = false;
        if (colour && brand && price && size && stock) {
            var regexNumberCheck = /\d/;
            var numberCheckCol = regexNumberCheck.test(colour);
            var numberCheckBrand = regexNumberCheck.test(brand);
            if (numberCheckCol === false && numberCheckBrand === false) {
                passed = true;
                var upColour = colour.charAt(0).toUpperCase() + (colour.slice(1)).toLowerCase();
                var upBrand = brand.charAt(0).toUpperCase() + (brand.slice(1)).toLowerCase();
                var searchData = { size: Number(size), colour: upColour, brand: upBrand };
                var stockLoc = getStockLoc(searchData);
                console.log(stockLoc);
                if (stockLoc === -1) {
                    loadData.push({
                        id: Number(loadData.length + 1),
                        colour: upColour,
                        brand: upBrand,
                        price: Number(price),
                        size: Number(size),
                        item_stock: Number(stock)
                    });
                    keepStock += Number(stock);
                } else {
                    loadData[stockLoc].item_stock += Number(stock);
                    loadData[stockLoc].price += Number(price);
                    keepStock += Number(stock);
                };
            };
        };
    };

    function resetBasket () {
        if (!basketList || !basketList.length) {
            return 'You have no items in your basket';
        } else {
            basketList = [];
            total = 0.00;
            return 'Items checked out successfully';
        }
    }

    function displayPassing () {
        return passed;
    }
    function displayTotal () {
        return total.toFixed(2);
    }
    function displayBasketList () {
        return basketList;
    }
    function displayStock () {
        return keepStock;
    }
    function changeCurrentStockAdded () {
        keepStock = 0;
    }
    return {
        lists: buildLists,
        createString: createDisplayString,
        buildBasket: createBasketItems,
        clear: clearShoppingBasket,
        checkout: resetBasket,
        update: updateRecords,
        passing: displayPassing,
        total: displayTotal,
        showList: displayBasketList,
        stock: displayStock,
        newStockCount: changeCurrentStockAdded,
        find: getStockLoc,
        basket
    };
};
