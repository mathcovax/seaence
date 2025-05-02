import { program } from "commander";
import { zod } from "@duplojs/core";
import { mongo } from "@interfaces/providers/mongo";
import "@interfaces/repositories/index";
import { repeater } from "./utils/repeater";
import { makeBakedDocument } from "./entities/bakedDocument";

const NUMBER_OF = Object.freeze({
	bakedDocuments: 100,
});

const optionsSchema = zod.object({
	numberOfBakedDocuments: zod.coerce
		.number()
		.int()
		.positive()
		.default(NUMBER_OF.bakedDocuments),
});

program
	.option(
		"-b, --numberOfBakedDocuments <number>",
		"Nombre de documents à générer",
		"100",
	);

program.parse();

const rawOptions = program.opts();
const { numberOfBakedDocuments } = optionsSchema.parse(rawOptions);

await repeater(numberOfBakedDocuments, () => makeBakedDocument());

await mongo.client.close();
