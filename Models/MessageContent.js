const { time } = require("discord.js");

class MessageContent {
    constructor(channelID, author, contentText, timestamp) {
        this.channelID = channelID;
        this.author = author;
        this.contentText = contentText;
        this.timestamp = timestamp; 
    }
}

module.exports = { MessageContent }