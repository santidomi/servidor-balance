import bcrypt from "bcrypt-nodejs";

export const encryptPassword = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const comparePasswords = (password, encryptedPassword) => {
	return bcrypt.compareSync(password, encryptedPassword);
};
