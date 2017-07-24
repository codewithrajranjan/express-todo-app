var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var app = require('../app');


// describing the test suite
describe('Delete task by id',function(){
    
    //test case
    it('Delete the task by id',function(done){
        var taskId = 4;
        request(app) 
        .delete('/task/id/'+taskId)
        .then(function(response){
            expect(response.status).to.equal(200);
            var responseData = response.body;
            expect(responseData.code).to.equal('taskDeleted');
            done();
        })
        .catch(function(error){
            done(new Error(error));
        });
    });    

});
