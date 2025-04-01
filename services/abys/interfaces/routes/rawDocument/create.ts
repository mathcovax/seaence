import { CreatePedroRawDocumentUsecase } from "@business/applications/usecases/createPedroRawDocument";
import { CreatePubmedRawDocumentUsecase } from "@business/applications/usecases/createPubmedRawDocument";
import { CreateScienceDirectRawDocumentUsecase } from "@business/applications/usecases/createScienceDirectRawDocument";
import { dateObjecter } from "@business/domains/types/common";
import { rawDocumentShouldNotExistBySourceUrl } from "@interfaces/checkers/rawDocument";
import { rawDocumentInputSchema } from "@interfaces/schemas/document/raw/input";

useBuilder()
	.createRoute("POST", "/raw-document")
	.extract({
		body: rawDocumentInputSchema,
	})
	.presetCheck(
		rawDocumentShouldNotExistBySourceUrl,
		(pickup) => pickup("body").sourceUrl,
	)
	.handler(
		async(pickup) => {
			const input = pickup("body");

			if (input.source === "Pedro") {
				const createPedroRawDocumentUsecase = new CreatePedroRawDocumentUsecase();
				await createPedroRawDocumentUsecase.execute({
					...input,
					publicationDate: dateObjecter.throwCreate(input.publicationDate),
				});
			} else if (input.source === "Pubmed") {
				const createPubmedRawDocumentUsecase = new CreatePubmedRawDocumentUsecase();
				if (input.type === "expect") {
					await createPubmedRawDocumentUsecase.execute({
						...input,
						publicationDate: dateObjecter.throwCreate(input.publicationDate),
						abstract: null,
					});
				} else if (input.type === "abstract") {
					await createPubmedRawDocumentUsecase.execute({
						...input,
						publicationDate: dateObjecter.throwCreate(input.publicationDate),
						expect: null,
					});
				}
			} else if (input.source === "ScienceDirect") {
				const createScienceDirectRawDocumentUsecase = new CreateScienceDirectRawDocumentUsecase();
				await createScienceDirectRawDocumentUsecase.execute({
					...input,
					publicationDate: dateObjecter.throwCreate(input.publicationDate),
				});
			}

			return new OkHttpResponse("rawDocument.created", undefined);
		},
		makeResponseContract(OkHttpResponse, "rawDocument.created"),
	);
