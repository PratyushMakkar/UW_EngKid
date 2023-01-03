const {InsertMessageIntoDatabase} = require('../sequelize/BotCRUDFunctions')
const {MessageContent} = require('../Models/MessageContent')
module.exports = {
  name: "messageCreate",
  async execute(message) {
      const content = new MessageContent(
        message.channelId,
        message.author.id,
        message.content,
        message.createdTimestamp
      ).SetGuildID(message.guildId)
    const result = await InsertMessageIntoDatabase(content)
    console.log(result)
  },
};
