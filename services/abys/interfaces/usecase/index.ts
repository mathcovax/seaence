import "../repositories";
import { ExportBakedDocumentToAbysUsecase } from "@business/applications/usecases/bakedDocument/exportBakedDocumentToAbys";
import { FindBakedDocumentByIdUsecase } from "@business/applications/usecases/bakedDocument/findBakedDocumentById";
import { UpsertBakedDocumentUsecase } from "@business/applications/usecases/bakedDocument/upsertBakedDocument";
import { CookNodeSameRawDocumentUsecase } from "@business/applications/usecases/nodeSameRawDocument/cookNodeSameRawDocument";
import { FindNodeSameRawDocumentsUsecase } from "@business/applications/usecases/nodeSameRawDocument/findNodeSameRawDocuments";
import { TransformeUpdatedNodeSameRawDocumentsToBakedDocumentsUsecase } from "@business/applications/usecases/nodeSameRawDocument/transformeUpdatedNodeSameRawDocumentsToBakedDocuments";
import { UpsertPubmedRawDocumentUsecase } from "@business/applications/usecases/rawDocument/pubmed/upsertPubmedRawDocument";

export const upsertPubmedRawDocumentUsecase = new UpsertPubmedRawDocumentUsecase();
export const upsertBakedDocumentUsecase = new UpsertBakedDocumentUsecase();
export const findNodeSameRawDocumentsUsecase = new FindNodeSameRawDocumentsUsecase();
export const cookNodeSameRawDocumentUsecase = new CookNodeSameRawDocumentUsecase();
export const transformeUpdatedNodeSameRawDocumentsToBakedDocumentsUsecase
	= new TransformeUpdatedNodeSameRawDocumentsToBakedDocumentsUsecase();
export const exportBakedDocumentToAbysUsecase = new ExportBakedDocumentToAbysUsecase();
export const findBakedDocumentByIdUsecase = new FindBakedDocumentByIdUsecase();
