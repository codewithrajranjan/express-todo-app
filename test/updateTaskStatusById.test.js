var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var app = require('../app');


// describing the test suite
describe('Update task status by id',function(){
    
    //test case
    it('Update task status by id',function(done){
        var taskId = 12;
        var taskStatus = 'done';
        request(app) 
        .put('/task/id/'+taskId+'/status/'+taskStatus)
        .then(function(response){
            expect(response.status).to.equal(200);
            var responseData = response.body;
            console.log(responseData);
            expect(responseData.code).to.equal('taskUpdated');
            done();
        })
        .catch(function(error){
            done(new Error(error));
        });
    });    

});
