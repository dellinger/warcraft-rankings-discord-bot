var request = require('request');
var prettyjson = require("prettyjson");

interface Encounter {
    id: number
    name: string
}

interface Bracket {
    id: number
    name: string
}

interface Zone {
    id: number
    name: string
    frozen: boolean
    encounters: Encounter[]
    brackets: Bracket[]
}

interface Specialization {
    id: number
    name: string
}

interface PlayerClass {
    id: number
    name: string
    specs: Specialization[]
}


export default class WCLActions {

    retrieveParse(bot: any, message: any, characterName :string, serverName: string, serverRegion : string) {
        console.log(message);
        var messageArray : string[] = message.content.split(' ');
        if(messageArray.length !== 4) {
            bot.reply(message, "Need to enter ```!parse *CHARACTER_NAME* *SERVER_NAME* *REGION*```");
        } else {
            var characterName = messageArray[1];
            var serverName = messageArray[2];
            var serverRegion = messageArray[3];
            let that = this;
            let uri = `https://www.warcraftlogs.com:443/v1/parses/character/${characterName}/${serverName}/${serverRegion}?api_key=${process.env.WCL_PUBLIC_KEY}`;
            console.log(uri);
            request(uri, (error, response, body) => {
                if(!error && response.statusCode == 200) {
                    bot.reply(message, response);
                } else {
                    bot.reply(message, body);
                }
            });
        }
    }

    public getClasses(bot : any, message:any) {
        let uri = `http://www.warcraftlogs.com/v1/classes?api_key=${process.env.WCL_PUBLIC_KEY}`;
        console.log(uri);
        request({ method : 'GET', uri: uri, json: true}, (error, response, body) => {
            if(!error && response.statusCode == 200) {
                console.log(`getClasses response: ${response}`);
                let playerClasses : PlayerClass[] = response.body;
                bot.sendMessage(message.channel, `\`\`\`${prettyjson.render(playerClasses)}\`\`\`\n`);
            } else {
                bot.reply(message, body.toString());
            }
        });
    }

    public getZones(bot: any, message: any) {
        let uri = `http://www.warcraftlogs.com/v1/zones?api_key=${process.env.WCL_PUBLIC_KEY}`;
        console.log(uri);
        request({ method : 'GET', uri: uri, json: true}, (error, response, body) => {
            if(!error && response.statusCode == 200) {

                let zones : Zone[] = response.body;
                console.log(`zones: ${prettyjson.render(zones)}`);
                bot.sendMessage(message.channel, `\`\`\`${prettyjson.render(zones)}\`\`\`\n`);
            } else {
                bot.sendMessage(message.channel, `\`\`\`${prettyjson.render(body)}\`\`\`\n`);
            }
        });
    }



}