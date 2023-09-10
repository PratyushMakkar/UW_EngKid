const { database_url } = require("../config.json");
const { sequelize } = require("../sequelize/SequelConfig.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    // connecting to database
    console.log("connecting to database");
    try {
      await sequelize.authenticate();
      await sequelize.sync({
        force: false,
      });
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      throw "Unable to proceed with bot initialization";
    }

    // closing the connection
    process.on("SIGINT", function () {
      // clean up code
      console.log("bot shutting down");
      process.exit(0);
    });
  },
};
