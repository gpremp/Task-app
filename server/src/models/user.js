const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {JWTPRIVATEKEY} = require("../config/config");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id },JWTPRIVATEKEY, {
		expiresIn: "30000s",
	});
	return token;
};

const User = mongoose.model("users", userSchema);

module.exports = {User};