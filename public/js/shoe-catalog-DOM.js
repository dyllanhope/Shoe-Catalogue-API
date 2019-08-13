/* eslint-disable no-undef */
const dropDownTemplateSource = document.querySelector('.dropDownTemplate').innerHTML;
const basketTemplateSource = document.querySelector('.basketListTemplate').innerHTML;
const filterTemplateSource = document.querySelector('.filteredListTemplate').innerHTML;
const diplayChosenShoe = document.querySelector('.diplayChosenShoe').innerHTML;
const homeTemplateSource = document.querySelector('.homeTemplate').innerHTML;
// displays

const displayField = document.querySelector('#display');
const filterDisplay = document.querySelector('.filterDisplay');

// template compilations
const basketTemplate = Handlebars.compile(basketTemplateSource);
const dropDownTemplate = Handlebars.compile(dropDownTemplateSource);
const filterTemplate = Handlebars.compile(filterTemplateSource);
const displayTemplate = Handlebars.compile(diplayChosenShoe);
const homeTemplate = Handlebars.compile(homeTemplateSource);

const shoeInstance = ShoeCatalogManager();
const shoeService = ShoeService();

window.onload = () => {
    window.location.href = '/#/home/';
};

window.onhashchange = () => {
    const hash = location.hash;
    const url = hash.split('/');
    const id = Number(url[2]);
    if (url[1] === 'home') {
        buildHomePage();
        basket();

        dropDownUpdate('colour');
        dropDownUpdate('brand');
        dropDownUpdate('size');
    } else if (url[1] === 'display') {
        buildShoeDisplay(id);
    } else if (url[1] === 'update') {
        updateShoeDisplay(id);
    };
};

Handlebars.registerHelper('isAllSelected', () => {
    if (!(colourDropDown.value).startsWith('Select') &&
        !(brandDropDown.value).startsWith('Select') &&
        !(sizeDropDown.value).startsWith('Select')) {
        return true;
    }
});
Handlebars.registerHelper('noStock', (stock) => {
    if (stock === 0) {
        return true;
    };
});

