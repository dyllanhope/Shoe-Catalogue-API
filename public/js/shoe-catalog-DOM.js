/* eslint-disable no-undef */
const dropDownTemplateSource = document.querySelector('.dropDownTemplate').innerHTML;
const basketTemplateSource = document.querySelector('.basketListTemplate').innerHTML;
const filterTemplateSource = document.querySelector('.filteredListTemplate').innerHTML;
// drop down menues
const colourDropDown = document.querySelector('#colourDrop');
const brandDropDown = document.querySelector('#brandDrop');
const sizeDropDown = document.querySelector('#sizeDrop');
// data for templates
const colourData = document.querySelector('.colourData');
const brandData = document.querySelector('.brandData');
const sizeData = document.querySelector('.sizeData');
const listData = document.querySelector('.listData');
const filterData = document.querySelector('.filterData');
// buttons
const addBtn = document.querySelector('.addButton');
const clearBtn = document.querySelector('.clearButton');
const checkoutBtn = document.querySelector('.checkoutButton');
const searchBtn = document.querySelector('.searchButton');
const recordEditor = document.querySelector('.recordUpdate');
const showEditor = document.querySelector('.showRecordEditor');
const updateBtn = document.querySelector('.updateRecords');
// inputs for updating
const colourNew = document.querySelector('.colourUp');
const brandNew = document.querySelector('.brandUp');
const priceNew = document.querySelector('.priceUp');
const sizeNew = document.querySelector('.sizeUp');
const stockNew = document.querySelector('.stockUp');
// displays
const dispTotal = document.querySelector('.totalText');
const total = document.querySelector('#total');
const messageField = document.querySelector('#messageRecord');
const displayField = document.querySelector('#display');
// template compilations
const basketTemplate = Handlebars.compile(basketTemplateSource);
const dropDownTemplate = Handlebars.compile(dropDownTemplateSource);
const filterTemplate = Handlebars.compile(filterTemplateSource);

const shoeInstance = ShoeCatalogManager();
const shoeService = ShoeService();

window.onload = function () {
    dropDownUpdate('colour');
    dropDownUpdate('brand');
    dropDownUpdate('size');

    recordEditor.style.display = 'none';
    dispTotal.style.display = 'none';
};

updateBtn.addEventListener('click', function () {
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

        setTimeout(function () {
            messageField.innerHTML = '';
        }, 2000);
    } else {
        messageField.innerHTML = 'You have not filled every field correctly.';
    }
});

showEditor.addEventListener('click', function () {
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

    shoeInstance.newStockCount();
});

searchBtn.addEventListener('click', function () {
    if ((colourDropDown.value).startsWith('Select') && (brandDropDown.value).startsWith('Select') && (sizeDropDown.value).startsWith('Select')) {
        filterData.innerHTML = '';
        displayField.innerHTML = 'Please select one or more of the above fields';

        setTimeout(function () {
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
Handlebars.registerHelper('isAllSelected', function () {
    if (!(colourDropDown.value).startsWith('Select') &&
        !(brandDropDown.value).startsWith('Select') &&
        !(sizeDropDown.value).startsWith('Select')) {
        return true;
    }
});
Handlebars.registerHelper('isSizeSelected', function () {
    if (!(sizeDropDown.value).startsWith('Select')) {
        return true;
    }
});
Handlebars.registerHelper('noStock', function (stock) {
    if (stock === 0) {
        return true;
    };
});

addBtn.addEventListener('click', function () {
    if (!(colourDropDown.value).startsWith('Select') && !(brandDropDown.value).startsWith('Select') && !(sizeDropDown.value).startsWith('Select')) {
        axios
            .get('/api/shoes')
            .then(function (results) {
                const response = results.data;
                const shoes = response.shoes;

                const colour = colourDropDown.value;
                const brand = brandDropDown.value;
                const size = sizeDropDown.value;

                shoeInstance.buildBasket(shoes, colour, brand, size);
                const basketItems = { items: shoeInstance.basket() };
                const basketHTML = basketTemplate(basketItems);
                listData.innerHTML = basketHTML;

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
        setTimeout(function () {
            displayField.innerHTML = '';
        }, 3000);
    };
});

clearBtn.addEventListener('click', function () {
    returnItems(shoeInstance.basket());
});

checkoutBtn.addEventListener('click', function () {
    filterData.innerHTML = shoeInstance.checkout();
    listData.innerHTML = '';
    dispTotal.style.display = 'none';
});

function buildDropDowns (items, type) {
    const list = [];
    for (var i = 0; i < items.length; i++) {
        list.push(items[i][type]);
    };
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
}
function displayFilter (shoes) {
    var filterOptions = { filter: shoeInstance.createString(shoes, colourDropDown.value, brandDropDown.value, sizeDropDown.value) };
    var filterHTML = filterTemplate(filterOptions);
    filterData.innerHTML = filterHTML;
};

function dropDownUpdate (type) {
    shoeService
        .all(type)
        .then(function (results) {
            const response = results.data;
            const shoes = response.shoes;
            buildDropDowns(shoes, type);
        });
};

function buildDisplayColour (colour) {
    shoeService
        .colour(colour)
        .then(function (results) {
            const response = results.data;
            const shoes = response.shoes;
            displayFilter(shoes);
        });
};

function buildDisplayBrand (brand) {
    shoeService
        .brand(brand)
        .then(function (results) {
            const response = results.data;
            const shoes = response.shoes;
            displayFilter(shoes);
        });
};

function buildDisplaySize (size) {
    shoeService
        .size(size)
        .then(function (results) {
            const response = results.data;
            const shoes = response.shoes;
            displayFilter(shoes);
        });
};
function buildDisplayBrandSize (brand, size) {
    shoeService
        .brandSize(brand, size)
        .then(function (results) {
            const response = results.data;
            const shoes = response.shoes;
            displayFilter(shoes);
        });
};
function buildDisplayColourBrand (colour, brand) {
    shoeService
        .colourBrand(colour, brand)
        .then(function (results) {
            const response = results.data;
            const shoes = response.shoes;
            displayFilter(shoes);
        });
};
function buildDisplayColourSize (colour, size) {
    shoeService
        .colourSize(colour, size)
        .then(function (results) {
            const response = results.data;
            const shoes = response.shoes;
            displayFilter(shoes);
        });
};
function buildDisplayColourBrandSize (colour, brand, size) {
    shoeService
        .colourBrandSize(colour, brand, size)
        .then(function (results) {
            const response = results.data;
            const shoes = response.shoes;
            displayFilter(shoes);
        });
};
function updateStock (id) {
    shoeService
        .update(id)
        .then(async function () {
            dispTotal.style.display = 'unset';
            total.innerHTML = shoeInstance.total();

            await buildDisplayColourBrandSize(colourDropDown.value, brandDropDown.value, sizeDropDown.value);
        })
        .catch(function (err) {
            alert(err);
        });
};
function returnItems (basketItems) {
    shoeService
        .returnItems(basketItems)
        .then(function () {
            shoeInstance.clear();
            listData.innerHTML = '';
            dispTotal.style.display = 'none';
            buildDisplayColourBrandSize(colourDropDown.value, brandDropDown.value, sizeDropDown.value);
        })
        .catch(function (err) {
            alert(err);
        });
};
function addShoe (shoeInfo) {
    shoeService
        .add(shoeInfo)
        .then(function () {
            dropDownUpdate('colour');
            dropDownUpdate('brand');
            dropDownUpdate('size');

            filterData.innerHTML = '';
        })
        .catch(function (err) {
            alert(err);
        });
};
