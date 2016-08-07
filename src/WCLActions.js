"use strict";
var request = require('request');
var prettyjson = require("prettyjson");
class WCLActions {
    retrieveParse(bot, message, characterName, serverName, serverRegion) {
        console.log(message);
        var messageArray = message.content.split(' ');
        if (messageArray.length !== 4) {
            bot.reply(message, "Need to enter ```!parse *CHARACTER_NAME* *SERVER_NAME* *REGION*```");
        }
        else {
            var characterName = messageArray[1];
            var serverName = messageArray[2];
            var serverRegion = messageArray[3];
            let that = this;
            let uri = `https://www.warcraftlogs.com:443/v1/parses/character/${characterName}/${serverName}/${serverRegion}?api_key=${process.env.WCL_PUBLIC_KEY}`;
            console.log(uri);
            request(uri, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    bot.reply(message, response);
                }
                else {
                    bot.reply(message, body);
                }
            });
        }
    }
    getClasses(bot, message) {
        let uri = `http://www.warcraftlogs.com/v1/classes?api_key=${process.env.WCL_PUBLIC_KEY}`;
        console.log(uri);
        request({ method: 'GET', uri: uri, json: true }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                console.log(`getClasses response: ${response}`);
                let playerClasses = response.body;
                bot.sendMessage(message.channel, `\`\`\`${prettyjson.render(playerClasses)}\`\`\`\n`);
            }
            else {
                bot.reply(message, body.toString());
            }
        });
    }
    getZones(bot, message) {
        let uri = `http://www.warcraftlogs.com/v1/zones?api_key=${process.env.WCL_PUBLIC_KEY}`;
        console.log(uri);
        request({ method: 'GET', uri: uri, json: true }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let zones = response.body;
                console.log(`zones: ${prettyjson.render(zones)}`);
                bot.sendMessage(message.channel, `\`\`\`${prettyjson.render(zones)}\`\`\`\n`);
            }
            else {
                bot.sendMessage(message.channel, `\`\`\`${prettyjson.render(body)}\`\`\`\n`);
            }
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WCLActions;
