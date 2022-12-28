module.exports = {
	name: "messageCreate",
	async execute(message) {
		const contenet = new MessageContent(
            message.channelId,
            message.author.id,
            message.content,
            message.createdTimestamp
        )
    }
};
