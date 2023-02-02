import express from "express";
import { productContainer } from "../server.js";
import os from "os";
import { DbConfig } from "../config/envConfig.js";
const clientRouter = express.Router();

clientRouter.get("/", (req, res) => {
	if (req.session.username) {
		res.render("home", { name: req.session.username });
	} else {
		res.redirect("/signup");
	}
});

clientRouter.get("/productos", async (req, res) => {
	if (req.session.username) {
		console.log(` server ${DbConfig.port} responding`);
		res.render("products", {
			products: productContainer.productos,
			sever: DbConfig.port,
		});
	} else {
		res.redirect("/signup");
	}
});

clientRouter.get("/info", async (req, res) => {
	const numCpus = os.cpus().length; // Numero de procesadores

	const rss = process.memoryUsage();
	const processInfo = {
		entries: process.argv.slice(2),
		so: process.platform,
		node_version: process.version,
		rss: rss,
		path: process.cwd(),
		id: process.pid,
		cpu_number: numCpus,
	};
	res.render("info", { processInfo: processInfo });
});

export { clientRouter };
