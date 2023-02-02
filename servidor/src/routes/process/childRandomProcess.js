import { getNumbers } from "../../utils/getRandomNumbers.js";

process.send("ready");

process.on("message", (parentMsg) => {
	console.log(parentMsg);

	if (parentMsg?.message === "start") {
		console.log("cantidad de numeros: " + parentMsg.qty);
		const result = getNumbers(parentMsg.qty);
		process.send({ result: result });
	}
});
