const {
	SlashCommandBuilder,
	SlashCommandSubcommandGroupBuilder,
} = require("discord.js");
const axios = require("axios");
const { lambda_endpoint } = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("generate")
		.setDescription("Generates a face from seed")
		.addNumberOption((option) =>
			option
				.setRequired(true)
				.setName("seed")
				.setDescription("The seed to generate the image")
		),
	async execute(interaction) {
		const instance = axios.create({
			baseURL: lambda_endpoint,
			timeout: 60000,
			headers: { ContentType: "application/json" },
		});
		await interaction.deferReply();
		await instance
			.post(lambda_endpoint, {
				method: "POST",
				ContentType: "image/png",
				seed: interaction.options.getNumber("seed"),
			})
			.then(async function (response) {
				// img = `data:image/jpeg;base64,${response["data"]}`;
				await interaction.editReply({
					files: [
						{
							name: "image.jpeg",
							attachment: Buffer.from(response["data"], "base64"),
						},
					],
				});
			})
			.catch(async function (err) {
				console.log(err);
			});
	},
};