const buildHomePage = () => {
    const homeHTML = homeTemplate();
    filterDisplay.innerHTML = homeHTML;
    // menu dropdowns
    colourDropDown = document.querySelector('#colourDrop');
    brandDropDown = document.querySelector('#brandDrop');
    sizeDropDown = document.querySelector('#sizeDrop');
    // inputs for updating
    colourNew = document.querySelector('.colourUp');
    brandNew = document.querySelector('.brandUp');
    priceNew = document.querySelector('.priceUp');
    sizeNew = document.querySelector('.sizeUp');
    stockNew = document.querySelector('.stockUp');
    // buttons
    addBtn = document.querySelector('.addButton');
    clearBtn = document.querySelector('.clearButton');
    checkoutBtn = document.querySelector('.checkoutButton');
    searchBtn = document.querySelector('.searchButton');
    recordEditor = document.querySelector('.recordUpdate');
    showEditor = document.querySelector('.showRecordEditor');
    updateBtn = document.querySelector('.updateRecords');
    // data for templates
    colourData = document.querySelector('.colourData');
    brandData = document.querySelector('.brandData');
    sizeData = document.querySelector('.sizeData');
    listData = document.querySelector('.listData');
    filterData = document.querySelector('.filterData');
    // displays
    dispTotal = document.querySelector('.totalText');
    total = document.querySelector('#total');
    messageField = document.querySelector('#messageRecord');

    addBtn.addEventListener('click', () => {
        if (!(colourDropDown.value).startsWith('Select') && !(brandDropDown.value).startsWith('Select') && !(sizeDropDown.value).startsWith('Select')) {
            axios
                .get('/api/shoes')
                .then((results) => {
                    const response = results.data;
                    const shoes = response.shoes;

                    const colour = colourDropDown.value;
                    const brand = brandDropDown.value;
                    const size = sizeDropDown.value;

                    shoeInstance.buildBasket(shoes, colour, brand, size);
                    updateBasket();

                    buildBasket();

                    let id = 0;
                    for (let x = 0; x < shoes.length; x++) {
                        if (colour === shoes[x].colour && brand === shoes[x].brand && Number(size) === shoes[x].size) {
                            id = shoes[x].id;
                        };
                    };

                    updateStock(id);
                });
        } else {
            displayField.innerHTML = 'Please fill out all the above fields before attempting to add to your basket';
            setTimeout(() => {
                displayField.innerHTML = '';
            }, 3000);
        };
    });

    clearBtn.addEventListener('click', () => {
        returnItems(shoeInstance.basket());
        shoeInstance.newBasket([]);
        updateBasket();
    });

    checkoutBtn.addEventListener('click', () => {
        filterData.innerHTML = shoeInstance.checkout();
        shoeInstance.newBasket([]);
        updateBasket();
        listData.innerHTML = '';
        dispTotal.style.display = 'none';
        setTimeout(() => {
            filterData.innerHTML = '';
        }, 3000);
    });

    updateBtn.addEventListener('click', () => {
        if ((colourNew.value).trim() && (brandNew.value).trim() && priceNew.value && sizeNew.value && stockNew.value) {
            const shoeData = {
                colour: (colourNew.value).trim(),
                brand: (brandNew.value).trim(),
                price: Number(priceNew.value),
                size: Number(sizeNew.value),
                stock: Number(stockNew.value)
            };

            addShoe(shoeData);
            messageField.innerHTML = 'Item added successfully!';

            setTimeout(() => {
                messageField.innerHTML = '';
            }, 2000);
        } else {
            messageField.innerHTML = 'You have not filled every field correctly.';
        }
    });

    showEditor.addEventListener('click', () => {
        if (showEditor.innerHTML === 'Hide') {
            recordEditor.style.display = 'none';
            colourNew.value = '';
            brandNew.value = '';
            priceNew.value = '';
            sizeNew.value = '';
            stockNew.value = '';
            showEditor.innerHTML = 'Update records';
        } else if (showEditor.innerHTML === 'Update records') {
            recordEditor.style.display = 'unset';
            showEditor.innerHTML = 'Hide';
        };
    });

    searchBtn.addEventListener('click', () => {
        if ((colourDropDown.value).startsWith('Select') && (brandDropDown.value).startsWith('Select') && (sizeDropDown.value).startsWith('Select')) {
            filterData.innerHTML = '';
            displayField.innerHTML = 'Please select one or more of the above fields';

            setTimeout(() => {
                displayField.innerHTML = '';
            }, 3000);
        } else {
            if (!(colourDropDown.value).startsWith('Select') && !(brandDropDown.value).startsWith('Select') && !(sizeDropDown.value).startsWith('Select')) {
                buildDisplayColourBrandSize(colourDropDown.value, brandDropDown.value, sizeDropDown.value);
            } else if (!(colourDropDown.value).startsWith('Select') && !(brandDropDown.value).startsWith('Select')) {
                buildDisplayColourBrand(colourDropDown.value, brandDropDown.value);
            } else if (!(colourDropDown.value).startsWith('Select') && !(sizeDropDown.value).startsWith('Select')) {
                buildDisplayColourSize(colourDropDown.value, sizeDropDown.value);
            } else if (!(brandDropDown.value).startsWith('Select') && !(sizeDropDown.value).startsWith('Select')) {
                buildDisplayBrandSize(brandDropDown.value, sizeDropDown.value);
            } else if (!(colourDropDown.value).startsWith('Select')) {
                buildDisplayColour(colourDropDown.value);
            } else if (!(brandDropDown.value).startsWith('Select')) {
                buildDisplayBrand(brandDropDown.value);
            } else if (!(sizeDropDown.value).startsWith('Select')) {
                buildDisplaySize(sizeDropDown.value);
            }
        }
    });
};

const buildBasket = () => {
    const basketItems = { items: shoeInstance.basket() };
    const basketHTML = basketTemplate(basketItems);
    listData.innerHTML = basketHTML;
};

const buildDropDowns = (items, type) => {
    const list = [];
    for (var i = 0; i < items.length; i++) {
        list.push(items[i][type]);
    };
    list.sort((a, b) => { return a - b; });
    list.unshift('Select ' + type);
    if (type === 'colour') {
        const colourOptions = { list: list };
        const colourHTML = dropDownTemplate(colourOptions);
        colourData.innerHTML = colourHTML;
    } else if (type === 'brand') {
        const brandOptions = { list: list };
        const brandHTML = dropDownTemplate(brandOptions);
        brandData.innerHTML = brandHTML;
    } else if (type === 'size') {
        const sizeOptions = { list: list };
        const sizeHTML = dropDownTemplate(sizeOptions);
        sizeData.innerHTML = sizeHTML;
    };
};
const displayFilter = (shoes) => {
    var filterOptions = { filter: shoeInstance.createString(shoes, colourDropDown.value, brandDropDown.value, sizeDropDown.value) };
    var filterHTML = filterTemplate(filterOptions);
    filterData.innerHTML = filterHTML;
};

