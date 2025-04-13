
/* eslint-disable no-console */
import { bakedDocumentLanguageObjecter } from "@business/domains/entities/bakedDocument";
import { getNodeSameRawDocumentsUsecase, upsertBakedDocumentUsecase } from "@interfaces/usecase";
import { intObjecter } from "@vendors/clean";
import { Option, program } from "commander";

interface CommandOptions {
	quantity: number;
	language: "fr-FR" | "en-US";
}

function parseNumber(value: string) {
	return intObjecter.throwCreate(Number(value));
}

function parseLanguage(value: string) {
	return bakedDocumentLanguageObjecter.unknownThrowCreate(value);
}

program
	.addOption(
		new Option("-q, --quantity <number>")
			.argParser(parseNumber)
			.makeOptionMandatory(),
	)
	.addOption(
		new Option("-l, --language <language>")
			.choices(["fr-FR", "en-US"])
			.argParser(parseLanguage)
			.makeOptionMandatory(),
	);

program.parse();

const { quantity, language }: CommandOptions = program.opts();
const quantityPerPage = 10;
const numberOfPages = quantity / quantityPerPage;

console.log(`Cuisson de ${quantity} document(s)... 🔥`);

async function *getNodeSameRawDocument(pageQuantity: number) {
	for (let page = 0; page <= pageQuantity; page++) {
		const nodes = await getNodeSameRawDocumentsUsecase.execute({
			page: intObjecter.unsafeCreate(page),
		});

		if (!nodes.length) {
			break;
		}

		yield nodes;
	}
}

for await (const nodes of getNodeSameRawDocument(numberOfPages)) {
	await Promise.all(
		nodes.map(
			(nodeSameRawDocument) => upsertBakedDocumentUsecase.execute({
				nodeSameRawDocument,
				language: bakedDocumentLanguageObjecter.unsafeCreate(language),
			}),
		),
	);
}

console.log("Document(s) cuit(s) avec succès ! ✅");
