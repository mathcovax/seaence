import { CreatePedroRawDocumentUsecase } from "@business/applications/usecases/createPedroRawDocument";
import { CreatePubmedRawDocumentUsecase } from "@business/applications/usecases/createPubmedRawDocument";
import { CreateScienceDirectRawDocumentUsecase } from "@business/applications/usecases/createScienceDirectRawDocument";
import { PedroRawDocumentEntity } from "@business/domains/entities/document/raw/pedro";
import { PubmedRawDocumentEntity } from "@business/domains/entities/document/raw/pubmed";
import { ScienceDirectRawDocumentEntity } from "@business/domains/entities/document/raw/scienceDirect";
import { rawDocumentShouldNotExistBySourceUrl } from "@interfaces/checkers/rawDocument";
import { inputSchema } from "@interfaces/schemas/input";
import { EntityHandler } from "@vendors/clean";

useBuilder()
	.createRoute("POST", "/raw-document")
	.extract({
		body: inputSchema,
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
				const rawDocumentPedro = EntityHandler.unsafeMapper(
					PedroRawDocumentEntity,
					{
						...input,
						content: input.content !== null ? input.content.full : null,
						structureContent: input.content !== null ? input.content.structure : null,
					},
				);
				await createPedroRawDocumentUsecase.execute(rawDocumentPedro);
			} else if (input.source === "Pubmed") {
				const createPubmedRawDocumentUsecase = new CreatePubmedRawDocumentUsecase();
				if (input.type === "expect") {
					const rawDocumentPubmed = EntityHandler.unsafeMapper(
						PubmedRawDocumentEntity,
						{
							...input,
							expect: input.expect,
							abstract: null,
						},
					);
					await createPubmedRawDocumentUsecase.execute(rawDocumentPubmed);
				} else if (input.type === "abstract") {
					const rawDocumentPubmed = EntityHandler.unsafeMapper(
						PubmedRawDocumentEntity,
						{
							...input,
							expect: null,
							abstract: input.abstract,
						},
					);
					await createPubmedRawDocumentUsecase.execute(rawDocumentPubmed);
				}
			} else if (input.source === "ScienceDirect") {
				const createScienceDirectRawDocumentUsecase = new CreateScienceDirectRawDocumentUsecase();
				const rawDocumentScienceDirect = EntityHandler.unsafeMapper(
					ScienceDirectRawDocumentEntity,
					input,
				);
				await createScienceDirectRawDocumentUsecase.execute(rawDocumentScienceDirect);
			}

			return new OkHttpResponse("rawDocument.created", undefined);
		},
		makeResponseContract(OkHttpResponse, "rawDocument.created"),
	);
