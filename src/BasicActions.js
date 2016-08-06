"use strict";
var BasicActions = (function () {
    function BasicActions() {
    }
    BasicActions.prototype.pong = function (bot, message) {
        if (bot) {
            bot.reply(message, "pong");
        }
        else {
            console.log("Error");
        }
    };
    ;
    BasicActions.prototype.listChannels = function (bot, message) {
        var channels = bot.channels.map(function (channel) {
            return channel.name;
        });
        bot.sendMessage(channels);
    };
    ;
    return BasicActions;
}());
exports.__esModule = true;
exports["default"] = BasicActions;
//# sourceMappingURL=BasicActions.js.map