import { logger } from "./logger";
export * from "./logger";

process.on(
	"uncaughtException",
	(error, origine) => {
		logger(error, origine);
	},
);
