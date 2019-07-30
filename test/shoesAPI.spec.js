/* eslint-disable handle-callback-err */
var app = require('../index');
var chai = require('chai');
var request = require('supertest');
const express = require('express');
const ShoeMockAPI = require('../public/Shoe-manager-api');
const ShoeService = require('./mock-service');
const AppRouting = require('../app-routing');
const bodyParser = require('body-parser');

var expect = chai.expect;
describe('API Tests', () => {
    app = express();
    app.use(bodyParser.json());
    const shoeService = ShoeService();
    const shoeMockAPI = ShoeMockAPI(shoeService);
    AppRouting(shoeMockAPI, app);
    describe('Testing fetching APIs that return lists from the database', () => {
        it('should return a list of all records in the database', (done) => {
            request(app)
                .get('/api/shoes')
                .end(function (err, res) {
                    expect(res.body.shoes).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of shoes of a specified colour (Red)', (done) => {
            request(app)
                .get('/api/shoes/colour/' + 'Red')
                .end(function (err, res) {
                    expect(res.body.shoes).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of shoes of a specified brand (Nike)', (done) => {
            request(app)
                .get('/api/shoes/brand/' + 'Nike')
                .end(function (err, res) {
                    expect(res.body.shoes).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of shoes of a specified size (9)', (done) => {
            request(app)
                .get('/api/shoes/size/' + '9')
                .end(function (err, res) {
                    expect(res.body.shoes).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of shoes of a specified colour & brand (Blue Adidas)', (done) => {
            request(app)
                .get('/api/shoes/colour/' + 'Blue' + '/brand/' + 'Adidas')
                .end(function (err, res) {
                    expect(res.body.shoes).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of shoes of a specified colour & size (Blue size 11)', (done) => {
            request(app)
                .get('/api/shoes/colour/' + 'Black' + '/size/' + '11')
                .end(function (err, res) {
                    expect(res.body.shoes).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of shoes of a specified brand & size (New Balance size 10)', (done) => {
            request(app)
                .get('/api/shoes/brand/' + 'New Balance' + '/size/' + '10')
                .end(function (err, res) {
                    expect(res.body.shoes).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of shoes of a specified colour, brand & size (White Vans size 9)', (done) => {
            request(app)
                .get('/api/shoes/brand/' + 'Vans' + '/size/' + '9' + '/colour/' + 'White')
                .end(function (err, res) {
                    expect(res.body.shoes).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
    });
    describe('Testing the updating APIs (update, add, returnItems)', () => {
        it('should return successful post of reducing stock of a specified id (48)', (done) => {
            request(app)
                .post('/api/shoes/sold/' + '48')
                .end(function (err, res) {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return successful post of returning stock to correct shoes', (done) => {
            const test = { size: 10, colour: 'Black', brand: 'Nike', qty: 1, cost: 0 };
            request(app)
                .post('/api/shoes/clear/', test)
                .end(function (err, res) {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return successful post of adding new shoes to database', (done) => {
            const test = { size: 10, colour: 'Red', brand: 'Vans', stock: 4, price: 400 };
            request(app)
                .post('/api/shoes/clear/', test)
                .end(function (err, res) {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
    });
});
