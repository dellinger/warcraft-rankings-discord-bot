"use strict";
var Discord = require("discord.js");
import BasicActions from "./BasicActions";
var botToken = "MjExMjM1MzE4MTM5OTc3NzMx.Coae-A.H45w2qx9Rm82J3J80J6VOyrEPRI";

export class DiscordBot {

    public bot;
    public supportedActions = {};
    constructor() {
        this.bot = new Discord.Client();
        var basicActions = new BasicActions(this.bot);
        this.initialize();
        this.supportedActions['!ping'] = basicActions.pong;
        this.supportedActions["!help"] = this.listCommands;
    }

    initialize() {
        let that = this;
        console.log("Logging in...");
        this.bot.loginWithToken(botToken, (error, token) => {
            if(error){
                console.error("Error occured");
            }
            console.log(`Token: ${token}`);
        });

        this.bot.on("message", message => {
            console.log(`Message: ${message.cleanContent}`);
            let messageArray = message.cleanContent.split(" ");
            let potentialAction = messageArray[0];
            let temp = messageArray.splice(1, messageArray.length);
            console.log(`Temp: ${temp}`);
            console.log(`Potential Action: ${potentialAction}`);
            if(that.isSupportedAction(potentialAction)) {
                console.log(`'${potentialAction}' is supported!`);
                let action = that.supportedActions[potentialAction];
                action(that.bot,message,...temp);
            }
        });
    }

    listCommands = (bot,message) => {
        let that = this;
        let actions = "";
        Object.getOwnPropertyNames(that.supportedActions).forEach((val, idx, array) => {
           actions += `\`\`\`${val}\`\`\`\n`
        });
        bot.sendMessage(message.channel,`This bot recognizes the following commands:\n ${actions}`);
    };

    isSupportedAction = (message) => {
        return this.supportedActions.hasOwnProperty(message);
    };


}