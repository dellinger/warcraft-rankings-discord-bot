var request = require('request');
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
            let uri = `https://www.warcraftlogs.com/v1/parses/character/${characterName}/${serverName}/${serverRegion}?api_key=${process.env.WCL_PUBLIC_KEY}`;
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

}