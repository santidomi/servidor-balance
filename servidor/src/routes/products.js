import express from "express";
import { DbConfig } from "../config/envConfig.js";
import { productContainer } from "../server.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
	console.log(`Server ${DbConfig.port}Responding `);
	const productos = await productContainer.productos;
	res.send(productos);
});

productRouter.post("/", async (req, res) => {
	const newProduct = req.body;
	const result = await productContainer.addProduct(newProduct);
	res.send(result);
});

export { productRouter };
