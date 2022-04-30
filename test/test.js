let mongoose = require("mongoose");
let Restuarant = require('../app/models/restuarant');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Restuarants', () => {
    beforeEach((done) => { //Before each test we empty the database
        Restuarant.deleteMany({}, (err) => { 
            return done();           
        });        
    });
/*
    * Test the /GET route
    */
    describe('/GET restuarants/get-all-restuarant', () => {
        it('it should GET all the restuarants', async(done) => {
        chai.request(server)
            .get('/restuarants/get-all-restuarant')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
            });
        });
    });

    describe('/POST restuarants/add-restuarant', () => {
        it('it should not POST a Restuarant without pages field', (done) => {
            let Restuarant = {
                name: "Restuarant One",
                location: "Bihar",
                lang : "44.44",
                lat: "55.55"
            }
          chai.request(server)
              .post('/restuarants/add-restuarant')
              .send(Restuarant)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('data');
                done();
              });
        });
  
    });

    describe('/GET/:id restuarants/get-individual-restuarant', () => {
        it('it should get resturaant by id', (done) => {
            let rest = new Restuarant(
                { 
                    name: "Restuarant One",
                    location: "Bihar",
                    lang : "44.44",
                    lat: "55.55"
                });
                Restuarant.save((err, rest) => {
                    chai.request(server)
                  .get('/restuarants/get-individual-restuarant/' + rest.id)
                  .send(rest)
                  .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('location');
                        res.body.should.have.property('lang');
                        res.body.should.have.property('lat');
                        res.body.should.have.property('status');
                        res.body.should.have.property('_id').eql(rest.id);
                    done();
                  });
            });
  
        });
    });

    describe('/PUT/:id restuarants/update-restuarant', () => {
        it('it should UPDATE a restuatant given the id', (done) => {
            let restuatant = new Restuarant({ 
                name: "Restuarant One",
                location: "Bihar",
                lang : "44.44",
                lat: "55.55"
            });
            restuatant.save((err, restuatant) => {
                  chai.request(server)
                  .put('/restuarants/update-restuarant/' + restuatant.id)
                  .send({ 
                    name: "Restuarant One",
                    location: "Bihar",
                    lang : "44.44",
                    lat: "55.55"
                })
                  .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                    done();
                  });
            });
        });
    });
});
