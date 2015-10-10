var warnFn = function(message) {
    console.log("WARN:" + message);
}

var errorFn = function(message) {
    console.log("ERROR:" + message);
}

module.exports = exports = {
    warn: warnFn,
    error: errorFn
}