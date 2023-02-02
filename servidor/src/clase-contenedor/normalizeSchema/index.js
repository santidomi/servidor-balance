import { normalize, schema } from "normalizr";
import { productContainer } from "../../server.js";

const authorSchema = new schema.Entity("authors");
const messageSchema = new schema.Entity("messages", {
	author: authorSchema,
});
const chatSchema = new schema.Entity("chats", {
	messages: [messageSchema],
});

const normalizeData = (data) => {
	const normalizedData = normalize(
		{ id: "chatHistory", messages: data },
		chatSchema
	);
	return normalizedData;
};
export const normalizeMessages = async () => {
	const messages = await productContainer.getMessages();
	const normalizedMessages = normalizeData(messages);
	return normalizedMessages;
};

export { authorSchema, messageSchema, chatSchema };
