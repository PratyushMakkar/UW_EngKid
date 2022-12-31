const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("settings")
    .setDescription("change settings of bot on your server"),
  async execute(interaction) {
    const embed = new EmbedBuilder();
    await interaction.reply({ embeds: [embed] });
  },
};
