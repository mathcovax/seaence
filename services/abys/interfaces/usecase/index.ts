import "../repositories";
import { UpsertBakedDocumentUsecase } from "@business/applications/usecases/bakedDocument/upsertBakedDocument";
import { GetNodeSameRawDocumentsUsecase } from "@business/applications/usecases/nodeSameRawDocument/getNodeSameRawDocuments";
import { UpsertPubmedRawDocumentUsecase } from "@business/applications/usecases/rawDocument/pubmed/upsertPubmedRawDocument";

export const upsertPubmedRawDocumentUsecase = new UpsertPubmedRawDocumentUsecase();
export const upsertBakedDocumentUsecase = new UpsertBakedDocumentUsecase();
export const getNodeSameRawDocumentsUsecase = new GetNodeSameRawDocumentsUsecase();
