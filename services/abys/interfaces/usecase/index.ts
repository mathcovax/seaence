import "../repositories";
import { UpsertBakedDocumentUsecase } from "@business/applications/usecases/bakedDocument/upsertBakedDocument";
import { CookNodeSameRawDocumentsUsecase } from "@business/applications/usecases/nodeSameRawDocument/cookNodeSameRawDocuments";
import { GetNodeSameRawDocumentsUsecase } from "@business/applications/usecases/nodeSameRawDocument/getNodeSameRawDocuments";
import { UpsertPubmedRawDocumentUsecase } from "@business/applications/usecases/rawDocument/pubmed/upsertPubmedRawDocument";

export const upsertPubmedRawDocumentUsecase = new UpsertPubmedRawDocumentUsecase();
export const upsertBakedDocumentUsecase = new UpsertBakedDocumentUsecase();
export const getNodeSameRawDocumentsUsecase = new GetNodeSameRawDocumentsUsecase();
export const cookNodeSameRawDocumentsUsecase = new CookNodeSameRawDocumentsUsecase();
