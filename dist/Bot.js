///<reference path="../typings/tsd.d.ts" />
"use strict";
const Discord = require("discord.js");
const BasicActions_1 = require("./BasicActions");
const WCLActions_1 = require("./WCLActions");
class DiscordBot {
    constructor() {
        this.supportedActions = {};
        this.listCommands = (bot, message) => {
            let that = this;
            let actions = "";
            Object.getOwnPropertyNames(that.supportedActions).forEach((val, idx, array) => {
                actions += `\`\`\`${val}\`\`\`\n`;
            });
            bot.sendMessage(message.channel, `This bot recognizes the following commands:\n ${actions}`);
        };
        this.isSupportedAction = (message) => {
            let isSupported = this.supportedActions.hasOwnProperty(message);
            return isSupported;
        };
        //TODO: DI these later?
        this.bot = new Discord.Client();
        var basicActions = new BasicActions_1.default();
        var wclActions = new WCLActions_1.default();
        this.initialize();
        this.supportedActions['!ping'] = basicActions.pong;
        this.supportedActions["!help"] = this.listCommands;
        this.supportedActions["!parse"] = wclActions.retrieveParse;
        this.supportedActions["!classes"] = wclActions.getClasses;
        this.supportedActions["!zones"] = wclActions.getZones;
        this.supportedActions["!rank"] = wclActions.getCharacterRankings;
    }
    //TODO: Make this a promise?
    initialize() {
        let that = this;
        console.log("Logging in...");
        this.bot.loginWithToken(process.env.BOT_TOKEN, null, null, (error, token) => {
            if (error) {
                console.error("Error occured");
            }
            console.log(`Token: ${token}`);
        });
        this.bot.on("message", message => {
            if (!message.author.bot) {
                let messageArray = message.cleanContent.split(" ");
                let potentialAction = messageArray[0];
                let splicedMessageArray = messageArray.splice(1, messageArray.length);
                console.log(`Potential Action: ${potentialAction}`);
                if (that.isSupportedAction(potentialAction)) {
                    console.log(`'${potentialAction}' is supported!`);
                    let action = that.supportedActions[potentialAction];
                    action(that.bot, message, ...splicedMessageArray);
                }
            }
        });
    }
}
exports.DiscordBot = DiscordBot;
