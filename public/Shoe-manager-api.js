module.exports = function (pool, data) {
    async function load () {
        await pool.query('DELETE FROM shoe_data');
        for (let x = 0; x < data.length; x++) {
            const input = [
                data[x].id,
                data[x].colour,
                data[x].brand,
                data[x].price,
                data[x].size,
                data[x].item_stock]
                ;
            await pool.query('INSERT INTO shoe_data(id, colour, brand, price, size, item_stock) VALUES($1,$2,$3,$4,$5,$6)', input);
        };
    };
    async function all (req, res) {
        try {
            const results = await pool.query('SELECT * FROM shoe_data');
            res.json({
                status: 'success',
                shoes: results
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        };
    };

    async function colour (req, res) {
        try {
            const colour = req.params.colour;
            const results = await pool.query('SELECT * FROM shoe_data WHERE colour = $1', [colour]);
            res.json({
                status: 'success',
                shoes: results
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        };
    };

    async function colourBrand (req, res) {
        try {
            const colour = req.params.colour;
            const brand = req.params.brandname;
            const results = await pool.query('SELECT * FROM shoe_data WHERE brand = $1 AND colour = $2', [brand, colour]);
            res.json({
                status: 'success',
                shoes: results
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        };
    };

    async function colourSize (req, res) {
        try {
            const colour = req.params.colour;
            const size = req.params.size;
            const results = await pool.query('SELECT * FROM shoe_data WHERE size = $1 AND colour = $2', [size, colour]);
            res.json({
                status: 'success',
                shoes: results
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        };
    };

    async function brand (req, res) {
        try {
            const brand = req.params.brandname;
            const results = await pool.query('SELECT * FROM shoe_data WHERE brand = $1', [brand]);
            res.json({
                status: 'success',
                shoes: results
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        };
    };

    async function size (req, res) {
        try {
            const size = req.params.size;
            const results = await pool.query('SELECT * FROM shoe_data WHERE size = $1', [size]);
            res.json({
                status: 'success',
                shoes: results
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        };
    };

    async function brandSize (req, res) {
        try {
            const brand = req.params.brandname;
            const size = req.params.size;
            const results = await pool.query('SELECT * FROM shoe_data WHERE brand = $1 AND size = $2', [brand, size]);
            res.json({
                status: 'success',
                shoes: results
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        };
    };

    async function specific (req, res) {
        try {
            const brand = req.params.brandname;
            const size = req.params.size;
            const colour = req.params.colour;
            const results = await pool.query('SELECT * FROM shoe_data WHERE brand = $1 AND size = $2 AND colour = $3', [brand, size, colour]);
            res.json({
                status: 'success',
                shoes: results
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        };
    };

    async function update (req, res) {
        try {
            const id = req.params.id;
            const result = await pool.query('SELECT id,colour,brand,size,item_stock FROM shoe_data WHERE id = $1', [id]);
            let stock = result.rows[0].item_stock;
            if (stock !== 0) {
                stock--;
            };
            await pool.query('UPDATE shoe_data SET item_stock = $2 WHERE id = $1', [id, stock]);

            res.json({
                status: 'success'
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        };
    };

    async function returnItems (req, res) {
        try {
            const items = req.body;
            for (let i = 0; i < items.length; i++) {
                const id = items[i].id;
                const result = await pool.query('SELECT item_stock FROM shoe_data WHERE id = $1', [id]);
                let stock = result.rows[0].item_stock;
                stock += items[i].qty;

                await pool.query('UPDATE shoe_data SET item_stock = $2 WHERE id = $1', [id, stock]);
            };

            res.json({
                status: 'success'
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        };
    };

    async function addShoe (req, res) {
        try {
            const specialCheck = /[!@#$%^&*(),.?":{}|<>\d]/;
            const shoeData = req.body;
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
                    } else if (results.rowCount === 0) {
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

            res.json({
                status: 'success'
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        };
    };

    return {
        load,
        all,
        colour,
        brand,
        size,
        colourBrand,
        colourSize,
        brandSize,
        specific,
        update,
        returnItems,
        addShoe
    };
};
