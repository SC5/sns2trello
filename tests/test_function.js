var expect = require('expect'),
    lambda = require('lambda-wrapper'),
    lambdaFunc = require('../src/index.js');

lambda.init(lambdaFunc);

var testBoardId = 'HbwtYXbD';

function tomorrow() {
    // Calculate due date
    var dueDate = new Date();
    dueDate.setHours(dueDate.getHours() + 24)

    return dueDate;
}

describe('sns2slack', function() {
    this.timeout(10000);
    it('Returns error if trelloBoardId is missing', function(done) {
        lambda.run({ Records: [ 
            { Sns: 
                { Message: JSON.stringify({
                    cardName: 'sns2slack ' + new Date(),
                    carDescription: 'foobar',
                    dueDate: tomorrow()
                })}
            }
        ]}, function(error, response) {
            if (error) {
                expect(error).toMatch(/trelloBoardId/);
                return done();
            }
            done('EXPECTED ERROR');
        });
    });

    it('Create a card in Trello', function(done) {
        lambda.run({ Records: [ 
            { Sns: 
                { Message: JSON.stringify({
                    trelloBoardId: testBoardId,
                    cardName: 'sns2slack ' + new Date(),
                    carDescription: 'foobar',
                    dueDate: tomorrow()
                })}
            }
        ]}, function(error, response) {
            if (error) {
                return done(error);
            }
            console.log(response);
            done();
        });
    });
});
