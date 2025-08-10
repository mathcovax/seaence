import { type ZodSpace, zod } from "@duplojs/core";
import { type ZodType } from "zod";
import { acronymMonthToNumber } from "./utils";

const zo = zod.object;

function attributeXML<
	GenericName extends string,
	GenericZodType extends ZodType,
>(
	name: GenericName,
	schema: GenericZodType,
) {
	return {
		[`@_${name}`]: schema,
	} as Record<`@_${GenericName}`, GenericZodType>;
}

function valueXML<
	GenericZodType extends ZodType,
>(
	schema: GenericZodType,
) {
	return {
		"#text": schema,
	} as Record<"#text", GenericZodType>;
}

const stringValue = valueXML(zod.coerce.string());
const numberValue = valueXML(zod.coerce.number());

const medlineDate = zo({
	MedlineDate: zo(stringValue),
}).transform(
	({ MedlineDate }) => {
		const [stringYear = "", stringMonth = "", stringDay = ""] = MedlineDate["#text"].split(" ");

		const year = Number(stringYear);
		if (isNaN(year)) {
			return zod.NEVER;
		}

		const rawMonth = stringMonth.split("-").shift();
		const month = rawMonth ? acronymMonthToNumber[rawMonth] : undefined;

		const day = Number(stringDay);

		return {
			Year: { "#text": year },
			Month: month ? { "#text": month } : undefined,
			Day: isNaN(day) || !month ? undefined : { "#text": day },
		};
	},
);

export const splitDateSchema = zo({
	Year: zo(numberValue),
	Month: zo(stringValue)
		.transform((Month) => {
			const rawMonth = Month["#text"].split("-").shift();
			const month = rawMonth ? acronymMonthToNumber[rawMonth] : undefined;

			return month ? { "#text": month } : undefined;
		})
		.optional(),
	Day: zo(numberValue).optional(),
});

export const articlePayloadSchema = zo({
	PubmedArticleSet: zod.union([
		zo({
			PubmedArticle: zo({
				MedlineCitation: zo({
					PMID: zo({
						...stringValue,
					}),
					Article: zo({
						Journal: zo({
							JournalIssue: zo({
								PubDate: zod.union([
									splitDateSchema,
									medlineDate,
								]).optional(),
							}),
						}).optional(),
						Abstract: zo({
							AbstractText: zod.union([
								zo({
									...attributeXML("Label", zod.string()),
									...stringValue,
								}).array(),
								zo(stringValue),
							]),
						}).optional(),
						PublicationTypeList: zo({
							PublicationType: zo({
								...attributeXML("UI", zod.string()),
								...stringValue,
							}).toArray(),
						}),
						ArticleDate: splitDateSchema.optional(),
						AuthorList: zo({
							Author: zod.union([
								zo({
									LastName: zo(stringValue).optional(),
									ForeName: zo(stringValue).optional(),
									AffiliationInfo: zo({
										Affiliation: zo(stringValue),
									}).toArray().optional(),
								}),
								zo({
									CollectiveName: zo(stringValue),
								}),
							]).toArray(),
						}).optional(),
						GrantList: zo({
							Grant: zo({
								Agency: zo(stringValue),
								Country: zo(stringValue).optional(),
								Acronym: zo(stringValue).optional(),
							}).toArray(),
						}).optional(),
						ArticleTitle: zo(stringValue),
					}),
					KeywordList: zo({
						Keyword: zo({
							...stringValue,
							...attributeXML("MajorTopicYN", zod.string()),
						}).toArray(),
					}).optional(),
					MeshHeadingList: zo({
						MeshHeading: zo({
							DescriptorName: zo({
								...stringValue,
								...attributeXML("MajorTopicYN", zod.string()),
							}),
						}).toArray(),
					}).optional(),
				}),
				PubmedData: zo({
					ArticleIdList: zo({
						ArticleId: zo({
							...attributeXML("IdType", zod.string()),
							...stringValue,
						}).toArray(),
					}),
				}),
			})
				.toArray()
				.optional(),
		}),
		zo({
			PubmedBookArticle: zo({
				BookDocument: zo({
					PublicationType: zo({
						...attributeXML("UI", zod.string()),
						...valueXML(zod.string().toLowerCase()),
					}),
				}),
			}),
		}),
	]),
});

export const articlePayloadBuildedSchema = articlePayloadSchema;

export type ArticlePayload = ZodSpace.infer<typeof articlePayloadSchema>;
