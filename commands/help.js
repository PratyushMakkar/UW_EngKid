const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Returns a menu of all commands."),
	async execute(interaction) {
		const embed = {
			color: 0x0099ff,
			title: "Help Menu",
			url: "https://discord.js.org",
			description: "A very simple list of available commands!",
			author: {
				name: interaction.client.user.username,
				icon_url: interaction.client.user.displayAvatarURL(),
				url: "https://discord.js.org",
			},
			fields: [
				{
					name: "Commands",
					value: Array.from(interaction.client.commands.keys()).join(
						", "
					),
				},
			],
			timestamp: new Date(),
			footer: {
				text: "Brought to you by the losers",
				// icon_url: "https://i.imgur.com/AfFp7pu.png",
			},
		};

		await interaction.reply({
			// well i never knew that embeds had to be sent in an array :/
			embeds: [embed],
		});
	},
};
