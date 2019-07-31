module.exports = function (shoeService) {
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
        };
    };

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
        };
    };

    return {
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
