"use strict";
var Discord = require("discord.js");

var botToken = "MjExMjM1MzE4MTM5OTc3NzMx.Coae-A.H45w2qx9Rm82J3J80J6VOyrEPRI";

export class DiscordBot {
    //supportedActions = {};

    constructor() {
        this.bot = new Discord.Client();
        console.log("Logging in...");
        this.bot.loginWithToken(botToken, (error, token) => {
           if(error){
               console.error("Error occured");
           }
            console.log(`Token: ${token}`);
        });


        this.bot.on('message', message =>{
            if(message.content === "ping") {
                this.bot.reply(message, "pong");
            }
        });
    }


}