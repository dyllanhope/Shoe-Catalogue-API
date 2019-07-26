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
const hideBtn = document.querySelector('.hideButton');
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

window.onload = function () {
    dropDownUpdate();
    recordEditor.style.display = 'none';
    dispTotal.style.display = 'none';
};
updateBtn.addEventListener('click', function () {
    shoeInstance.update(colourNew.value, brandNew.value, priceNew.value, sizeNew.value, stockNew.value);
    if (shoeInstance.passing() === true) {
        messageField.innerHTML = 'The record has been successfully added. Total stock added: ' + shoeInstance.stock();
    } else {
        messageField.innerHTML = 'You have not filled every field correctly.';
    }

    colourDropDown.innerHTML = '';
    brandDropDown.innerHTML = '';
    sizeDropDown.innerHTML = '';

    dropDownUpdate();
    filterData.innerHTML = '';
});

hideBtn.addEventListener('click', function () {
    recordEditor.style.display = 'none';

    colourNew.value = '';
    brandNew.value = '';
    priceNew.value = '';
    sizeNew.value = '';
    stockNew.value = '';
});
showEditor.addEventListener('click', function () {
    recordEditor.style.display = 'unset';

    shoeInstance.newStockCount();
});

searchBtn.addEventListener('click', function () {
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

addBtn.addEventListener('click', function () {
    var basketItems = { items: shoeInstance.buildBasket(colourDropDown.value, brandDropDown.value, sizeDropDown.value) };
    var basketHTML = basketTemplate(basketItems);
    listData.innerHTML = basketHTML;
    dispTotal.style.display = 'unset';
    total.innerHTML = shoeInstance.total();
    displayFilter();
});

clearBtn.addEventListener('click', function () {
    shoeInstance.clear();
    listData.innerHTML = '';
    dispTotal.style.display = 'none';
    displayFilter();
});

checkoutBtn.addEventListener('click', function () {
    filterData.innerHTML = shoeInstance.checkout();
    listData.innerHTML = '';
    dispTotal.style.display = 'none';
});

function buildDropDowns (items, type) {
    if (type === 'colour') {
        const colourOptions = { list: items };
        const colourHTML = dropDownTemplate(colourOptions);
        colourData.innerHTML = colourHTML;
    } else if (type === 'brand') {
        const brandOptions = { list: items };
        const brandHTML = dropDownTemplate(brandOptions);
        brandData.innerHTML = brandHTML;
    } else if (type === 'size') {
        const sizeOptions = { list: items };
        const sizeHTML = dropDownTemplate(sizeOptions);
        sizeData.innerHTML = sizeHTML;
    };
}
function displayFilter (shoes) {
    var filterOptions = { filter: shoeInstance.createString(shoes, colourDropDown.value, brandDropDown.value, sizeDropDown.value) };
    var filterHTML = filterTemplate(filterOptions);
    filterData.innerHTML = filterHTML;
};
function dropDownUpdate () {
    axios
        .get('/api/shoes')
        .then(function (results) {
            const response = results.data;
            const data = response.shoes;
            const shoes = data.rows;
            let items;
            let type;
            for (let i = 1; i <= 3; i++) {
                if (i === 1) {
                    type = 'colour';
                } else if (i === 2) {
                    type = 'brand';
                } else {
                    type = 'size';
                };
                items = shoeInstance.lists(shoes, type);
                buildDropDowns(items, type);
            };
        });
};

function buildDisplayColour (colour) {
    axios
        .get('/api/shoes/colour/' + colour)
        .then(function (results) {
            const response = results.data;
            const data = response.shoes;
            const shoes = data.rows;
            displayFilter(shoes);
        });
};

function buildDisplayBrand (brand) {
    axios
        .get('/api/shoes/brand/' + brand)
        .then(function (results) {
            const response = results.data;
            const data = response.shoes;
            const shoes = data.rows;
            displayFilter(shoes);
        });
};

function buildDisplaySize (size) {
    axios
        .get('/api/shoes/size/' + size)
        .then(function (results) {
            const response = results.data;
            const data = response.shoes;
            const shoes = data.rows;
            displayFilter(shoes);
        });
};
function buildDisplayBrandSize (brand, size) {
    axios
        .get('/api/shoes/brand/' + brand + '/size/' + size)
        .then(function (results) {
            const response = results.data;
            const data = response.shoes;
            const shoes = data.rows;
            displayFilter(shoes);
        });
};
function buildDisplayColourBrand (colour, brand) {
    axios
        .get('/api/shoes/colour/' + colour + '/brand/' + brand)
        .then(function (results) {
            const response = results.data;
            const data = response.shoes;
            const shoes = data.rows;
            displayFilter(shoes);
        });
};
function buildDisplayColourSize (colour, size) {
    axios
        .get('/api/shoes/colour/' + colour + '/size/' + size)
        .then(function (results) {
            const response = results.data;
            const data = response.shoes;
            const shoes = data.rows;
            displayFilter(shoes);
        });
};
function buildDisplayColourBrandSize (colour, brand, size) {
    axios
        .get('/api/shoes/brand/' + brand + '/size/' + size + '/colour/' + colour)
        .then(function (results) {
            const response = results.data;
            const data = response.shoes;
            const shoes = data.rows;
            displayFilter(shoes);
        });
};
