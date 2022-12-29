const {
  MessageContent,
  ChannelContent,
  ServerContent,
} = require("../Models/MessageContent");
const { sequelize } = require("./SequelConfig");
const { BotMessages, BotServers, BotChannels } = require("./sequelModels");

async function InsertMessageIntoDatabase(messageContent) {
  await InsertChannelIDIntoServer(
    messageContent.channelID,
    messageContent.guildID
  );

  var message = await BotMessages.create({
    MessageChannelID: messageContent.channelID,
    MessageAuthorID: messageContent.author,
    MessageContent: messageContent.contentText,
  });

  const content = new MessageContent(
    message.dataValues.MessageChannelID,
    message.dataValues.MessageAuthorID,
    message.dataValues.MessageContent,
    message.dataValues.MessageTimestamp
  );
  return content;
}

async function SearchMessageWithinDatabase(channelID_, author_) {
  var results = await BotMessages.findAll({
    where: {
      MessageChannelID: channelID_,
      MessageAuthorID: author_,
    },
  });

  var ReturnValues = [];
  results.forEach((element, index) => {
    const content = new MessageContent(
      element.dataValues.MessageChannelID,
      element.dataValues.MessageAuthorID,
      element.dataValues.MessageContent,
      element.dataValues.MessageTimestamp
    );
    ReturnValues[results.length - (index + 1)] = content;
  });
  return ReturnValues;
}

async function InsertChannelIDIntoServer(channelID_, serverID_) {
  var result = await BotChannels.findOrCreate({
    where: {
      ServerID: serverID_,
      MessageChannelID: channelID_,
    },
  });

  var BotChannelJSON = result[0].dataValues;
  return new ChannelContent(
    BotChannelJSON.ServerID,
    BotChannelJSON.MessageChannelID
  );
}

async function GetChannelIDFromServer(serverID_) {
  const results = await BotChannels.findAll({
    where: {
      serverID: serverID_,
    },
  });

  var ReturnValues = [];
  results.forEach((element, index) => {
    const content = new ChannelContent(
      element.dataValues.ServerID,
      element.dataValues.MessageChannelID
    );
    ReturnValues[results.length - (index + 1)] = content;
  });
  return ReturnValues;
}

async function JoinServer(serverID_, serverName_) {
  const results = await BotServers.create({
    serverID: serverID_,
    serverName: serverName_,
  });

  var BotServerJSON = results[0].dataValues;
  return new ServerContent(
    BotServerJSON.ServerID,
    BotServerJSON.ServerName,
    BotServerJSON.DateJoined
  );
}

async function ClearAllTables() {
  await BotChannels.sync({ force: true });
  await BotServers.sync({ force: true });
  await BotMessages.sync({ force: true });
}

async function CloseConnection() {
  sequelize.close();
}

module.exports = {
  InsertChannelIDIntoServer,
  InsertMessageIntoDatabase,
  JoinServer,
  ClearAllTables,
  GetChannelIDFromServer,
  SearchMessageWithinDatabase,
  CloseConnection,
};
