
export default class BasicActions {
    pong(bot,message){
        if(bot){
            bot.reply(message, "pong");
        } else {
            console.log("Error");
        }

    };

    listChannels(bot,message){
        let channels = bot.channels.map((channel) => {
            return channel.name;
        });
        bot.sendMessage(channels);
    };

}