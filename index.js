const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 2000;
const blogs = require("./Routes/Blogs");
const mongoose = require("mongoose");
const BLOG = require("./models/blogsSchema");
// console.log(process.env.URL);
// console.log(process.env.UID);

const URL = `mongodb+srv://${process.env.UID}:${process.env.PASSWORD}@cluster0.vpid4.mongodb.net/?retryWrites=true&w=majority`;
// console.log(URL);
mongoose.connect(
	URL,
	() => console.log("connected"),
	(err) => console.log(err),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/blogs", blogs);

app.listen(PORT, () => console.log(`Listining at port ${PORT}`));

app.use("/", async (req, res) => {
	res.json("HOME PAGE OF BLOGS API");
});
