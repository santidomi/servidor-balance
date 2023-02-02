const socketClient = io();

//Agregar un producto
const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const name = document.getElementById("productName").value;
	const price = document.getElementById("productPrice").value;
	const thumbnail = document.getElementById("productThumbnail").value;

	const product = {
		name: name,
		price: price,
		thumbnail: thumbnail,
	};

	socketClient.emit("newProduct", product);
	productForm.reset();
});

const createTable = async (data) => {
	const response = await fetch("./template/productDiv.handlebars");
	const result = await response.text();
	const template = Handlebars.compile(result);
	const html = template({ products: data });
	return html;
};

const productsContainer = document.getElementById("productsContainer");
socketClient.on("products", async (data) => {
	console.log(data);
	productsContainer.innerHTML = "";
	const htmlTable = await createTable(data);
	productsContainer.innerHTML = htmlTable;
});

//Esquemas normalizr
const authorSchema = new normalizr.schema.Entity(
	"authors",
	{},
	{ idAttribute: "email" }
);
const messageSchema = new normalizr.schema.Entity("messages", {
	author: authorSchema,
});
const chatSchema = new normalizr.schema.Entity("chats", {
	messages: [messageSchema],
});

//Chat en vivo
socketClient.on("messages", async (data) => {
	console.log(data);
	const denormalizedData = await normalizr.denormalize(
		data.result,
		chatSchema,
		data.entities
	);
	let messageElements = "";
	denormalizedData.messages.forEach((msg) => {
		messageElements += `<div><strong class="red">${msg.author.id} </strong>-<strong class="green"> ${msg.timestamp}:</strong> ${msg.text}</div>`;
	});
	const chatContainer = document.getElementById("chatContainer");
	chatContainer.innerHTML =
		denormalizedData.messages.length > 0 ? messageElements : "";
});

//Envio de mensaje
const chatForm = document.getElementById("chatForm");
chatForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const email = document.getElementById("chatEmail").value;
	const name = document.getElementById("chatName").value;
	const lastName = document.getElementById("chatLastName").value;
	const alias = document.getElementById("chatAlias").value;
	let text = document.getElementById("chatText").value;

	const message = {
		author: {
			id: email,
			email: email,
			nombre: name,
			apellido: lastName,
			alias: alias,
		},
		text: text,
	};

	socketClient.emit("newMessage", message);
	text = "";
});
