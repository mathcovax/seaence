import { FindOneArticleReferenceUsecase } from "@business/applications/usecases/articleReference/findOne";
import "../repositories";
import { AddOneArticleReferenceUsecase } from "@business/applications/usecases/articleReference/addOne";
import { ExportManyArticleReferenceUsecase } from "@business/applications/usecases/exportArticleReference/many";
import { ExportOneArticleReferenceUsecase } from "@business/applications/usecases/exportArticleReference/one";
import { CreateFetchPubmedArticleReferenceMissionUsecase } from "@business/applications/usecases/fetchArticleReferenceMission/pubmed/create";
import { FindOneFetchPubmedArticleReferenceMissionUsecase } from "@business/applications/usecases/fetchArticleReferenceMission/pubmed/findOne";
import { FetchPubmedArticleReferencesUsecase } from "@business/applications/usecases/fetchArticleReferenceMission/pubmed";
import { RecoveryFetchArticleReferenceMissionUsecase } from "@business/applications/usecases/fetchArticleReferenceMission/recovery";
import { StartFetchArticleReferenceMissionUsecase } from "@business/applications/usecases/fetchArticleReferenceMission/start";

export const addOneArticleReferenceUsecase = new AddOneArticleReferenceUsecase();
export const findOneArticleReferenceUsecase = new FindOneArticleReferenceUsecase();

export const exportManyArticleReferenceUsecase = new ExportManyArticleReferenceUsecase();
export const exportOneArticleReferenceUsecase = new ExportOneArticleReferenceUsecase();

export const createFetchPubmedArticleReferenceMissionUsecase = new CreateFetchPubmedArticleReferenceMissionUsecase();
export const findOneFetchPubmedArticleReferenceMissionUsecase = new FindOneFetchPubmedArticleReferenceMissionUsecase();
export const fetchPubmedArticleReferencesUsecase = new FetchPubmedArticleReferencesUsecase();

export const recoveryFetchArticleReferenceMissionUsecase = new RecoveryFetchArticleReferenceMissionUsecase();
export const startFetchArticleReferenceMissionUsecase = new StartFetchArticleReferenceMissionUsecase();
