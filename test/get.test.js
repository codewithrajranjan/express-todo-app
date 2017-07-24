var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var app = require('../app');


// describing the test suite
describe('Getting  task',function(){
    
    //test case
    it('Getting all the task',function(done){
        request(app) 
        .get('/task')
        .then(function(response){
            expect(response.status).to.equal(200);
            var data = response.body;
            done();
        })
        .catch(function(error){
            done(new Error(error));
        });
    });    

});
