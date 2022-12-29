const {MessageContent} = require('../Models/MessageContent');
const { BotMessages, BotServers, BotChannels } = require('./sequelModels');

async function ChannelIDExistsInServer(channelID_, severID_) {
    return false;
}

async function InsertMessageIntoDatabase(messageContent) {
    const message = await BotMessages.create({
        MessageChannelID: messageContent.channelID,
        MessageAuthorID: messageContent.author,
        MessageContent: messageContent.contentText
    });
    return message.dataValues
}

function SearchMessageWithinDatabase(channelID, Author) {
    return {}
}

async function InsertChannelIDIntoServer(channelID_, serverID_) {
    if (ChannelIDExistsInServer(channelID_, serverID_)) return;
    
    const message = await BotChannels.create({
        ServerID: serverID_,
        MessageChannelID: channelID_
    });
    return message.dataValues
}

function GetChannelIDFromServer(serverID) {

}

function JoinServer(serverID, serverName) {
   
}

function ClearAllTables() {

}

module.exports = {
    InsertChannelIDIntoServer,
    InsertMessageIntoDatabase,
    JoinServer,
    ClearAllTables,
    GetChannelIDFromServer,
    SearchMessageWithinDatabase
}