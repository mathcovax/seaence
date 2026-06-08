import "@duplojs/http";

import {
	operatorAndSchema,
	operatorContentSchema,
	operatorNotSchema,
	operatorOrSchema,
	comparatorYearSchema,
	comparatorTextSchema,
	comparatorStrictTextSchema,
	comparatorAuthorSchema,
	comparatorArticleTypeSchema,
	comparatorProviderSchema,
	comparatorYearIntervalSchema,
} from "@business/domains/common/typesAdvancedQuery";

comparatorStrictTextSchema.setIdentifier("ComparatorStrictText");
comparatorAuthorSchema.setIdentifier("ComparatorAuthor");
comparatorArticleTypeSchema.setIdentifier("ComparatorArticleType");
comparatorProviderSchema.setIdentifier("ComparatorProvider");
comparatorYearSchema.setIdentifier("ComparatorYear");
comparatorYearIntervalSchema.setIdentifier("ComparatorYearInterval");
comparatorTextSchema.setIdentifier("ComparatorText");
operatorContentSchema.setIdentifier("OperatorContent");
operatorAndSchema.setIdentifier("OperatorAnd");
operatorOrSchema.setIdentifier("OperatorOR");
operatorNotSchema.setIdentifier("OperatorNOT");
