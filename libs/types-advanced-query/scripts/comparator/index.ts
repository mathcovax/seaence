import { zod } from "@vendors/clean";
import { comparatorTextSchema, type ComparatorText } from "./text";
import { comparatorStrictTextSchema, type ComparatorStrictText } from "./strictText";
import { comparatorYearSchema, type ComparatorYear } from "./year";
import { type ComparatorAuthor, comparatorAuthorSchema } from "./author";
import { type ExpectType } from "@duplojs/utils";
import { type ComparatorYearInterval, comparatorYearIntervalSchema } from "./yearInterval";
import { type ComparatorArticleType, comparatorArticleTypeSchema } from "./articleType";
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

export const comparatorSchema = zod.union([
	comparatorTextSchema,
	comparatorYearSchema,
	comparatorStrictTextSchema,
	comparatorAuthorSchema,
	comparatorYearIntervalSchema,
	comparatorArticleTypeSchema,
	comparatorProviderSchema,
]);

type _CheckComparatorSchema = ExpectType<
	typeof comparatorSchema["_output"],
	Comparator,
	"strict"
>;
