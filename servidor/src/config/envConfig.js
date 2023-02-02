import * as dotenv from "dotenv";
import parseArgs from "minimist";

dotenv.config();

const options = {
	default: {
		port: 8000,
		mode: "fork",
	},
	alias: {
		p: "port",
		m: "mode",
	},
};

const args = parseArgs(process.argv.slice(2), options);

const DbConfig = {
	mongoAtlas: {
		url: process.env.DATABASE_URL || "Base de datos no existente",
	},
	port: args.port,
	mode: args.mode,
};

export { DbConfig };
