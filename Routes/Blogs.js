const express = require("express");
const router = express.Router();
const Blogs = require("../models/blogsSchema");
async function createBlog(data) {
	try {
		const res = await Blogs.create({
			title: data.title,
			description: data.description,
			blog: data.blog,
		});
		console.log(res);
		return [null, res];
	} catch (error) {
		console.log(error.message);
		return [error.message, null];
	}
}
function validate(data) {
	if (!data || !data.title || !data.description || !data.blog)
		return [true, null];
	return [null, true];
}
router.post("/new", async (req, res) => {
	// console.log(req.body);
	var [err, result] = validate(req.body);
	if (err) return res.status(300).json("Missing Fields");
	[err, result] = await createBlog(req.body);
	if (err) return res.status(300).json("Dublicate entry");
	res.status(200).json("SUCCESS");
});

router.get("/", async (req, res) => {
	const blogsdata = await Blogs.find().sort({ createdAt: "desc" });
	res.json(blogsdata);
});
module.exports = router;
