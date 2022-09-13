const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true,
	},
	description: String,
	blog: String,
	updatedAt: {
		type: Date,
		default: () => new Date(),
	},
	createdAt: {
		type: Date,
		immutable: true,
		default: () => new Date(),
	},
});
module.exports = mongoose.model("Blogs", BlogSchema);
