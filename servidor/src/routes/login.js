import express from "express";
import passport from "passport";
import { userModel } from "../models/UserModels.js";
import { Strategy as LocalStrategy, Strategy } from "passport-local";
import flash from "connect-flash";
import { comparePasswords } from "../utils/passwordEncrypt.js";

passport.use(
	"loginStrategy",
	new LocalStrategy(
		{
			passReqToCallback: true,
			usernameField: "email",
			passwordField: "password",
		},
		async (req, username, password, done) => {
			//Buscar el usuario dentro de la base de datos
			const user = await userModel.findOne({ email: username });

			if (!user) {
				return done(
					null,
					false,
					req.flash("loginMessage", "Usuario no encontrado")
				);
			}
			if (user) {
				const userPassword = user.password;
				const userEmail = user.email;

				const passwordsMatch = comparePasswords(password, userPassword);
				if (passwordsMatch) {
					return done(
						null,
						user,
						req.flash("loginMessage", "Credenciales validas")
					);
				} else {
					done(
						null,
						false,
						req.flash("loginMessage", "Credenciales no validas")
					);
				}
			}
		}
	)
);
const loginRouter = express.Router();

loginRouter.get("/login", (req, res) => {
	res.render("login");
});

loginRouter.post(
	"/login",
	passport.authenticate("loginStrategy", {
		failureRedirect: "/login",
		failureMessage: true,
	}),
	(req, res) => {
		const { email } = req.body;
		req.session.username = email;
		res.redirect("/");
	}
);

loginRouter.get("/logout", (req, res) => {
	const name = req.session.username;

	req.session.destroy((err) => {
		if (err) return res.redirect("/");
		res.render("logout", { name: name });
	});
});

export { loginRouter };
