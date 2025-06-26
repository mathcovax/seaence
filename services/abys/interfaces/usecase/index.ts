import "../repositories";
import { FindBakedDocumentByIdUsecase } from "@business/applications/usecases/bakedDocument/findBakedDocumentById";
import { FindManyBakedDocumentByIdUsecase } from "@business/applications/usecases/bakedDocument/findManyBakedDocumentById";
import { IndexUpdatedBakedDocumentsUsecase } from "@business/applications/usecases/bakedDocument/indexUpdatedBakedDocuments";
import { UpsertBakedDocumentUsecase } from "@business/applications/usecases/bakedDocument/upsertBakedDocument";
import { CookNodeSameRawDocumentUsecase } from "@business/applications/usecases/nodeSameRawDocument/cookNodeSameRawDocument";
import { FindOneNodeSameRawDocumentUsecase } from "@business/applications/usecases/nodeSameRawDocument/findOneNodeSameRawDocument";
import { TransformeNodeSameRawDocumentToBakedDocumentUsecase } from "@business/applications/usecases/nodeSameRawDocument/transformeNodeSameRawDocumentToBakedDocument";
import { TransformeUpdatedNodeSameRawDocumentsToBakedDocumentsUsecase } from "@business/applications/usecases/nodeSameRawDocument/transformeUpdatedNodeSameRawDocumentsToBakedDocuments";
import { UpsertPubmedRawDocumentUsecase } from "@business/applications/usecases/rawDocument/pubmed/upsertPubmedRawDocument";

export const upsertPubmedRawDocumentUsecase = new UpsertPubmedRawDocumentUsecase();

export const cookNodeSameRawDocumentUsecase = new CookNodeSameRawDocumentUsecase();
export const transformeNodeSameRawDocumentToBakedDocumentUsecase
	= new TransformeNodeSameRawDocumentToBakedDocumentUsecase();
export const transformeUpdatedNodeSameRawDocumentsToBakedDocumentsUsecase
	= new TransformeUpdatedNodeSameRawDocumentsToBakedDocumentsUsecase();
export const findOneNodeSameRawDocumentUsecase = new FindOneNodeSameRawDocumentUsecase();

export const upsertBakedDocumentUsecase = new UpsertBakedDocumentUsecase();
export const indexUpdatedBakedDocumentsUsecase = new IndexUpdatedBakedDocumentsUsecase();
export const findBakedDocumentByIdUsecase = new FindBakedDocumentByIdUsecase();
export const findManyBakedDocumentByIdUsecase = new FindManyBakedDocumentByIdUsecase();
