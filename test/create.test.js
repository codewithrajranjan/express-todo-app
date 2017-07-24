var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var app = require('../app');


// describing the test suite
describe('Create a task',function(){
    
    var newTask = {
        task : "Need to create an angular todo app",
        createdAt : new Date()
    };
    //test case
    it('If task is not given then it should throw error',function(done){
        request(app) 
        .post('/task')
        .send(newTask)
        .then(function(response){
            expect(response.status).to.equal(200);
            done();
        })
        .catch(function(error){
            done(new Error(error));
        });
    });    

});
