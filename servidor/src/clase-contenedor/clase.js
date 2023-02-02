import fs, { write } from "fs";

import { faker } from "@faker-js/faker";
import { fileURLToPath } from "url";
import path from "path";
import { normalize, denormalize, schema } from "normalizr";
import { chatSchema, messageSchema } from "./normalizeSchema/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { commerce, image } = faker;

class Contenedor {
	getProducts() {
		let products = [];
		for (let i = 0; i < 5; i++) {
			let product = {
				name: commerce.productName(),
				price: commerce.price(),
				thumbnail: image.avatar(),
			};
			products.push(product);
		}
		return products;
	}
	constructor() {
		this.productos = this.getProducts();
		this.messages = this.getMessages();
		this.logged = false;
	}

	getMessages() {
		this.messages = JSON.parse(
			fs.readFileSync(__dirname + "/chat/chat.txt")
		);
		return this.messages;
	}

	addProductToDb(producto) {
		this.productos.push(producto);
		return "Product added correctly";
	}

	addProduct(product) {
		const itExists = this.productos.some(
			(prod) => prod.name === product.name
		);
		console.log(itExists);

		if (!itExists) {
			if (
				product.name != "" &&
				product.price != "" &&
				product.thumbnail != ""
			) {
				const producto = {
					name: product.name,
					thumbnail: product.thumbnail,
					price: parseInt(product.price),
				};
				this.addProductToDb(producto);
				this.getProducts();
			} else {
				return "Producto incorrecto";
			}
		} else {
			return "Already exits";
		}
	}

	writeChat() {
		fs.writeFileSync(
			__dirname + "/chat/chat.txt",
			JSON.stringify(this.messages, null, 2),
			"utf-8"
		);
	}

	async addMessage(message) {
		if (message.text != "") {
			const lastId = this.messages[this.messages.length - 1]?.id + 1 || 1;
			const newMessage = {
				...message,
				id: lastId,
				timestamp: new Date().toLocaleString(),
			};
			this.messages.push(newMessage);
			this.writeChat();
		} else {
			return;
		}
	}

	login() {
		console.log("logged in");
	}

	logout() {
		console.log("logged out");
	}
}

export { Contenedor };
