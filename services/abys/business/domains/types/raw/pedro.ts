import { type GetValueObject, zod } from "@vendors/clean";

const methodObjecter = zod.enum([
	"clinicalTrial",
	"systematicReview",
	"practiceGuideline",
]).createValueObjecter("method");
type Method = GetValueObject<typeof methodObjecter>;

const strutureContentObjecter = zod
	.object({
		label: zod.string(),
		text: zod.string(),
	})
	.createValueObjecter("structureContent");
type StructureContent = GetValueObject<typeof strutureContentObjecter>;
const contentObjecter = zod.string().createValueObjecter("content");
type Content = GetValueObject<typeof contentObjecter>;

export {
	methodObjecter,
	Method,
	strutureContentObjecter,
	StructureContent,
	contentObjecter,
	Content,
};
