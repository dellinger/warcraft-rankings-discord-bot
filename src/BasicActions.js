
export default class BasicActions {

    constructor(bot) {
        this.bot = bot;
    }

    pong = (message) => {
        this.bot.reply(message, "pong");
    };

    listChannels = (message) => {
        let channels = this.bot.channels.map((channel) => {
            return channel.name;
    });
    this.bot.sendMessage(channels);
};

}