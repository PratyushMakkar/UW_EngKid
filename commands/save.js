const { SlashCommandBuilder } = require("discord.js");
const models = require("../models");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("save")
		.setDescription("Saves an image to database")
		.addAttachmentOption((option) =>
			option
				.setRequired(true)
				.setName("image")
				.setDescription("The image to save")
		),
	async execute(interaction) {
		const attachment = interaction.options.getAttachment("image");

		// creating image to be saved
		const image = new models.imageModel({
			_id: attachment.id,
			name: attachment.name,
			description: attachment.description,
			date: { type: Date, default: Date.now },
			imgUrl: attachment.attachment,
			contentType: attachment.contentType,
			dimensions: {
				height: attachment.height,
				width: attachment.width,
			},
		});

		// saving to database
		const result = await models.userModel.updateOne(
			{ _id: interaction.user.id },
			{ $push: { imgs: image }, $inc: { numSaved: 1 } },
			{ upsert: true, new: true, setDefaultsOnInsert: true }
		);

		interaction.reply("Image saved!");

		return result;
	},
};
