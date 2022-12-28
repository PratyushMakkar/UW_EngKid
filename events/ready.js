const mongoose = require("mongoose");
const { database_url } = require("../config.json");

module.exports = {
	name: "ready",
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		// console.log(database_url);
		await mongoose
			.connect(database_url, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
			})
			.catch((err) => {
				throw err;
			});

		// closing the connection
		process.on("SIGINT", function () {
			mongoose.connection.close(function () {
				console.log(
					"Mongoose default connection disconnected through app termination"
				);
				process.exit(0);
			});
		});
	},
};
