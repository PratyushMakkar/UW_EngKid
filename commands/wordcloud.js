const { default: axios } = require("axios");
const { SlashCommandBuilder } = require("discord.js");
const { API_URL } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wordcloud")
    .setDescription("Everything about wordclouds")
    .addStringOption((option) =>
      option
        .setRequired(true)
        .setName("data")
        .setDescription("generation string for word cloud")
    ),
  async execute(interaction) {
    // defer reply in case of cold start
    await interaction.deferReply();

    try {
      await axios
        .post(API_URL.concat("/wordcloud"), {
          text: interaction.options.getString("data"),
          settings: {},
        })
        .then(async function (response) {
          await interaction.editReply({
            files: [
              {
                name: "image.jpeg",
                attachment: Buffer.from(response["data"]["body"], "base64"),
              },
            ],
          });
        });
    } catch (error) {
      console.log(error);
      await interaction.editReply("oops something went wrong");
    }
  },
};
