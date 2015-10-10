var Slack = require('slack-node');
var Promise = require('bluebird');
var config = require('./config.json');
var logger = require('./logger.js');
var attchtext_maxlen = 8000;

var slack = new Slack(config.channelToken, config.domain);

/**
 * Send message to slack user / channel
 * @param  {String} channel   #channelname / @username
 * @param  {String} message   The message
 * @param  {Array} attachments Attachements to send ( {title: TITLE, text: contents})
 * @return {Promise}        Promise that gets resolved message message is delivered
 */  
var sendMessageFn = function(channel, message, iconEmoji, senderName, attachments) {
    var attchsParsed;
    if (attachments != undefined) {
        var attchsParsed = [];
        for (var i=0; i < attachments.length; i++) {
            if (attachments[i].text.length <= attchtext_maxlen) {
                attchsParsed.push(attachments[i]);
            } else {
                var rows = attachments[i].text.split(/\n/);
                var attchtext = '';
                var attchtitle = attachments[i].title;
                var partnum = 1;
                var thistitle = '';
                for (var j=0; j < rows.length; j++) {
                    thistitle = attchtitle + ' (Part ' + partnum + ')'
                    if ((Buffer.byteLength(attchtext, 'utf8') + Buffer.byteLength(rows[j], 'utf8')) > attchtext_maxlen ) {
                        attchsParsed.push({
                            title : thistitle,
                            text : attchtext
                        });
                        attchtext = '';
                        partnum ++;
                    }
                    attchtext += rows[j] + "\n";
                }
                // add the last buffer to the attachments
                attchsParsed.push({
                    title : thistitle,
                    text : attchtext
                });
            }
        }
    }
    var post = {
        channel : channel,
        text : message,
        username : senderName,
    };
    if (attchsParsed != undefined) {
        post.attachments = attchsParsed;
    }
    if (iconEmoji != undefined) {
        post.iconEmoji = iconEmoji;
    }

    return new Promise(function(resolve, reject) {
        slack.webhook(post, function(err, response) {
            if (err) {
                return reject(err);
            }
            console.log('SLACK POST' + JSON.stringify([err, response], null, ' '));
            return resolve(response);
        });
    });

};

module.exports = exports = {
    sendMessage: sendMessageFn
};

