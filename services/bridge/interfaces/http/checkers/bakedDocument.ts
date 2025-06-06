import { AbysAPI } from "@interfaces/providers/abys";
import { match } from "ts-pattern";

export const bakedDocumentExistCheck = createChecker("bakedDocumentExist")
	.handler(
		async(input: string, output) => {
			const abysResponse = await AbysAPI.findBakedDocumentById(input);

			return match(abysResponse)
				.with(
					{ information: "bakedDocument.get" },
					({ body }) => output("bakedDocument.exist", body),
				)
				.with(
					{ information: "bakedDocument.notfound" },
					() => output("bakedDocument.notfound", null),
				)
				.exhaustive();
		},
	);

export const iWantBakedDocumentExistById = createPresetChecker(
	bakedDocumentExistCheck,
	{
		result: "bakedDocument.exist",
		catch: () => new NotFoundHttpResponse("bakedDocument.notfound"),
		indexing: "bakedDocument",
	},
	makeResponseContract(NotFoundHttpResponse, "bakedDocument.notfound"),
);
