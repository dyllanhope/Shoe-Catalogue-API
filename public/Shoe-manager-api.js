module.exports = function (shoeService) {
    async function load (data) {
        await shoeService.reloadData(data);
    };

    const all = async (req, res) => {
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
            console.log(err.stack);
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

    const colour = async (req, res) => {
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
            console.log(err.stack);
        };
    };

    const colourBrand = async (req, res) => {
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
            console.log(err.stack);
        };
    };

    const colourSize = async (req, res) => {
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
            console.log(err.stack);
        };
    };

    const brand = async (req, res) => {
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
            console.log(err.stack);
        };
    };

    const size = async (req, res) => {
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
            console.log(err.stack);
        };
    };

    const brandSize = async (req, res) => {
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
            console.log(err.stack);
        };
    };

    const specific = async (req, res) => {
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
            console.log(err.stack);
        };
    };

    const update = async (req, res) => {
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
            console.log(err.stack);
        };
    };

    const returnItems = async (req, res) => {
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
            console.log(err.stack);
        };
    };

    const addShoe = async (req, res) => {
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
            console.log(err.stack);
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
