const assert = require('assert');
const ShoeService = require('../shoes-service');
const pg = require('pg');
const data = require('../public/js/data');
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/shoes_tests';

const pool = new Pool({
    connectionString
});

describe('Shoe catalogue service tests', function () {
    // eslint-disable-next-line no-undef
    beforeEach(async function () {
        await pool.query('delete from shoe_data;');
    });

    describe('Testing filtering', function () {
        it('Should return all shoes in the database', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData([
                {
                    id: 1,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 8,
                    item_stock: 1
                },
                {
                    id: 2,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 9,
                    item_stock: 4
                },
                {
                    id: 3,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 10,
                    item_stock: 3
                }]);

            const result = await shoeService.all();
            assert.strict.deepEqual(result.rows, [
                {
                    id: 1,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 8,
                    item_stock: 1
                },
                {
                    id: 2,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 9,
                    item_stock: 4
                },
                {
                    id: 3,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 10,
                    item_stock: 3
                }]);
        });
        it('Should return all shoes that are "red"', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            const result = await shoeService.colour('Red');
            assert.strict.deepEqual(result.rows, [
                {
                    brand: 'Nike',
                    colour: 'Red',
                    id: 1,
                    item_stock: 1,
                    price: 350,
                    size: 8
                },
                {
                    brand: 'Nike',
                    colour: 'Red',
                    id: 2,
                    item_stock: 4,
                    price: 350,
                    size: 9
                },
                {
                    brand: 'Nike',
                    colour: 'Red',
                    id: 3,
                    item_stock: 3,
                    price: 350,
                    size: 10
                },
                {
                    brand: 'Nike',
                    colour: 'Red',
                    id: 4,
                    item_stock: 2,
                    price: 350,
                    size: 11
                },
                {
                    brand: 'Adidas',
                    colour: 'Red',
                    id: 17,
                    item_stock: 6,
                    price: 700,
                    size: 8
                },
                {
                    brand: 'Adidas',
                    colour: 'Red',
                    id: 18,
                    item_stock: 2,
                    price: 700,
                    size: 9
                },
                {
                    brand: 'Adidas',
                    colour: 'Red',
                    id: 19,
                    item_stock: 1,
                    price: 700,
                    size: 10
                },
                {
                    brand: 'Adidas',
                    colour: 'Red',
                    id: 20,
                    item_stock: 5,
                    price: 700,
                    size: 11
                },
                {
                    brand: 'New Balance',
                    colour: 'Red',
                    id: 33,
                    item_stock: 4,
                    price: 455,
                    size: 8
                },
                {
                    brand: 'New Balance',
                    colour: 'Red',
                    id: 34,
                    item_stock: 1,
                    price: 455,
                    size: 9
                },
                {
                    brand: 'New Balance',
                    colour: 'Red',
                    id: 35,
                    item_stock: 2,
                    price: 455,
                    size: 10
                },
                {
                    brand: 'New Balance',
                    colour: 'Red',
                    id: 36,
                    item_stock: 3,
                    price: 455,
                    size: 11
                },
                {
                    brand: 'Vans',
                    colour: 'Red',
                    id: 49,
                    item_stock: 1,
                    price: 360,
                    size: 8
                },
                {
                    brand: 'Vans',
                    colour: 'Red',
                    id: 50,
                    item_stock: 5,
                    price: 360,
                    size: 9
                },
                {
                    brand: 'Vans',
                    colour: 'Red',
                    id: 51,
                    item_stock: 6,
                    price: 360,
                    size: 10
                },
                {
                    brand: 'Vans',
                    colour: 'Red',
                    id: 52,
                    item_stock: 2,
                    price: 360,
                    size: 11
                }
            ]
            );
        });
        it('Should return all shoes from "Nike"', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            const result = await shoeService.brand('Nike');
            assert.strict.deepEqual(result.rows, [
                {
                    brand: 'Nike',
                    colour: 'Red',
                    id: 1,
                    item_stock: 1,
                    price: 350,
                    size: 8
                },
                {
                    brand: 'Nike',
                    colour: 'Red',
                    id: 2,
                    item_stock: 4,
                    price: 350,
                    size: 9
                },
                {
                    brand: 'Nike',
                    colour: 'Red',
                    id: 3,
                    item_stock: 3,
                    price: 350,
                    size: 10
                },
                {
                    brand: 'Nike',
                    colour: 'Red',
                    id: 4,
                    item_stock: 2,
                    price: 350,
                    size: 11
                },
                {
                    brand: 'Nike',
                    colour: 'Blue',
                    id: 5,
                    item_stock: 0,
                    price: 400,
                    size: 8
                },
                {
                    brand: 'Nike',
                    colour: 'Blue',
                    id: 6,
                    item_stock: 2,
                    price: 400,
                    size: 9
                },
                {
                    brand: 'Nike',
                    colour: 'Blue',
                    id: 7,
                    item_stock: 7,
                    price: 400,
                    size: 10
                },
                {
                    brand: 'Nike',
                    colour: 'Blue',
                    id: 8,
                    item_stock: 5,
                    price: 400,
                    size: 11
                },
                {
                    brand: 'Nike',
                    colour: 'Black',
                    id: 9,
                    item_stock: 5,
                    price: 1200,
                    size: 8
                },
                {
                    brand: 'Nike',
                    colour: 'Black',
                    id: 10,
                    item_stock: 1,
                    price: 1200,
                    size: 9
                },
                {
                    brand: 'Nike',
                    colour: 'Black',
                    id: 11,
                    item_stock: 3,
                    price: 1200,
                    size: 10
                },
                {
                    brand: 'Nike',
                    colour: 'Black',
                    id: 12,
                    item_stock: 3,
                    price: 1200,
                    size: 11
                },
                {
                    brand: 'Nike',
                    colour: 'White',
                    id: 13,
                    item_stock: 2,
                    price: 1100,
                    size: 8
                },
                {
                    brand: 'Nike',
                    colour: 'White',
                    id: 14,
                    item_stock: 4,
                    price: 1100,
                    size: 9
                },
                {
                    brand: 'Nike',
                    colour: 'White',
                    id: 15,
                    item_stock: 1,
                    price: 1100,
                    size: 10
                },
                {
                    brand: 'Nike',
                    colour: 'White',
                    id: 16,
                    item_stock: 5,
                    price: 1100,
                    size: 11
                }
            ]);
        });
        it('Should return all shoes with size 8', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            const result = await shoeService.size(8);
            assert.strict.deepEqual(result.rows, [
                {
                    brand: 'Nike',
                    colour: 'Red',
                    id: 1,
                    item_stock: 1,
                    price: 350,
                    size: 8
                },
                {
                    brand: 'Nike',
                    colour: 'Blue',
                    id: 5,
                    item_stock: 0,
                    price: 400,
                    size: 8
                },
                {
                    brand: 'Nike',
                    colour: 'Black',
                    id: 9,
                    item_stock: 5,
                    price: 1200,
                    size: 8
                },
                {
                    brand: 'Nike',
                    colour: 'White',
                    id: 13,
                    item_stock: 2,
                    price: 1100,
                    size: 8
                },
                {
                    brand: 'Adidas',
                    colour: 'Red',
                    id: 17,
                    item_stock: 6,
                    price: 700,
                    size: 8
                },
                {
                    brand: 'Adidas',
                    colour: 'Blue',
                    id: 21,
                    item_stock: 5,
                    price: 450,
                    size: 8
                },
                {
                    brand: 'Adidas',
                    colour: 'Black',
                    id: 25,
                    item_stock: 3,
                    price: 1250,
                    size: 8
                },
                {
                    brand: 'Adidas',
                    colour: 'White',
                    id: 29,
                    item_stock: 4,
                    price: 1300,
                    size: 8
                },
                {
                    brand: 'New Balance',
                    colour: 'Red',
                    id: 33,
                    item_stock: 4,
                    price: 455,
                    size: 8
                },
                {
                    brand: 'New Balance',
                    colour: 'Blue',
                    id: 37,
                    item_stock: 7,
                    price: 300,
                    size: 8
                },
                {
                    brand: 'New Balance',
                    colour: 'Black',
                    id: 41,
                    item_stock: 3,
                    price: 1000,
                    size: 8
                },
                {
                    brand: 'New Balance',
                    colour: 'White',
                    id: 45,
                    item_stock: 1,
                    price: 950,
                    size: 8
                },
                {
                    brand: 'Vans',
                    colour: 'Red',
                    id: 49,
                    item_stock: 1,
                    price: 360,
                    size: 8
                },
                {
                    brand: 'Vans',
                    colour: 'Blue',
                    id: 53,
                    item_stock: 4,
                    price: 500,
                    size: 8
                },
                {
                    brand: 'Vans',
                    colour: 'Black',
                    id: 57,
                    item_stock: 2,
                    price: 900,
                    size: 8
                },
                {
                    brand: 'Vans',
                    colour: 'White',
                    id: 61,
                    item_stock: 7,
                    price: 800,
                    size: 8
                }
            ]);
        });
        it('Should return all shoes with colour "Red" and brand "Nike"', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            const result = await shoeService.colourBrand('Red', 'Nike');
            assert.strict.deepEqual(result.rows, [
                {
                    brand: 'Nike',
                    colour: 'Red',
                    id: 1,
                    item_stock: 1,
                    price: 350,
                    size: 8
                },
                {
                    brand: 'Nike',
                    colour: 'Red',
                    id: 2,
                    item_stock: 4,
                    price: 350,
                    size: 9
                },
                {
                    brand: 'Nike',
                    colour: 'Red',
                    id: 3,
                    item_stock: 3,
                    price: 350,
                    size: 10
                },
                {
                    brand: 'Nike',
                    colour: 'Red',
                    id: 4,
                    item_stock: 2,
                    price: 350,
                    size: 11
                }
            ]);
        });
        it('Should return all shoes with colour "Blue" and size 8', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            const result = await shoeService.colourSize('Blue', 8);
            assert.strict.deepEqual(result.rows, [
                {
                    brand: 'Nike',
                    colour: 'Blue',
                    id: 5,
                    item_stock: 0,
                    price: 400,
                    size: 8
                },
                {
                    brand: 'Adidas',
                    colour: 'Blue',
                    id: 21,
                    item_stock: 5,
                    price: 450,
                    size: 8
                },
                {
                    brand: 'New Balance',
                    colour: 'Blue',
                    id: 37,
                    item_stock: 7,
                    price: 300,
                    size: 8
                },
                {
                    brand: 'Vans',
                    colour: 'Blue',
                    id: 53,
                    item_stock: 4,
                    price: 500,
                    size: 8
                }
            ]
            );
        });
        it('Should return all shoes with brand "Adidas" and size 11', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            const result = await shoeService.brandSize('Adidas', 11);
            assert.strict.deepEqual(result.rows, [
                {
                    brand: 'Adidas',
                    colour: 'Red',
                    id: 20,
                    item_stock: 5,
                    price: 700,
                    size: 11
                },
                {
                    brand: 'Adidas',
                    colour: 'Blue',
                    id: 24,
                    item_stock: 0,
                    price: 450,
                    size: 11
                },
                {
                    brand: 'Adidas',
                    colour: 'Black',
                    id: 28,
                    item_stock: 5,
                    price: 1250,
                    size: 11
                },
                {
                    brand: 'Adidas',
                    colour: 'White',
                    id: 32,
                    item_stock: 2,
                    price: 1300,
                    size: 11
                }
            ]);
        });
        it('Should return all shoes with colour "Black", brand "Adidas" and size 11', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            const result = await shoeService.specific('Black', 'Adidas', 11);
            assert.strict.deepEqual(result.rows, [
                {
                    brand: 'Adidas',
                    colour: 'Black',
                    id: 28,
                    item_stock: 5,
                    price: 1250,
                    size: 11
                }
            ]);
        });
    });
    describe('Updating stock amounts', function () {
        it('Should return stock of the chosen id (48) decremented by 1 (from 4 to 3)', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            await shoeService.update(48);
            const result = await pool.query('SELECT item_stock FROM shoe_data WHERE id = $1', [48]);
            assert.strict.equal(result.rows[0].item_stock, 3);
        });
        it('Should return stock of the chosen id (24) decremented by 0 (stock was already at 0)', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            await shoeService.update(24);
            const result = await pool.query('SELECT item_stock FROM shoe_data WHERE id = $1', [24]);
            assert.strict.equal(result.rows[0].item_stock, 0);
        });
        it('Should return stock of the chosen id (48) as its original stock before decrementing', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            await shoeService.update(48);
            await shoeService.returnItems([{ id: 48, qty: 1 }]);

            const result = await pool.query('SELECT item_stock FROM shoe_data WHERE id = $1', [48]);
            assert.strict.equal(result.rows[0].item_stock, 4);
        });
    });
    describe('Testing adding a new shoe', function () {
        it('should return the new shoes info (green crocs, size 11, price 230 and 3 in stock)', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            await shoeService.add({
                colour: 'Green',
                brand: 'Crocs',
                price: 230,
                size: 11,
                stock: 3
            });

            const result = await pool.query('SELECT * FROM shoe_data WHERE id = $1', [65]);
            assert.strict.deepEqual(result.rows[0], {
                id: 65,
                colour: 'Green',
                brand: 'Crocs',
                price: 230,
                size: 11,
                item_stock: 3
            });
        });
        it('should return the new shoes info with increased stock(red nike, size 10, price 350 and 5 in stock)', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            await shoeService.add({
                colour: 'Red',
                brand: 'Nike',
                price: 350,
                size: 10,
                stock: 2
            });

            const result = await pool.query('SELECT * FROM shoe_data WHERE id = $1', [3]);
            assert.strict.deepEqual(result.rows[0], {
                id: 3,
                colour: 'Red',
                brand: 'Nike',
                price: 350,
                size: 10,
                item_stock: 5
            });
        });
    });

    // eslint-disable-next-line no-undef
    after(function () {
        pool.end();
    });
});
