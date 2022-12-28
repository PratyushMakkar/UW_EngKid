const { database_url } = require("../config.json");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    // console.log(database_url);

    // closing the connection
    process.on("SIGINT", function() {
      // clean up code
      console.log("bot shutting down");
      process.exit(0);
    });
  },
};
