/**
 * @api {SNS} Slack SNS Postman
 * @apiName apiName (e.g. accounts)
 * @apiGroup apiGroup (e.g.)
 *
 * @apiParam {String} Paramname (input)
 *
 * @apiSuccess {String} OutputKey 
 */

var slack = require('./slack');

module.exports = exports = {
    handler : function(event, context) {
        var postEvent = JSON.parse(event.Records[0].Sns.Message);
        var channel = postEvent.channel;
        var message = postEvent.message;
        var iconEmoji = postEvent.iconEmoji;
        var senderName = postEvent.senderName;
        var attachments = postEvent.attachments;

        slack.sendMessage(channel, 
            message, 
            iconEmoji, 
            senderName, 
            attachments)
        .then(context.succeed, context.fail);
    }
};
