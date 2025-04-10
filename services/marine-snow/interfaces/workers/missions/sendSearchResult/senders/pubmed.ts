import { envs } from "@interfaces/envs";
import { AbysApi, type RawDocument } from "@interfaces/providers/abys";
import { PubMedAPI } from "@interfaces/providers/scienceDatabase/pubmed";

const expectHttpCode = 200;

export async function pubmedSender(reference: string) {
	const pubmedResponse = await PubMedAPI.getArticle(reference);

	if (pubmedResponse.code !== expectHttpCode) {
		return false;
	}

	const {

	} = pubmedResponse.body;

	const rawDocument: RawDocument = {
		provider: "pubmed",
		resourceUrl: `${envs.PUBMED_RESOURCE_BASE_URL}/${reference}`,
		articleTypes: ,
		articleIds: ,
		electronicPublicationDate: ,
		authors: ,
		grants: ,
		title: ,
		abstract: ,
		detailedAbstract: ,
		keywords: ,
		meshTerms: ,
	};
	
	const abysResponse = await AbysApi.sendRawDocument(rawDocument);

	if (abysResponse.information !== "rawDocument.created") {
		return false;
	}

	return true;
}
