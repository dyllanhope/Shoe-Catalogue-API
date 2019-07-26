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
        update
    };
};
