import mongoose from "mongoose";

const usersCollection = "usuarios";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
});

export const userModel = mongoose.model(usersCollection, userSchema);
