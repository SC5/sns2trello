/**
 * @api {SNS} Slack SNS Postman
 * @apiName apiName (e.g. accounts)
 * @apiGroup apiGroup (e.g.)
 *
 * @apiParam {String} Paramname (input)
 *
 * @apiSuccess {String} OutputKey 
 */

var Trello = require('node-trello');
var config = require('./config.json');
var trelloClient = new Trello(config.key, config.token);

function getList(boardId, listId, cb) {
    if (listId) {
        cb(null, listId);
    }
    trelloClient.get('/1/boards/' + boardId + '/lists', function (err, data) {
        if (err) {
            cb(err);
        }
        if (!data || (data.length === 0)) {
            cb('ERROR: No lists for board ' + trelloBoardId);
        }
        cb(null, data[0].id);
    });
}

module.exports = exports = {
    handler : function(event, context) {
        var postEvent = JSON.parse(event.Records[0].Sns.Message);
        var trelloBoardId = postEvent.trelloBoardId;
        var trelloListId = postEvent.trelloListId;

        if (! trelloBoardId) {
            return context.fail('ERROR: trelloBoardId missing');
        }
        if (! postEvent.cardName) {
            return context.fail('ERROR: card does not have a name');
        }

        getList(trelloBoardId, trelloListId, function(err, listId) {
            var newCardData = {
                name: postEvent.cardName,
                desc: postEvent.cardDescription,
                idList: listId,
                pos: 'bottom', // Add card to the bottom to support FIFO process
                due: postEvent.dueDate,
                urlSource: null
            };
            trelloClient.post('/1/cards/', newCardData, function(err, data) {
                if (err) {
                    return context.fail(err);
                }
                context.succeed(data);
            });
        });
    }
};
