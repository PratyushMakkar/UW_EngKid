const { SlashCommandBuilder } = require("discord.js");
const { API_URL } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wordcloud")
    .setDescription("Everything about wordclouds"),
  async execute(interaction) {
    const options = {
      url: API_URL + "/wordcloud",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "some testing words to generate a random word cloud",
      }),
    };

    // defer reply in case of cold start
    interaction.deferReply();
    try {
      await axios
        .post(API_URL.concat("/wordcloud"), {
          text: "some testing words to generate a random word cloud",
        })
        .then(async function (response) {
          await interaction.editReply({
            files: [
              {
                name: "wordcloud.jpeg",
                attachment: Buffer.from(response["data"], "base64"),
              },
            ],
          });
        });
      console.log(response);
    } catch (error) {
      console.log(error);
      interaction.reply("oops something went wrong");
    }
  },
};
