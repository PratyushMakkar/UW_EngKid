const { mongoose, Schema } = require("mongoose");

const imageSchema = new Schema({
	_id: Number,
	name: String,
	description: String,
	date: { type: Date, default: Date.now },
	imgUrl: String,
	contentType: String,
	dimensions: {
		height: Number,
		width: Number,
	},
});
const imageModel = mongoose.model("image", imageSchema);

const userSchema = new Schema({
	_id: Number,
	username: { type: String, default: "" },
	numSaved: { type: Number, default: 0 },
	premium: { type: Boolean, default: false },
	imgs: [imageSchema],
	default: [],
});
const userModel = mongoose.model("user", userSchema, "users");

const settingsSchema = new Schema({});

const serverSchema = new Schema({
	_id: Number,
	name: String,
	totalMembers: Number,
	owner: Number,
	interactions: { type: Number, default: 0 },
	settings: { settingsSchema },
});
const serverModel = mongoose.model("serverSchema", serverSchema, "servers");

const models = {
	imageModel,
	userModel,
	serverModel,
};
module.exports = models;
