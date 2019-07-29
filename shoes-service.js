module.exports = function (pool) {
    async function reloadData (data) {
        await pool.query('DELETE FROM shoe_data');
        for (let x = 0; x < data.length; x++) {
            const input = [
                data[x].id,
                data[x].colour,
                data[x].brand,
                data[x].price,
                data[x].size,
                data[x].item_stock];

            await pool.query('INSERT INTO shoe_data(id, colour, brand, price, size, item_stock) VALUES($1,$2,$3,$4,$5,$6)', input);
        };
    };

    async function all () {
        const result = await pool.query('SELECT * FROM shoe_data');
        return result;
    };

    async function colour (colour) {
        const result = await pool.query('SELECT * FROM shoe_data WHERE colour = $1', [colour]);
        return result;
    };

    async function colourBrand (colour, brand) {
        const result = await pool.query('SELECT * FROM shoe_data WHERE brand = $1 AND colour = $2', [brand, colour]);
        return result;
    };

    async function colourSize (colour, size) {
        const result = await pool.query('SELECT * FROM shoe_data WHERE size = $1 AND colour = $2', [size, colour]);
        return result;
    };

    async function brand (brand) {
        const result = await pool.query('SELECT * FROM shoe_data WHERE brand = $1', [brand]);
        return result;
    };

    async function size (size) {
        const result = await pool.query('SELECT * FROM shoe_data WHERE size = $1', [size]);
        return result;
    };

    async function brandSize (brand, size) {
        const result = await pool.query('SELECT * FROM shoe_data WHERE brand = $1 AND size = $2', [brand, size]);
        return result;
    };

    async function specific (colour, brand, size) {
        const result = await pool.query('SELECT * FROM shoe_data WHERE brand = $1 AND size = $2 AND colour = $3', [brand, size, colour]);
        return result;
    };

    async function update (id) {
        const result = await pool.query('SELECT id,colour,brand,size,item_stock FROM shoe_data WHERE id = $1', [id]);
        let stock = result.rows[0].item_stock;
        if (stock !== 0) {
            stock--;
        };
        await pool.query('UPDATE shoe_data SET item_stock = $2 WHERE id = $1', [id, stock]);
    };

    async function returnItems (items) {
        for (let i = 0; i < items.length; i++) {
            const id = items[i].id;
            const result = await pool.query('SELECT item_stock FROM shoe_data WHERE id = $1', [id]);
            let stock = result.rows[0].item_stock;
            stock += items[i].qty;

            await pool.query('UPDATE shoe_data SET item_stock = $2 WHERE id = $1', [id, stock]);
        };
    };

    async function add (shoeData) {
        const specialCheck = /[!@#$%^&*(),.?":{}|<>\d]/;
        if (shoeData.colour && shoeData.brand && shoeData.price && shoeData.size && shoeData.stock) {
            const colourTest = specialCheck.test(shoeData.colour);
            const brandTest = specialCheck.test(shoeData.brand);
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
