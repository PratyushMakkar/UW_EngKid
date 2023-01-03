const { default: axios } = require("axios");
const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const { API_URL, API_KEY } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wordcloud")
    .setDescription("Everything about wordclouds")
    .addStringOption((option) =>
      option
        .setRequired(true)
        .setName("data")
        .setDescription("generation string for word cloud")
    )
    .addBooleanOption((option) =>
      option.setName("repeat").setDescription("reuse words?")
    )
    .addBooleanOption((option) =>
      option
        .setName("mask")
        .setDescription(
          "whether or not a colored mask will be used to generate your word cloud"
        )
    )
    .addNumberOption((option) =>
      option.setName("width").setDescription("pixel width of cloud")
    )
    .addNumberOption((option) =>
      option.setName("height").setDescription("pixel height of cloud")
    )
    .addNumberOption((option) =>
      option.setName("contour_width").setDescription("width of contour lines")
    )
    .addNumberOption((option) =>
      option.setName("max_words").setDescription("max words in word gram")
    )
    .addNumberOption((option) =>
      option
        .setName("max_font_size")
        .setDescription("sets the max font size of cloud")
    )
    .addNumberOption((option) =>
      option
        .setName("min_font_size")
        .setDescription("sets the min font size of cloud")
    )
    .addStringOption((option) =>
      option.setName("background_color").setDescription("background color")
    )
    .addStringOption((option) =>
      option
        .setName("contour_color")
        .setDescription("choose color to draw around")
    ),
  async execute(interaction) {
    // defer reply in case of cold start
    await interaction.deferReply();

    const settings = {};

    // console.log(interaction.options.data);
    interaction.options.data.forEach((option) => {
      if (option["name"] !== "data") {
        settings[option["name"]] = option["value"];
      }
    });

    // parsing some  option logic
    if (interaction.options.getBoolean("mask")) {
      const filter = (message) => {
        let match = true;
        if (message.author.id !== interaction.user.id) match = false;
        if (message.attachments.size > 0) {
          return match;
        }
      };

      await interaction
        .editReply({
          content: "Please send an image you'd like to use as mask",
          fetchReply: true,
        })
        .then(async () => {
          await interaction.channel
            .awaitMessages({ filter, max: 1, time: 30000, errors: ["time"] })
            .then((collected) => {
              // load url into settings
              // console.log(collected.first().attachments.first().url);
              settings["mask"] = collected.first().attachments.first().url;
              interaction.followUp("mask received");
            })
            .catch((collected) => {
              console.log(collected);
              interaction.followUp("Looks like no mask was submitted.");
            });
        });
    }

    // load data and setup
    const body = {
      text: interaction.options.getString("data"),
      settings: settings,
    };
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    };

    // [--text file] [--regexp regexp] [--stopwords file]
    //                  [--imagefile file] [--fontfile path] [--mask file]
    //                  [--colormask file] [--contour_width width]
    //                  [--contour_color color] [--relative_scaling rs]
    //                  [--margin width] [--width width] [--height height]
    //                  [--color color] [--background color] [--no_collocations]
    //                  [--include_numbers] [--min_word_length min_word_length]
    //                  [--prefer_horizontal ratio] [--scale scale]
    //                  [--colormap map] [--mode mode] [--max_words N]
    //                  [--min_font_size size] [--max_font_size size]
    //                  [--font_step step] [--random_state seed]
    //                  [--no_normalize_plurals] [--repeat]

    try {
      await axios
        .post(API_URL.concat("/wordcloud"), body, {
          headers: headers,
        })
        .then(async function (response) {
          // console.log(response);
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
