import { productContainer } from "../server.js";
import { normalizeMessages } from "../clase-contenedor/normalizeSchema/index.js";

const chatSocket = async (socket, sockets) => {
	sockets.emit("messages", await normalizeMessages());

	socket.on("newMessage", async (msg) => {
		await productContainer.addMessage(msg);
		sockets.emit("messages", await normalizeMessages());
	});
};

export { chatSocket };
