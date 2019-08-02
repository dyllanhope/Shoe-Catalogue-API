/* eslint-disable no-undef */
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
                    item_stock: 1,
                    image: 'picture'
                },
                {
                    id: 2,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 9,
                    item_stock: 4,
                    image: 'picture'
                },
                {
                    id: 3,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 10,
                    item_stock: 3,
                    image: 'picture'
                }]);

            const result = await shoeService.all();
            assert.strict.deepEqual(result, [
                {
                    id: 1,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 8,
                    item_stock: 1,
                    image: 'picture'
                },
                {
                    id: 2,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 9,
                    item_stock: 4,
                    image: 'picture'
                },
                {
                    id: 3,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 10,
                    item_stock: 3,
                    image: 'picture'
                }]);
        });
        it('Should return all shoes that are "red"', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            const result = await shoeService.colour('Red');
            assert.strict.deepEqual(result, [
                {
                    id: 1,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 8,
                    item_stock: 1,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/65nwl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=C90023&show&obj=/s/g4/solid&color=BE2B3B&show&obj=/s/g5/solid&color=c60429&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=a5062c&show&obj=/s/g7/lace&color=E7002C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 2,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 9,
                    item_stock: 4,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/65nwl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=C90023&show&obj=/s/g4/solid&color=BE2B3B&show&obj=/s/g5/solid&color=c60429&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=a5062c&show&obj=/s/g7/lace&color=E7002C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 3,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 10,
                    item_stock: 3,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/65nwl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=C90023&show&obj=/s/g4/solid&color=BE2B3B&show&obj=/s/g5/solid&color=c60429&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=a5062c&show&obj=/s/g7/lace&color=E7002C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 4,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 11,
                    item_stock: 2,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/65nwl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=C90023&show&obj=/s/g4/solid&color=BE2B3B&show&obj=/s/g5/solid&color=c60429&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=a5062c&show&obj=/s/g7/lace&color=E7002C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 17,
                    colour: 'Red',
                    brand: 'Adidas',
                    price: 700,
                    size: 8,
                    item_stock: 6,
                    image: 'https://cdn.zando.co.za/p/342201-1862-102243-2-catalog1.jpg'
                },
                {
                    id: 18,
                    colour: 'Red',
                    brand: 'Adidas',
                    price: 700,
                    size: 9,
                    item_stock: 2,
                    image: 'https://cdn.zando.co.za/p/342201-1862-102243-2-catalog1.jpg'
                },
                {
                    id: 19,
                    colour: 'Red',
                    brand: 'Adidas',
                    price: 700,
                    size: 10,
                    item_stock: 1,
                    image: 'https://cdn.zando.co.za/p/342201-1862-102243-2-catalog1.jpg'
                },
                {
                    id: 20,
                    colour: 'Red',
                    brand: 'Adidas',
                    price: 700,
                    size: 11,
                    item_stock: 5,
                    image: 'https://cdn.zando.co.za/p/342201-1862-102243-2-catalog1.jpg'
                },
                {
                    id: 33,
                    colour: 'Red',
                    brand: 'New balance',
                    price: 455,
                    size: 8,
                    item_stock: 4,
                    image: 'https://www.newbalance.co.za/media/product/685/997-classic-running-cm997hdc-9ac.jpg'
                },
                {
                    id: 34,
                    colour: 'Red',
                    brand: 'New balance',
                    price: 455,
                    size: 9,
                    item_stock: 1,
                    image: 'https://www.newbalance.co.za/media/product/685/997-classic-running-cm997hdc-9ac.jpg'
                },
                {
                    id: 35,
                    colour: 'Red',
                    brand: 'New balance',
                    price: 455,
                    size: 10,
                    item_stock: 2,
                    image: 'https://www.newbalance.co.za/media/product/685/997-classic-running-cm997hdc-9ac.jpg'
                },
                {
                    id: 36,
                    colour: 'Red',
                    brand: 'New balance',
                    price: 455,
                    size: 11,
                    item_stock: 3,
                    image: 'https://www.newbalance.co.za/media/product/685/997-classic-running-cm997hdc-9ac.jpg'
                },
                {
                    id: 49,
                    colour: 'Red',
                    brand: 'Vans',
                    price: 360,
                    size: 8,
                    item_stock: 1,
                    image: 'https://images.vans.com/is/image/Vans/4OJGYK-HERO?$356x356$'
                },
                {
                    id: 50,
                    colour: 'Red',
                    brand: 'Vans',
                    price: 360,
                    size: 9,
                    item_stock: 5,
                    image: 'https://images.vans.com/is/image/Vans/4OJGYK-HERO?$356x356$'
                },
                {
                    id: 51,
                    colour: 'Red',
                    brand: 'Vans',
                    price: 360,
                    size: 10,
                    item_stock: 6,
                    image: 'https://images.vans.com/is/image/Vans/4OJGYK-HERO?$356x356$'
                },
                {
                    id: 52,
                    colour: 'Red',
                    brand: 'Vans',
                    price: 360,
                    size: 11,
                    item_stock: 2,
                    image: 'https://images.vans.com/is/image/Vans/4OJGYK-HERO?$356x356$'
                }
            ]
            );
        });
        it('Should return all shoes from "Nike"', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            const result = await shoeService.brand('Nike');
            assert.strict.deepEqual(result, [
                {
                    id: 1,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 8,
                    item_stock: 1,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/65nwl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=C90023&show&obj=/s/g4/solid&color=BE2B3B&show&obj=/s/g5/solid&color=c60429&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=a5062c&show&obj=/s/g7/lace&color=E7002C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 2,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 9,
                    item_stock: 4,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/65nwl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=C90023&show&obj=/s/g4/solid&color=BE2B3B&show&obj=/s/g5/solid&color=c60429&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=a5062c&show&obj=/s/g7/lace&color=E7002C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 3,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 10,
                    item_stock: 3,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/65nwl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=C90023&show&obj=/s/g4/solid&color=BE2B3B&show&obj=/s/g5/solid&color=c60429&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=a5062c&show&obj=/s/g7/lace&color=E7002C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 4,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 11,
                    item_stock: 2,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/65nwl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=C90023&show&obj=/s/g4/solid&color=BE2B3B&show&obj=/s/g5/solid&color=c60429&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=a5062c&show&obj=/s/g7/lace&color=E7002C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 5,
                    colour: 'Blue',
                    brand: 'Nike',
                    price: 400,
                    size: 8,
                    item_stock: 0,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/4pawl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=0063a9&show&obj=/s/g4/solid&color=0960A9&show&obj=/s/g5/solid&color=1F263D&show&obj=/s/g6&color=FFA021&show&obj=/s/g8&color=142149&show&obj=/s/g7/lace&color=007ebd&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 6,
                    colour: 'Blue',
                    brand: 'Nike',
                    price: 400,
                    size: 9,
                    item_stock: 2,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/4pawl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=0063a9&show&obj=/s/g4/solid&color=0960A9&show&obj=/s/g5/solid&color=1F263D&show&obj=/s/g6&color=FFA021&show&obj=/s/g8&color=142149&show&obj=/s/g7/lace&color=007ebd&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 7,
                    colour: 'Blue',
                    brand: 'Nike',
                    price: 400,
                    size: 10,
                    item_stock: 7,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/4pawl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=0063a9&show&obj=/s/g4/solid&color=0960A9&show&obj=/s/g5/solid&color=1F263D&show&obj=/s/g6&color=FFA021&show&obj=/s/g8&color=142149&show&obj=/s/g7/lace&color=007ebd&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 8,
                    colour: 'Blue',
                    brand: 'Nike',
                    price: 400,
                    size: 11,
                    item_stock: 5,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/4pawl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=0063a9&show&obj=/s/g4/solid&color=0960A9&show&obj=/s/g5/solid&color=1F263D&show&obj=/s/g6&color=FFA021&show&obj=/s/g8&color=142149&show&obj=/s/g7/lace&color=007ebd&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 9,
                    colour: 'Black',
                    brand: 'Nike',
                    price: 1200,
                    size: 8,
                    item_stock: 5,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/00awl&show&obj=/s/g11&color=2c2c2c&show&obj=/s/g12&color=333133&show&obj=/s/g3/eye&color=2a2a2a&show&obj=/s/g4/met&color=D3A852&show&obj=/s/g5/met&color=a99052&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=1c1c1c&show&obj=/s/g7/lace&color=1C1C1C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 10,
                    colour: 'Black',
                    brand: 'Nike',
                    price: 1200,
                    size: 9,
                    item_stock: 1,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/00awl&show&obj=/s/g11&color=2c2c2c&show&obj=/s/g12&color=333133&show&obj=/s/g3/eye&color=2a2a2a&show&obj=/s/g4/met&color=D3A852&show&obj=/s/g5/met&color=a99052&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=1c1c1c&show&obj=/s/g7/lace&color=1C1C1C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 11,
                    colour: 'Black',
                    brand: 'Nike',
                    price: 1200,
                    size: 10,
                    item_stock: 3,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/00awl&show&obj=/s/g11&color=2c2c2c&show&obj=/s/g12&color=333133&show&obj=/s/g3/eye&color=2a2a2a&show&obj=/s/g4/met&color=D3A852&show&obj=/s/g5/met&color=a99052&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=1c1c1c&show&obj=/s/g7/lace&color=1C1C1C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 12,
                    colour: 'Black',
                    brand: 'Nike',
                    price: 1200,
                    size: 11,
                    item_stock: 3,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/00awl&show&obj=/s/g11&color=2c2c2c&show&obj=/s/g12&color=333133&show&obj=/s/g3/eye&color=2a2a2a&show&obj=/s/g4/met&color=D3A852&show&obj=/s/g5/met&color=a99052&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=1c1c1c&show&obj=/s/g7/lace&color=1C1C1C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 13,
                    colour: 'White',
                    brand: 'Nike',
                    price: 1100,
                    size: 8,
                    item_stock: 2,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/10awl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=fffef9&show&obj=/s/g4/solid&color=f9fcff&show&obj=/s/g5/solid&color=ffffff&show&obj=/s/g6&color=ffffff&show&obj=/s/g8&color=cad3d5&show&obj=/s/g7/lace&color=F8F7FD&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 14,
                    colour: 'White',
                    brand: 'Nike',
                    price: 1100,
                    size: 9,
                    item_stock: 4,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/10awl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=fffef9&show&obj=/s/g4/solid&color=f9fcff&show&obj=/s/g5/solid&color=ffffff&show&obj=/s/g6&color=ffffff&show&obj=/s/g8&color=cad3d5&show&obj=/s/g7/lace&color=F8F7FD&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 15,
                    colour: 'White',
                    brand: 'Nike',
                    price: 1100,
                    size: 10,
                    item_stock: 1,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/10awl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=fffef9&show&obj=/s/g4/solid&color=f9fcff&show&obj=/s/g5/solid&color=ffffff&show&obj=/s/g6&color=ffffff&show&obj=/s/g8&color=cad3d5&show&obj=/s/g7/lace&color=F8F7FD&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 16,
                    colour: 'White',
                    brand: 'Nike',
                    price: 1100,
                    size: 11,
                    item_stock: 5,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/10awl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=fffef9&show&obj=/s/g4/solid&color=f9fcff&show&obj=/s/g5/solid&color=ffffff&show&obj=/s/g6&color=ffffff&show&obj=/s/g8&color=cad3d5&show&obj=/s/g7/lace&color=F8F7FD&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                }
            ]);
        });
        it('Should return all shoes with size 8', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            const result = await shoeService.size(8);
            assert.strict.deepEqual(result, [
                {
                    brand: 'Nike',
                    colour: 'Red',
                    id: 1,
                    item_stock: 1,
                    price: 350,
                    size: 8,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/65nwl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=C90023&show&obj=/s/g4/solid&color=BE2B3B&show&obj=/s/g5/solid&color=c60429&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=a5062c&show&obj=/s/g7/lace&color=E7002C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    brand: 'Nike',
                    colour: 'Blue',
                    id: 5,
                    item_stock: 0,
                    price: 400,
                    size: 8,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/4pawl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=0063a9&show&obj=/s/g4/solid&color=0960A9&show&obj=/s/g5/solid&color=1F263D&show&obj=/s/g6&color=FFA021&show&obj=/s/g8&color=142149&show&obj=/s/g7/lace&color=007ebd&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    brand: 'Nike',
                    colour: 'Black',
                    id: 9,
                    item_stock: 5,
                    price: 1200,
                    size: 8,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/00awl&show&obj=/s/g11&color=2c2c2c&show&obj=/s/g12&color=333133&show&obj=/s/g3/eye&color=2a2a2a&show&obj=/s/g4/met&color=D3A852&show&obj=/s/g5/met&color=a99052&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=1c1c1c&show&obj=/s/g7/lace&color=1C1C1C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    brand: 'Nike',
                    colour: 'White',
                    id: 13,
                    item_stock: 2,
                    price: 1100,
                    size: 8,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/10awl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=fffef9&show&obj=/s/g4/solid&color=f9fcff&show&obj=/s/g5/solid&color=ffffff&show&obj=/s/g6&color=ffffff&show&obj=/s/g8&color=cad3d5&show&obj=/s/g7/lace&color=F8F7FD&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    brand: 'Adidas',
                    colour: 'Red',
                    id: 17,
                    item_stock: 6,
                    price: 700,
                    size: 8,
                    image: 'https://cdn.zando.co.za/p/342201-1862-102243-2-catalog1.jpg'
                },
                {
                    brand: 'Adidas',
                    colour: 'Blue',
                    id: 21,
                    item_stock: 5,
                    price: 450,
                    size: 8,
                    image: 'https://cdn.zando.co.za/p/342204-1906-402243-2-catalog1.jpg'
                },
                {
                    brand: 'Adidas',
                    colour: 'Black',
                    id: 25,
                    item_stock: 3,
                    price: 1250,
                    size: 8,
                    image: 'https://cdn.zando.co.za/p/342223-1704-322243-2-catalog1.jpg'
                },
                {
                    brand: 'Adidas',
                    colour: 'White',
                    id: 29,
                    item_stock: 4,
                    price: 1300,
                    size: 8,
                    image: 'https://cdn.zando.co.za/p/319634-1801-436913-2-catalog1.jpg'
                },
                {
                    brand: 'New balance',
                    colour: 'Red',
                    id: 33,
                    item_stock: 4,
                    price: 455,
                    size: 8,
                    image: 'https://www.newbalance.co.za/media/product/685/997-classic-running-cm997hdc-9ac.jpg'
                },
                {
                    brand: 'New balance',
                    colour: 'Blue',
                    id: 37,
                    item_stock: 7,
                    price: 300,
                    size: 8,
                    image: 'https://www.newbalance.co.za/media/product/a9e/997-classic-running-cw997hdc-1aa.png'
                },
                {
                    brand: 'New balance',
                    colour: 'Black',
                    id: 41,
                    item_stock: 3,
                    price: 1000,
                    size: 8,
                    image: 'https://www.newbalance.co.za/media/product/88b/997-classic-running-cw997hdb-45c.png'
                },
                {
                    brand: 'New balance',
                    colour: 'White',
                    id: 45,
                    item_stock: 1,
                    price: 950,
                    size: 8,
                    image: 'https://www.newbalance.co.za/media/product/fe3/997-classic-running-cw997hda-d11.png'
                },
                {
                    brand: 'Vans',
                    colour: 'Red',
                    id: 49,
                    item_stock: 1,
                    price: 360,
                    size: 8,
                    image: 'https://images.vans.com/is/image/Vans/4OJGYK-HERO?$356x356$'
                },
                {
                    brand: 'Vans',
                    colour: 'Blue',
                    id: 53,
                    item_stock: 4,
                    price: 500,
                    size: 8,
                    image: 'https://images.vans.com/is/image/Vans/ZD40NS-HERO?$356x356$'
                },
                {
                    brand: 'Vans',
                    colour: 'Black',
                    id: 57,
                    item_stock: 2,
                    price: 900,
                    size: 8,
                    image: 'https://images.vans.com/is/image/Vans/D3HY28-HERO?$356x356$'
                },
                {
                    brand: 'Vans',
                    colour: 'White',
                    id: 61,
                    item_stock: 7,
                    price: 800,
                    size: 8,
                    image: 'https://images.vans.com/is/image/Vans/D3HW00-HERO?$356x356$'
                }
            ]);
        });
        it('Should return all shoes with colour "Red" and brand "Nike"', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            const result = await shoeService.colourBrand('Red', 'Nike');
            assert.strict.deepEqual(result, [
                {
                    id: 1,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 8,
                    item_stock: 1,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/65nwl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=C90023&show&obj=/s/g4/solid&color=BE2B3B&show&obj=/s/g5/solid&color=c60429&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=a5062c&show&obj=/s/g7/lace&color=E7002C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 2,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 9,
                    item_stock: 4,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/65nwl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=C90023&show&obj=/s/g4/solid&color=BE2B3B&show&obj=/s/g5/solid&color=c60429&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=a5062c&show&obj=/s/g7/lace&color=E7002C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 3,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 10,
                    item_stock: 3,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/65nwl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=C90023&show&obj=/s/g4/solid&color=BE2B3B&show&obj=/s/g5/solid&color=c60429&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=a5062c&show&obj=/s/g7/lace&color=E7002C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    id: 4,
                    colour: 'Red',
                    brand: 'Nike',
                    price: 350,
                    size: 11,
                    item_stock: 2,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/65nwl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=C90023&show&obj=/s/g4/solid&color=BE2B3B&show&obj=/s/g5/solid&color=c60429&show&obj=/s/g6&color=141414&show&obj=/s/g8&color=a5062c&show&obj=/s/g7/lace&color=E7002C&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                }
            ]);
        });
        it('Should return all shoes with colour "Blue" and size 8', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            const result = await shoeService.colourSize('Blue', 8);
            assert.strict.deepEqual(result, [
                {
                    brand: 'Nike',
                    colour: 'Blue',
                    id: 5,
                    item_stock: 0,
                    price: 400,
                    size: 8,
                    image: 'https://render.nikeid.com/ir/render/nikeidrender/EpicRea2EssSU19_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g2/4pawl&show&obj=/s/g11&color=f9fcff&show&obj=/s/g12&color=f9fcff&show&obj=/s/g3/eye&color=0063a9&show&obj=/s/g4/solid&color=0960A9&show&obj=/s/g5/solid&color=1F263D&show&obj=/s/g6&color=FFA021&show&obj=/s/g8&color=142149&show&obj=/s/g7/lace&color=007ebd&show&obj=/s/g10&color=474a4a&show&obj=/s&req=object&fmt=png-alpha&icc=AdobeRGB&wid=1500'
                },
                {
                    brand: 'Adidas',
                    colour: 'Blue',
                    id: 21,
                    item_stock: 5,
                    price: 450,
                    size: 8,
                    image: 'https://cdn.zando.co.za/p/342204-1906-402243-2-catalog1.jpg'
                },
                {
                    brand: 'New balance',
                    colour: 'Blue',
                    id: 37,
                    item_stock: 7,
                    price: 300,
                    size: 8,
                    image: 'https://www.newbalance.co.za/media/product/a9e/997-classic-running-cw997hdc-1aa.png'
                },
                {
                    brand: 'Vans',
                    colour: 'Blue',
                    id: 53,
                    item_stock: 4,
                    price: 500,
                    size: 8,
                    image: 'https://images.vans.com/is/image/Vans/ZD40NS-HERO?$356x356$'
                }
            ]
            );
        });
        it('Should return all shoes with brand "Adidas" and size 11', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            const result = await shoeService.brandSize('Adidas', 11);
            assert.strict.deepEqual(result, [
                {
                    brand: 'Adidas',
                    colour: 'Red',
                    id: 20,
                    item_stock: 5,
                    price: 700,
                    size: 11,
                    image: 'https://cdn.zando.co.za/p/342201-1862-102243-2-catalog1.jpg'
                },
                {
                    brand: 'Adidas',
                    colour: 'Blue',
                    id: 24,
                    item_stock: 0,
                    price: 450,
                    size: 11,
                    image: 'https://cdn.zando.co.za/p/342204-1906-402243-2-catalog1.jpg'
                },
                {
                    brand: 'Adidas',
                    colour: 'Black',
                    id: 28,
                    item_stock: 5,
                    price: 1250,
                    size: 11,
                    image: 'https://cdn.zando.co.za/p/342223-1704-322243-2-catalog1.jpg'
                },
                {
                    brand: 'Adidas',
                    colour: 'White',
                    id: 32,
                    item_stock: 2,
                    price: 1300,
                    size: 11,
                    image: 'https://cdn.zando.co.za/p/319634-1801-436913-2-catalog1.jpg'
                }
            ]);
        });
        it('Should return all shoes with colour "Black", brand "Adidas" and size 11', async function () {
            shoeService = ShoeService(pool);
            await shoeService.reloadData(data);

            const result = await shoeService.specific('Black', 'Adidas', 11);
            assert.strict.deepEqual(result, [
                {
                    brand: 'Adidas',
                    colour: 'Black',
                    id: 28,
                    item_stock: 5,
                    price: 1250,
                    size: 11,
                    image: 'https://cdn.zando.co.za/p/342223-1704-322243-2-catalog1.jpg'
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

            const result = await pool.query('SELECT id, colour, brand, price, size, item_stock FROM shoe_data WHERE id = $1', [65]);
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

            const result = await pool.query('SELECT id, colour, brand, price, size, item_stock FROM shoe_data WHERE id = $1', [3]);
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
