/* eslint-disable handle-callback-err */
var chai = require('chai');
var request = require('supertest');
const express = require('express');
const ShoeMockAPI = require('../Shoe-manager-api');
const ShoeService = require('./mock-service');
const AppRouting = require('../app-routing');
const bodyParser = require('body-parser');

var expect = chai.expect;
describe('API Tests', () => {
    const app = express();
    app.use(bodyParser.json());

    const shoeService = ShoeService();
    const shoeMockAPI = ShoeMockAPI(shoeService);
    AppRouting(shoeMockAPI, app);

    describe('Testing fetching APIs that return lists from the database', () => {
        it('should return a list of all records in the database', (done) => {
            request(app)
                .get('/api/shoes')
                .end((err, res) => {
                    expect(res.body.shoes).to.be.deep.equal([
                        { id: 1, colour: 'White', brand: 'New balance', price: 1000, size: 10, item_stock: 3 },
                        { id: 2, colour: 'Red', brand: 'Nike', price: 400, size: 10, item_stock: 4 },
                        { id: 3, colour: 'Blue', brand: 'Adidas', price: 600, size: 9, item_stock: 1 }
                    ]);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of shoes of a specified colour (Red)', (done) => {
            request(app)
                .get('/api/shoes/colour/' + 'Red')
                .end((err, res) => {
                    expect(res.body.shoes).to.be.deep.equal([
                        { id: 1, colour: 'Red', brand: 'New balance', price: 1000, size: 10, item_stock: 3 },
                        { id: 2, colour: 'Red', brand: 'Nike', price: 400, size: 10, item_stock: 4 },
                        { id: 3, colour: 'Red', brand: 'Adidas', price: 600, size: 9, item_stock: 1 }
                    ]);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of shoes of a specified brand (Nike)', (done) => {
            request(app)
                .get('/api/shoes/brand/' + 'Nike')
                .end((err, res) => {
                    expect(res.body.shoes).to.be.deep.equal([
                        { id: 1, colour: 'White', brand: 'Nike', price: 1000, size: 10, item_stock: 3 },
                        { id: 2, colour: 'Red', brand: 'Nike', price: 400, size: 10, item_stock: 4 },
                        { id: 3, colour: 'Blue', brand: 'Nike', price: 600, size: 9, item_stock: 1 }
                    ]);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of shoes of a specified size (9)', (done) => {
            request(app)
                .get('/api/shoes/size/' + '9')
                .end((err, res) => {
                    expect(res.body.shoes).to.be.deep.equal([
                        { id: 1, colour: 'White', brand: 'New balance', price: 1000, size: 9, item_stock: 3 },
                        { id: 2, colour: 'Red', brand: 'Nike', price: 400, size: 9, item_stock: 4 },
                        { id: 3, colour: 'Blue', brand: 'Adidas', price: 600, size: 9, item_stock: 1 }
                    ]);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of shoes of a specified colour & brand (Blue Adidas)', (done) => {
            request(app)
                .get('/api/shoes/colour/' + 'Blue' + '/brand/' + 'Adidas')
                .end((err, res) => {
                    expect(res.body.shoes).to.be.deep.equal([
                        {
                            id: 47,
                            colour: 'White',
                            brand: 'New balance',
                            price: 950,
                            size: 10,
                            item_stock: 2
                        }
                    ]);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of shoes of a specified colour & size (Blue size 11)', (done) => {
            request(app)
                .get('/api/shoes/colour/' + 'Black' + '/size/' + '11')
                .end((err, res) => {
                    expect(res.body.shoes).to.be.deep.equal([
                        { id: 1, colour: 'Black', brand: 'New balance', price: 1000, size: 11, item_stock: 3 },
                        { id: 2, colour: 'Black', brand: 'Nike', price: 400, size: 11, item_stock: 4 },
                        { id: 3, colour: 'Black', brand: 'Adidas', price: 600, size: 11, item_stock: 1 }
                    ]);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of shoes of a specified brand & size (New Balance size 10)', (done) => {
            request(app)
                .get('/api/shoes/brand/' + 'New Balance' + '/size/' + '10')
                .end((err, res) => {
                    expect(res.body.shoes).to.be.deep.equal([
                        { id: 1, colour: 'White', brand: 'New balance', price: 1000, size: 10, item_stock: 3 },
                        { id: 2, colour: 'Red', brand: 'New balance', price: 400, size: 10, item_stock: 4 },
                        { id: 3, colour: 'Blue', brand: 'New balance', price: 600, size: 10, item_stock: 1 }
                    ]);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of shoes of a specified colour, brand & size (White Vans size 9)', (done) => {
            request(app)
                .get('/api/shoes/brand/' + 'Vans' + '/size/' + '9' + '/colour/' + 'White')
                .end((err, res) => {
                    expect(res.body.shoes).to.be.deep.equal([
                        { id: 1, colour: 'White', brand: 'Vans', price: 1000, size: 9, item_stock: 3 }
                    ]);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return successful post of displaying shoe data of a chosen shoe', (done) => {
            request(app)
                .get('/shoes/display/48')
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
    });
    describe('Testing the updating APIs (update, add, returnItems)', () => {
        it('should return successful post of reducing stock of a specified id (48)', (done) => {
            request(app)
                .post('/api/shoes/sold/' + '48')
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return successful post of returning stock to correct shoes', (done) => {
            const test = { size: 10, colour: 'Black', brand: 'Nike', qty: 1, cost: 0 };
            request(app)
                .post('/api/shoes/clear')
                .send(test)
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return successful post of adding new shoes to database', (done) => {
            const test = { size: 10, colour: 'Red', brand: 'Vans', stock: 4, price: 400 };
            request(app)
                .post('/api/shoes')
                .send(test)
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return successful post of adding new shoes to basket database', (done) => {
            const test = [{ size: 8, colour: 'Blue', brand: 'Nike', qty: 4, cost: 1600 }];
            request(app)
                .post('/api/shoes/basket')
                .send(test)
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
    });
});
