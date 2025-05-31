import "@duplojs/zod-to-typescript";
import { comparatorTextSchema, comparatorYearSchema, operatorAndSchema, operatorContentSchema, operatorNotSchema, operatorOrSchema } from "@vendors/types-advanced-query";

comparatorYearSchema._zttIdentifier = "ComparatorYear";
comparatorTextSchema._zttIdentifier = "ComparatorText";
operatorContentSchema._zttIdentifier = "OperatorContent";
operatorAndSchema._zttIdentifier = "OperatorAnd";
operatorOrSchema._zttIdentifier = "OperatorOR";
operatorNotSchema._zttIdentifier = "OperatorNot";
