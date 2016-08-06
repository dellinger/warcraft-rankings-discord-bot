"use strict";
var Discord = require("discord.js");
var BasicActions_1 = require("./BasicActions");
var botToken = "MjExMjM1MzE4MTM5OTc3NzMx.Coae-A.H45w2qx9Rm82J3J80J6VOyrEPRI";
var DiscordBot = (function () {
    function DiscordBot() {
        var _this = this;
        this.supportedActions = {};
        this.listCommands = function (bot, message) {
            var that = _this;
            var actions = "";
            Object.getOwnPropertyNames(that.supportedActions).forEach(function (val, idx, array) {
                actions += "```" + val + "```\n";
            });
            bot.sendMessage(message.channel, "This bot recognizes the following commands:\n " + actions);
        };
        this.isSupportedAction = function (message) {
            return _this.supportedActions.hasOwnProperty(message);
        };
        this.bot = new Discord.Client();
        var basicActions = new BasicActions_1["default"](this.bot);
        this.initialize();
        this.supportedActions['!ping'] = basicActions.pong;
        this.supportedActions["!help"] = this.listCommands;
    }
    DiscordBot.prototype.initialize = function () {
        var that = this;
        console.log("Logging in...");
        this.bot.loginWithToken(botToken, function (error, token) {
            if (error) {
                console.error("Error occured");
            }
            console.log("Token: " + token);
        });
        this.bot.on("message", function (message) {
            console.log("Message: " + message.cleanContent);
            var messageArray = message.cleanContent.split(" ");
            var potentialAction = messageArray[0];
            var temp = messageArray.splice(1, messageArray.length);
            console.log("Temp: " + temp);
            console.log("Potential Action: " + potentialAction);
            if (that.isSupportedAction(potentialAction)) {
                console.log("'" + potentialAction + "' is supported!");
                var action = that.supportedActions[potentialAction];
                action.apply(void 0, [that.bot, message].concat(temp));
            }
        });
    };
    return DiscordBot;
}());
exports.DiscordBot = DiscordBot;
//# sourceMappingURL=Bot.js.map