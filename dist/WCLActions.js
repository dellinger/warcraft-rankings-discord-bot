"use strict";
var request = require('request');
var prettyjson = require("prettyjson");
let dificultyMap = {
    5: "MYTHIC",
    4: "HEROIC",
    3: "NORMAL"
};
class WCLActions {
    retrieveParse(bot, message, characterName, serverName, serverRegion) {
        console.log(message);
        var messageArray = message.content.split(' ');
        if (messageArray.length !== 5) {
            bot.reply(message, "Need to enter ```!parse *CHARACTER_NAME* *SERVER_NAME* *REGION* *BOSS*```");
        }
        else {
            var characterName = messageArray[1];
            var serverName = messageArray[2];
            var serverRegion = messageArray[3];
            let boss = messageArray[4];
            let that = this;
            let uri = `https://www.warcraftlogs.com:443/v1/parses/character/${characterName}/${serverName}/${serverRegion}?api_key=${process.env.WCL_PUBLIC_KEY}&metric=dps&compare=1`;
            console.log(uri);
            request(uri, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let test = JSON.parse(response.body);
                    let characterParse = !JSON.parse(response.body);
                    let botReply = "";
                    //TODO: Working on this to get this narrowed down...for boss...may need to add it to query param
                    characterParse.forEach((parse, index, array) => {
                        if (parse.name.toLocaleUpperCase().indexOf(boss.toLocaleUpperCase()) > -1) {
                            botReply += `--- ${dificultyMap[parse.difficulty]} ${parse.name} ---\n`;
                            parse.specs.forEach((spec, index, array) => {
                                botReply += `\tBest ${spec.spec} DPS: ${spec.best_persecondamount}-\n`;
                            });
                        }
                    });
                    bot.reply(message, botReply);
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
        var messageArray = message.content.split(' ');
        request({ method: 'GET', uri: uri, json: true }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let zones = response.body;
                if (messageArray.length === 2) {
                    let zoneToSearchFor = messageArray[1].toLocaleUpperCase();
                    let isFound = false;
                    zones.every((value, index, array) => {
                        if (value.name.toLocaleUpperCase() === zoneToSearchFor || value.name.toLocaleUpperCase().indexOf(zoneToSearchFor) > -1) {
                            console.log(`Found zone user selected`);
                            bot.sendMessage(message.channel, `\`\`\`${prettyjson.render(value)}\`\`\`\n`);
                            isFound = true;
                            return false;
                        }
                        return true;
                    });
                    if (!isFound) {
                        bot.sendMessage(message.channel, `Could not find zone with name '${zoneToSearchFor}'`);
                    }
                }
                else {
                    // all zones
                    bot.sendMessage(message.channel, `\`\`\`${prettyjson.render(zones.map(a => { return `${a.id} :: ${a.name}`; }))}\`\`\`\n`);
                }
            }
            else {
                bot.sendMessage(message.channel, `\`\`\`${prettyjson.render(body)}\`\`\`\n`);
            }
        });
    }
    getCharacterRankings(bot, message, characterName, serverName, serverRegion) {
        let uri = `http://www.warcraftlogs.com/v1/rankings/character${characterName}/${serverName}/${serverRegion}?api_key=${process.env.WCL_PUBLIC_KEY}`;
        console.log(uri);
        request({ method: 'GET', uri: uri, json: true }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let ranks = response.body;
                console.log(`ranks: ${prettyjson.render(ranks)}`);
                bot.sendMessage(message.channel, `\`\`\`${prettyjson.render(ranks)}\`\`\`\n`);
            }
            else {
                bot.sendMessage(message.channel, `\`\`\`${prettyjson.render(body)}\`\`\`\n`);
            }
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WCLActions;
