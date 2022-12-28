module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
		// command handler
		if (!interaction.isChatInputCommand()) return;
		const command = interaction.client.commands.get(
			interaction.commandName
		);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: "Sorry, something went wrong!",
				ephemeral: true,
			});
		}

		// console.log(
		// 	`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
		// );
	},
};
