"use strict";
class BasicActions {
    pong(bot, message) {
        if (bot) {
            bot.reply(message, "pong");
        }
        else {
            console.log("Error");
        }
    }
    ;
    listChannels(bot, message) {
        let channels = bot.channels.map((channel) => {
            return channel.name;
        });
        bot.sendMessage(channels);
    }
    ;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BasicActions;

//# sourceMappingURL=BasicActions.js.map
