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
async function getBlogbyid(id) {
	try {
		const blogdata = await Blogs.findById(id);
		return [null, blogdata];
	} catch (error) {
		return [error.message, null];
	}
}
router.get("/:id", async (req, res) => {
	var [err, result] = await getBlogbyid(req.params.id);
	if (err) return res.status(300).json("DOES NOT EXIST");
	res.status(200).json(result);
});
router.post("/new", async (req, res) => {
	// console.log(req.body);
	var [err, result] = validate(req.body);
	if (err) return res.status(300).json("Missing Fields");
	[err, result] = await createBlog(req.body);
	if (err) return res.status(300).json("Dublicate entry");
	res.status(200).json({ message: "SUCCESS", _id: result._id });
});

router.get("/", async (req, res) => {
	const blogsdata = await Blogs.find().sort({ createdAt: "desc" });
	res.json(blogsdata);
});
module.exports = router;
