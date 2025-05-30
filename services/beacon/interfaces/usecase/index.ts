import { FindBakedDocumentTranslationReportingUsecase } from "@business/applications/usecases/bakedDocumentTranslationReporting/findBakedDocumentTranslationReporting";
import "../repositories";
import { CreateBakedDocumentTranslationReportingUsecase } from "@business/applications/usecases/bakedDocumentTranslationReporting/createBakedDocumentTranslationReporting";

export const findBakedDocumentTranslationReportingUsecase = new FindBakedDocumentTranslationReportingUsecase();

export const createBakedDocumentTranslationReportingUsecase = new CreateBakedDocumentTranslationReportingUsecase();
