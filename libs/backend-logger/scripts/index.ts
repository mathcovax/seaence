import { logger } from "./logger";

process.on(
	"uncaughtException",
	(error, origine) => {
		logger(error, origine);
	},
);
