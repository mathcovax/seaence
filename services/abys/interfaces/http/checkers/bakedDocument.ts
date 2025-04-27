import { type BakedDocumentId } from "@business/domains/entities/bakedDocument";
import { type GetTypeInput } from "@duplojs/core";
import { getBakedDocumentByIdUsecase } from "@interfaces/usecase";
import { match } from "ts-pattern";

export const inputBakedDocumentExist = createTypeInput<{
	id: BakedDocumentId;
}>();

export const bakedDocumentExistCheck = createChecker("bakedDocumentExist")
	.handler(
		async(input: GetTypeInput<typeof inputBakedDocumentExist>, output) => {
			const bakedDocument = await match(input)
				.with(
					{ inputName: "id" },
					({ value }) => getBakedDocumentByIdUsecase.execute({ id: value }),
				)
				.exhaustive();

			if (bakedDocument) {
				return output("bakedDocument.exist", bakedDocument);
			} else {
				return output("bakedDocument.notfound", null);
			}
		},
	);

export const IWantBakedDocumentExistsById = createPresetChecker(
	bakedDocumentExistCheck,
	{
		result: "bakedDocument.exist",
		catch: () => new NotFoundHttpResponse("bakedDocument.notfound"),
		transformInput: inputBakedDocumentExist.id,
		indexing: "bakedDocument",
	},
	makeResponseContract(NotFoundHttpResponse, "bakedDocument.notfound"),
);
