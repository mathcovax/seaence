import "../repositories";
import { ExportBakedDocumentToAbysUsecase } from "@business/applications/usecases/bakedDocument/exportBakedDocumentToAbys";
import { FindBakedDocumentByIdUsecase } from "@business/applications/usecases/bakedDocument/findBakedDocumentById";
import { UpsertBakedDocumentUsecase } from "@business/applications/usecases/bakedDocument/upsertBakedDocument";
import { CookNodeSameRawDocumentsUsecase } from "@business/applications/usecases/nodeSameRawDocument/cookNodeSameRawDocuments";
import { FindNodeSameRawDocumentsUsecase } from "@business/applications/usecases/nodeSameRawDocument/findNodeSameRawDocuments";
import { UpsertPubmedRawDocumentUsecase } from "@business/applications/usecases/rawDocument/pubmed/upsertPubmedRawDocument";

export const upsertPubmedRawDocumentUsecase = new UpsertPubmedRawDocumentUsecase();
export const upsertBakedDocumentUsecase = new UpsertBakedDocumentUsecase();
export const findNodeSameRawDocumentsUsecase = new FindNodeSameRawDocumentsUsecase();
export const cookNodeSameRawDocumentsUsecase = new CookNodeSameRawDocumentsUsecase();
export const exportBakedDocumentToAbysUsecase = new ExportBakedDocumentToAbysUsecase();
export const findBakedDocumentByIdUsecase = new FindBakedDocumentByIdUsecase();
