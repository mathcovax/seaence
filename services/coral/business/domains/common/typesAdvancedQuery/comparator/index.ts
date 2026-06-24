import { DPE, type ExpectType } from "@duplojs/utils";
import { type ComparatorText, comparatorTextSchema } from "./text";
import {
	type ComparatorStrictText,
	comparatorStrictTextSchema,
} from "./strictText";
import { type ComparatorYear, comparatorYearSchema } from "./year";
import { type ComparatorAuthor, comparatorAuthorSchema } from "./author";
import {
	type ComparatorYearInterval,
	comparatorYearIntervalSchema,
} from "./yearInterval";
import {
	type ComparatorArticleType,
	comparatorArticleTypeSchema,
} from "./articleType";
import { type ComparatorProvider, comparatorProviderSchema } from "./provider";

export * from "./base";

export type Comparator =
	| ComparatorText
	| ComparatorYear
	| ComparatorStrictText
	| ComparatorAuthor
	| ComparatorProvider
	| ComparatorArticleType
	| ComparatorYearInterval;

export const comparatorSchema = DPE.union([
	comparatorTextSchema,
	comparatorYearSchema,
	comparatorStrictTextSchema,
	comparatorAuthorSchema,
	comparatorYearIntervalSchema,
	comparatorArticleTypeSchema,
	comparatorProviderSchema,
]);

type _CheckComparatorSchema = ExpectType<
	DPE.Output<typeof comparatorSchema>,
	Comparator,
	"strict"
>;
