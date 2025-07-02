import { BakedDocument } from "@business/entities/bakedDocument";
import { Page } from "@business/entities/page";
import { ReportingBakedDocumentTranslation } from "@business/entities/reporting/bakedDocumentTranslation";
import "@duplojs/types-codegen";

ReportingBakedDocumentTranslation.aggregateListRow._zttIdentifier = "ReportingBakedDocumentTranslationAggregateListRow";
Page.reportingBakedDocumentTranslationList._zttIdentifier = "ReportingBakedDocumentTranslationListPage";
ReportingBakedDocumentTranslation.listRow._zttIdentifier = "ReportingBakedDocumentTranslationListRow";
Page.reportingBakedDocumentTranslation._zttIdentifier = "ReportingBakedDocumentTranslationPage";

BakedDocument.language._zttIdentifier = "BakedDocumentLanguage";
BakedDocument.newTranslation._zttIdentifier = "BakedDocumentNewTranslation";
BakedDocument.cookingMode._zttIdentifier = "CookingMode";

Page.moderationPost._zttIdentifier = "PostModerationPage";
Page.moderationAnswer._zttIdentifier = "AnswerModerationPage";
