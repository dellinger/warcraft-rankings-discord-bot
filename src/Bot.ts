"use strict";
import * as Discord from "discord.js";
import BasicActions from "./BasicActions";
import WCLActions from "./WCLActions";
var botToken = "MjExMjM1MzE4MTM5OTc3NzMx.Coae-A.H45w2qx9Rm82J3J80J6VOyrEPRI";

export class DiscordBot {

    public bot : Discord.Client;
    public supportedActions = {};
    constructor() {
        this.bot = new Discord.Client();
        var basicActions = new BasicActions();
        var wclActions = new WCLActions();
        this.initialize();
        this.supportedActions['!ping'] = basicActions.pong;
        this.supportedActions["!help"] = this.listCommands;
        
        this.supportedActions["!parse"] = wclActions.retrieveParse;
        this.supportedActions["!classes"] = wclActions.getClasses;
        this.supportedActions["!zones"] = wclActions.getZones;
    }

    //TODO: Make this a promise?
    initialize() {
        let that = this;
        console.log("Logging in...");
    
        this.bot.loginWithToken(botToken,null,null, (error : Error, token : string) => {
            if(error){
                console.error("Error occured");
            }
            console.log(`Token: ${token}`);
        });

        this.bot.on("message", message => {
            console.log(`Message: ${message.cleanContent}`);
            let messageArray = message.cleanContent.split(" ");
            let potentialAction = messageArray[0];
            let splicedMessageArray = messageArray.splice(1, messageArray.length);
            console.log(`splicedMessageArray: ${splicedMessageArray}`);
            console.log(`Potential Action: ${potentialAction}`);
            if(that.isSupportedAction(potentialAction)) {
                console.log(`'${potentialAction}' is supported!`);
                let action = that.supportedActions[potentialAction];
                action(that.bot,message,...splicedMessageArray);
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
        let isSupported = this.supportedActions.hasOwnProperty(message);
        console.log(`isSupported: ${isSupported}`);
        return isSupported;
    };


}