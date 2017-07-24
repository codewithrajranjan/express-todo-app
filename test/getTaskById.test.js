var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var app = require('../app');


// describing the test suite
describe('Getting task by id',function(){
    
    //test case
    it('Get the task by id',function(done){
        var taskId = 4;
        request(app) 
        .get('/task/id/'+taskId)
        .then(function(response){
            expect(response.status).to.equal(200);
            var data = response.body;
            expect(data.code).to.equal('taskFound');
            expect(data).to.have.property('data');
            var responseData = data.data[0];
            expect(responseData).to.have.property('id');
            expect(responseData.id).to.equal(taskId);
            done();
        })
        .catch(function(error){
            done(new Error(error));
        });
    });    

});
