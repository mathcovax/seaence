import "@duplojs/types-codegen";
import { articleTypeSchema, languageSchema } from "../schemas/common";
import { operatorAndSchema, operatorContentSchema, operatorOrSchema, comparatorTextSchema, comparatorYearSchema, operatorNotSchema } from "@vendors/types-advanced-query";

articleTypeSchema._zttIdentifier = "ArticleType";

languageSchema._zttIdentifier = "Language";

comparatorYearSchema._zttIdentifier = "ComparatorYear";
comparatorTextSchema._zttIdentifier = "ComparatorText";
operatorContentSchema._zttIdentifier = "OperatorContent";
operatorAndSchema._zttIdentifier = "OperatorAnd";
operatorOrSchema._zttIdentifier = "OperatorOR";
operatorNotSchema._zttIdentifier = "OperatorNot";
