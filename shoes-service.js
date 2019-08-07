module.exports = (pool) => {
    const reloadData = async (data) => {
        await pool.query('DELETE FROM shoe_data');
        for (let x = 0; x < data.length; x++) {
            const input = [
                data[x].id,
                data[x].colour,
                data[x].brand,
                data[x].price,
                data[x].size,
                data[x].item_stock,
                data[x].image
            ];

            await pool.query('INSERT INTO shoe_data(id, colour, brand, price, size, item_stock, image) VALUES($1,$2,$3,$4,$5,$6,$7)', input);
        };
    };

    const allType = async (type) => {
        let result;

        if (type === 'colour') {
            result = await pool.query('SELECT DISTINCT colour FROM shoe_data');
        } else if (type === 'brand') {
            result = await pool.query('SELECT DISTINCT brand FROM shoe_data');
        } else if (type === 'size') {
            result = await pool.query('SELECT DISTINCT size FROM shoe_data');
        } else {
            result = await pool.query('SELECT * FROM shoe_data');
        }
        return result.rows;
    };

    const filterColour = async (colour) => {
        const result = await pool.query('SELECT * FROM shoe_data WHERE colour = $1', [colour]);
        return result.rows;
    };

    const colourBrand = async (colour, brand) => {
        const result = await pool.query('SELECT * FROM shoe_data WHERE brand = $1 AND colour = $2', [brand, colour]);
        return result.rows;
    };

    const colourSize = async (colour, size) => {
        const result = await pool.query('SELECT * FROM shoe_data WHERE size = $1 AND colour = $2', [size, colour]);
        return result.rows;
    };

    const filterBrand = async (brand) => {
        const result = await pool.query('SELECT * FROM shoe_data WHERE brand = $1', [brand]);
        return result.rows;
    };

    const filterSize = async (size) => {
        const result = await pool.query('SELECT * FROM shoe_data WHERE size = $1', [size]);
        return result.rows;
    };

    const brandSize = async (brand, size) => {
        const result = await pool.query('SELECT * FROM shoe_data WHERE brand = $1 AND size = $2', [brand, size]);
        return result.rows;
    };

    const filterByAll = async (colour, brand, size) => {
        const result = await pool.query('SELECT * FROM shoe_data WHERE brand = $1 AND size = $2 AND colour = $3', [brand, size, colour]);
        return result.rows;
    };

    const updateShoeStock = async (id) => {
        const result = await pool.query('SELECT id,colour,brand,size,item_stock FROM shoe_data WHERE id = $1', [id]);
        let stock = result.rows[0].item_stock;
        if (stock !== 0) {
            stock--;
        };
        await pool.query('UPDATE shoe_data SET item_stock = $2 WHERE id = $1', [id, stock]);
    };

    const returnItems = async (items) => {
        for (let i = 0; i < items.length; i++) {
            const id = items[i].id;
            const result = await pool.query('SELECT item_stock FROM shoe_data WHERE id = $1', [id]);
            let stock = result.rows[0].item_stock;
            stock += items[i].qty;

            await pool.query('UPDATE shoe_data SET item_stock = $2 WHERE id = $1', [id, stock]);
        };
    };

    const addNewShoe = async (shoeData) => {
        const numSpecialCharCheck = /[!@#$%^&*(),.?":{}|<>\d]/;
        if (shoeData.colour && shoeData.brand && shoeData.price && shoeData.size && shoeData.stock) {
            const colourTest = numSpecialCharCheck.test(shoeData.colour);
            const brandTest = numSpecialCharCheck.test(shoeData.brand);
            if (!colourTest && !brandTest) {
                shoeData.colour = (shoeData.colour).charAt(0).toUpperCase() + ((shoeData.colour).slice(1)).toLowerCase();
                shoeData.brand = (shoeData.brand).charAt(0).toUpperCase() + ((shoeData.brand).slice(1)).toLowerCase();
                const results = await pool.query('SELECT * FROM shoe_data WHERE colour = $1 AND brand = $2 AND size = $3', [shoeData.colour, shoeData.brand, shoeData.size]);
                if (results.rowCount === 1) {
                    const id = results.rows[0].id;
                    const stock = results.rows[0].item_stock + shoeData.stock;
                    await pool.query('UPDATE shoe_data SET item_stock = $1, price = $2 WHERE id = $3', [stock, shoeData.price, id]);
                } else {
                    const lengthSearch = await pool.query('SELECT COUNT (id) FROM shoe_data');
                    const id = Number(lengthSearch.rows[0].count) + 1;
                    const data = [
                        id,
                        shoeData.colour,
                        shoeData.brand,
                        shoeData.price,
                        shoeData.size,
                        shoeData.stock
                    ];
                    await pool.query('INSERT INTO shoe_data (id, colour, brand, price, size, item_stock) VALUES ($1,$2,$3,$4,$5,$6)', data);
                };
            };
        };
    };

    const displayByID = async (id) => {
        const result = await pool.query('SELECT * FROM shoe_data WHERE id = $1', [id]);
        return result.rows;
    };

    const updateBasket = async (items) => {
        await pool.query('DELETE FROM basket');
        let item;
        for (item of items) {
            const data = [
                item.id,
                item.colour,
                item.brand,
                item.size,
                item.qty,
                item.cost
            ];
            await pool.query('INSERT INTO basket (id, colour, brand, size, qty, cost) VALUES ($1,$2,$3,$4,$5,$6)', data);
        };
    };

    const basket = async () => {
        const results = await pool.query('SELECT * FROM basket');
        return results.rows;
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
        displayByID,
        updateBasket,
        basket
    };
};
