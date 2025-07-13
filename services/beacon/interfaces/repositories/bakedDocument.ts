import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { AbysAPI } from "@interfaces/providers/abys";
import { TechnicalError, toSimpleObject } from "@vendors/clean";

bakedDocumentRepository.default = {
	save() {
		throw new TechnicalError("method-is-not-allowed");
	},
	async updateTranslation(params) {
		await AbysAPI.transformeNodeSameRawDocumentToBakedDocument(
			toSimpleObject({ ...params }),
		);
	},
};
