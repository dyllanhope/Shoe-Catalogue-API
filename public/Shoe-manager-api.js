module.exports = function (shoeService, data) {
    async function load () {
        await shoeService.reloadData(data);
    };

    async function all (req, res) {
        try {
            res.json({
                status: 'success',
                shoes: await shoeService.all()
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        };
    };

    // colour({
    //     params : {
    //         colour:""
    //     }
    // }, {
    //     res : {
    //         json : function(result) {
    //             // result.status
    //             // result.shoes
    //         }
    //     }
    // });

    async function colour (req, res) {
        try {
            const colour = req.params.colour;
            res.json({
                status: 'success',
                shoes: await shoeService.colour(colour)
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
            res.json({
                status: 'success',
                shoes: await shoeService.colourBrand(colour, brand)
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
            res.json({
                status: 'success',
                shoes: await shoeService.colourSize(colour, size)
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
            res.json({
                status: 'success',
                shoes: await shoeService.brand(brand)
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
            res.json({
                status: 'success',
                shoes: await shoeService.size(size)
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
            res.json({
                status: 'success',
                shoes: await shoeService.brandSize(brand, size)
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
            res.json({
                status: 'success',
                shoes: await shoeService.specific(colour, brand, size)
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
            await shoeService.update(id);

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
            await shoeService.returnItems(items);

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
            const shoeData = req.body;
            shoeService.add(shoeData);

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