const buildShoeDisplay = (id) => {
    axios
        .get('/shoes/display/' + id)
        .then((results) => {
            const response = results.data;
            const shoeData = response.shoeData;
            const displayHTML = displayTemplate(shoeData);
            filterDisplay.innerHTML = displayHTML;
        });
};
const updateShoeDisplay = (id) => {
    axios
        .post('/shoes/update/display/' + id)
        .then(() => {
            window.location.href = '/#/display/' + id;
        });
};

const dropDownUpdate = (type) => {
    shoeService
        .all(type)
        .then((results) => {
            const response = results.data;
            const shoes = response.shoes;
            buildDropDowns(shoes, type);
        });
};

const buildDisplayColour = (colour) => {
    shoeService
        .colour(colour)
        .then((results) => {
            const response = results.data;
            const shoes = response.shoes;
            displayFilter(shoes);
        });
};

const buildDisplayBrand = (brand) => {
    shoeService
        .brand(brand)
        .then((results) => {
            const response = results.data;
            const shoes = response.shoes;
            displayFilter(shoes);
        });
};

const buildDisplaySize = (size) => {
    shoeService
        .size(size)
        .then((results) => {
            const response = results.data;
            const shoes = response.shoes;
            displayFilter(shoes);
        });
};
const buildDisplayBrandSize = (brand, size) => {
    shoeService
        .brandSize(brand, size)
        .then((results) => {
            const response = results.data;
            const shoes = response.shoes;
            displayFilter(shoes);
        });
};
const buildDisplayColourBrand = (colour, brand) => {
    shoeService
        .colourBrand(colour, brand)
        .then((results) => {
            const response = results.data;
            const shoes = response.shoes;
            displayFilter(shoes);
        });
};
const buildDisplayColourSize = (colour, size) => {
    shoeService
        .colourSize(colour, size)
        .then((results) => {
            const response = results.data;
            const shoes = response.shoes;
            displayFilter(shoes);
        });
};
const buildDisplayColourBrandSize = (colour, brand, size) => {
    shoeService
        .colourBrandSize(colour, brand, size)
        .then((results) => {
            const response = results.data;
            const shoes = response.shoes;
            if (!colourDropDown.value.startsWith('Select') && !brandDropDown.value.startsWith('Select') && !sizeDropDown.value.startsWith('Select')) {
                displayFilter(shoes);
            };
        });
};
const updateStock = (id) => {
    shoeService
        .update(id)
        .then(() => {
            dispTotal.style.display = 'unset';
            total.innerHTML = shoeInstance.total();
            buildDisplayColourBrandSize(colourDropDown.value, brandDropDown.value, sizeDropDown.value);
        })
        .catch((err) => {
            alert(err);
        });
};
const returnItems = (basketItems) => {
    shoeService
        .returnItems(basketItems)
        .then(() => {
            shoeInstance.clear();
            listData.innerHTML = '';
            dispTotal.style.display = 'none';
            buildDisplayColourBrandSize(colourDropDown.value, brandDropDown.value, sizeDropDown.value);
        })
        .catch((err) => {
            alert(err);
        });
};
const basket = () => {
    shoeService
        .displayBasket()
        .then((results) => {
            const response = results.data;
            const items = response.shoes;

            shoeInstance.newBasket(items);
            total.innerHTML = shoeInstance.total();

            buildBasket();
        })
        .catch((err) => {
            alert(err);
        });
};
const updateBasket = () => {
    const items = shoeInstance.basket();
    shoeService
        .updateBasket(items)
        .catch((err) => {
            alert(err);
        });
};
const addShoe = (shoeInfo) => {
    shoeService
        .add(shoeInfo)
        .then(() => {
            dropDownUpdate('colour');
            dropDownUpdate('brand');
            dropDownUpdate('size');

            filterData.innerHTML = '';
        })
        .catch((err) => {
            alert(err);
        });
};
