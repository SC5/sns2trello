var expect = require('expect'),
    lambda = require('lambda-wrapper'),
    lambdaFunc = require('../src/index.js');

lambda.init(lambdaFunc);

describe('sns2slack', function() {
    this.timeout(10000);
    it('Send a message to a group', function(done) {
        lambda.run({ Records: [ 
            { Sns: 
                { Message: JSON.stringify({
                    channel: '#sns2slack',
                    message: 'Test Message',
                    senderName: 'sns2slack tests'
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
