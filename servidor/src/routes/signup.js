import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy, Strategy } from "passport-local";
import { userModel } from "../models/UserModels.js";
import { encryptPassword } from "../utils/passwordEncrypt.js";

const signupRouter = express.Router();

passport.use(
	"signupStrategy",
	new LocalStrategy(
		{
			passReqToCallback: true,
			usernameField: "email",
		},
		async (req, username, password, done) => {
			//Buscar el usuario dentro de la base de datos
			const user = await userModel.findOne({ email: username });
			if (user) {
				return done(
					null,
					false,
					req.flash("signupMessage", "Usuario ya existente")
				);
			}
			const newUser = {
				email: username,
				password: encryptPassword(password),
			};
			const userCreated = await userModel.create(newUser);
			if (userCreated) {
				return done(null, userCreated);
			} else {
				return done(
					null,
					false,
					req.flash("signupMessage", "Ha ocurrido un error")
				);
			}
		}
	)
);

signupRouter.get("/signup", (req, res) => {
	res.render("signup");
});

signupRouter.post(
	"/signup",
	passport.authenticate("signupStrategy", {
		failureRedirect: "/signup",
		failureMessage: true,
	}),
	(req, res) => {
		res.redirect("/login");
	}
);

export { signupRouter };
