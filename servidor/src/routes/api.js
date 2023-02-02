import express from "express";
import { productContainer } from "../server.js";
import { fork } from "child_process";
const randomRouter = express.Router();

randomRouter.get("/randoms", (req, res) => {
	const randomNumbersCant = parseInt(req.query.cant);

	if (randomNumbersCant) {
		//Creamos el proceso hijo
		const child = fork("./src/routes/process/childRandomProcess.js");
		child.on("message", (childMsg) => {
			//Proceso hijo listo para funcionar
			if (childMsg === "ready") {
				child.send({ message: "start", qty: randomNumbersCant });
			} else {
				res.send(
					` Los numeros aleatorios son ${JSON.stringify(
						childMsg.result
					)}`
				);
			}
		});
	} else {
		//Creamos el proceso hijo
		const child = fork("./src/routes/process/childRandomProcess.js");
		child.on("message", (childMsg) => {
			//Proceso hijo listo para funcionar
			if (childMsg === "ready") {
				child.send({ message: "start", qty: 50000000 });
			} else {
				res.render("numbers", {
					numbers: JSON.stringify(childMsg.result, null, 2),
				});
			}
		});
	}
});

export { randomRouter };
