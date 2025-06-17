import { BakedDocument } from "@business/entities/bakedDocument";
import { Post } from "@business/entities/post";
import { ReportingBakedDocumentTranslation } from "@business/entities/reporting/bakedDocumentTranslation";
import "@duplojs/types-codegen";

ReportingBakedDocumentTranslation.aggregateListRow._zttIdentifier = "ReportingBakedDocumentTranslationAggregateListRow";
ReportingBakedDocumentTranslation.listPage._zttIdentifier = "ReportingBakedDocumentTranslationListPage";
ReportingBakedDocumentTranslation.listRow._zttIdentifier = "ReportingBakedDocumentTranslationListRow";
ReportingBakedDocumentTranslation.page._zttIdentifier = "ReportingBakedDocumentTranslationPage";

BakedDocument.language._zttIdentifier = "BakedDocumentLanguage";
BakedDocument.newTranslation._zttIdentifier = "BakedDocumentNewTranslation";

Post.moderationPage._zttIdentifier = "PostModerationPage";
