"use strict";
var request = require('request');
var WCLActions = (function () {
    function WCLActions() {
    }
    WCLActions.prototype.retrieveParse = function (bot, message, characterName, serverName, serverRegion) {
        console.log(message);
        var messageArray = message.content.split(' ');
        if (messageArray.length !== 4) {
            bot.reply(message, "Need to enter ```!parse *CHARACTER_NAME* *SERVER_NAME* *REGION*```");
        }
        else {
            var characterName = messageArray[1];
            var serverName = messageArray[2];
            var serverRegion = messageArray[3];
            var that = this;
            var uri = "https://www.warcraftlogs.com/v1/parses/character/" + characterName + "/" + serverName + "/" + serverRegion + "?api_key=" + process.env.WCL_PUBLIC_KEY;
            console.log(uri);
            request(uri, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    bot.reply(message, response);
                }
                else {
                    bot.reply(message, body);
                }
            });
        }
    };
    return WCLActions;
}());
exports.__esModule = true;
exports["default"] = WCLActions;
//# sourceMappingURL=WCLActions.js.map