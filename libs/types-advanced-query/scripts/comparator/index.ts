import { zod } from "@vendors/clean";
import { comparatorTextSchema, type ComparatorText } from "./text";
import { comparatorStrictTextSchema, type ComparatorStrictText } from "./strictText";
import { comparatorYearSchema, type ComparatorYear } from "./year";
import { type ComparatorAuthor, comparatorAuthorSchema } from "./author";
import { type ExpectType } from "@duplojs/utils";
import { type ComparatorYearInterval, comparatorYearIntervalSchema } from "./yearInterval";
import { type ComparatorArticleType, comparatorArticleTypeSchema } from "./articleType";
import { type ComparatorProvider, comparatorProviderSchema } from "./provider";
import { type ComparatorNameEnumValue } from "./nameEnum";

export interface BaseComparator<
	GenericName extends string,
> {
	type: "comparator";
	name: GenericName;
}

export type Comparator =
	| ComparatorText
	| ComparatorYear
	| ComparatorStrictText
	| ComparatorAuthor
	| ComparatorProvider
	| ComparatorArticleType
	| ComparatorYearInterval;

type _CheckComparatorName = ExpectType<
	ComparatorNameEnumValue,
	Comparator["name"],
	"strict"
>;

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
