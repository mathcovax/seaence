import { createEnum, zod } from "@vendors/clean";

export const abstractSectionNameEnum = createEnum([
	"introduction",
	"background",
	"objective",
	"method",
	"result",
	"conclusion",
	"reference",
	"acknowledgment",
	"objective",
	"option",
	"outcome",
	"evidence",
	"value",
	"benefit",
	"recommendation",
	"validation",
	"sponsor",
	"purpose",
	"introductions",
	"backgrounds",
	"objectives",
	"methods",
	"results",
	"conclusions",
	"references",
	"acknowledgments",
	"objectives",
	"options",
	"outcomes",
	"evidences",
	"values",
	"benefits",
	"recommendations",
	"validations",
	"sponsors",
	"purposes",
]);

export const abstractSectionNameObjecter = zod
	.enum(abstractSectionNameEnum.toTuple())
	.createValueObjecter("abstractSectionName");
