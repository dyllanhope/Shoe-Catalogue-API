var dropDownTemplateSource = document.querySelector('.dropDownTemplate').innerHTML;
var basketTemplateSource = document.querySelector('.basketListTemplate').innerHTML;
var filterTemplateSource = document.querySelector('.filteredListTemplate').innerHTML;
// drop down menues
var colourDropDown = document.querySelector('#colourDrop');
var brandDropDown = document.querySelector('#brandDrop');
var sizeDropDown = document.querySelector('#sizeDrop');
// data for templates
var colourData = document.querySelector('.colourData');
var brandData = document.querySelector('.brandData');
var sizeData = document.querySelector('.sizeData');
var listData = document.querySelector('.listData');
var filterData = document.querySelector('.filterData');
// buttons
var addBtn = document.querySelector('.addButton');
var clearBtn = document.querySelector('.clearButton');
var checkoutBtn = document.querySelector('.checkoutButton');
var searchBtn = document.querySelector('.searchButton');
var recordEditor = document.querySelector('.recordUpdate');
var showEditor = document.querySelector('.showRecordEditor');
var updateBtn = document.querySelector('.updateRecords');
var hideBtn = document.querySelector('.hideButton');
// inputs for updating
var colourNew = document.querySelector('.colourUp');
var brandNew = document.querySelector('.brandUp');
var priceNew = document.querySelector('.priceUp');
var sizeNew = document.querySelector('.sizeUp');
var stockNew = document.querySelector('.stockUp');
// displays
var dispTotal = document.querySelector('.totalText');
var total = document.querySelector('#total');
var messageField = document.querySelector('#messageRecord');
var displayField = document.querySelector('#display');
// template compilations
var basketTemplate = Handlebars.compile(basketTemplateSource);
var dropDownTemplate = Handlebars.compile(dropDownTemplateSource);
var filterTemplate = Handlebars.compile(filterTemplateSource);

var shoeInstance = ShoeCatalogManager(records);

window.onload = function () {
    buildDropDowns();
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

    buildDropDowns();
    filterData.innerHTML = '';
});

hideBtn.addEventListener('click', function () {
    recordEditor.style.display = 'none';

    colourNew.value = '';
    brandNew.value = '';
    priceNew.value = '';
    sizeNew.value = '';
    stockNew.value = '';
    messageField.innerHTML = '';
});
showEditor.addEventListener('click', function () {
    recordEditor.style.display = 'unset';

    shoeInstance.newStockCount();
});

searchBtn.addEventListener('click', function () {
    displayFilter();
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

function buildDropDowns () {
    var colourOptions = { list: shoeInstance.lists('colour') };
    var colourHTML = dropDownTemplate(colourOptions);
    colourData.innerHTML = colourHTML;

    var brandOptions = { list: shoeInstance.lists('brand') };
    var brandHTML = dropDownTemplate(brandOptions);
    brandData.innerHTML = brandHTML;

    var sizeOptions = { list: shoeInstance.lists('size') };
    var sizeHTML = dropDownTemplate(sizeOptions);
    sizeData.innerHTML = sizeHTML;
}
function displayFilter () {
    var filterOptions = { filter: shoeInstance.createString(colourDropDown.value, brandDropDown.value, sizeDropDown.value) };
    var filterHTML = filterTemplate(filterOptions);
    filterData.innerHTML = filterHTML;
}
