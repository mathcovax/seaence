import { faker } from "@vendors/fixture";
import { EntityHandler, type ToSimpleObject } from "@vendors/clean";
import { BakedDocumentEntity } from "@business/domains/entities/bakedDocument";
import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { makePartialSplitDate } from "../utils/splitDate";
import { articleTypeEnum } from "@business/domains/common/articleType";
import { uuidv7 } from "uuidv7";
import { bakedDocumentLanguageEnum } from "@business/domains/common/bakedDocumentLanguage";

export async function makeBakedDocument(
	bakedDocument?: Partial<Omit<
		ToSimpleObject<BakedDocumentEntity>,
		"nodeSameRawDocumentId" | "id"
	>>,
) {
	const nodeSameRawDocumentId = `FAKE_${uuidv7()}`;

	return bakedDocumentRepository.use.save(
		EntityHandler.unsafeMapper(
			BakedDocumentEntity,
			{
				id: `${nodeSameRawDocumentId}_${bakedDocumentLanguageEnum["en-US"]}`,
				nodeSameRawDocumentId,
				title: bakedDocument?.title || faker.lorem.sentences({
					min: 3,
					max: 6,
				}),
				language: bakedDocument?.language || bakedDocumentLanguageEnum["en-US"],
				abstract: bakedDocument?.abstract || faker.lorem.paragraphs({
					min: 2,
					max: 4,
				}),
				abstractDetails: bakedDocument?.abstractDetails || null,
				resources: bakedDocument?.resources || [],
				keywords: bakedDocument?.keywords || faker.helpers.arrayElements(
					[
						faker.science.chemicalElement().name,
						faker.science.chemicalElement().symbol,
						faker.science.unit().name,
						faker.science.unit().symbol,
						faker.word.adjective(),
						faker.word.noun(),
					],
					{
						min: 3,
						max: 6,
					},
				).map((keyword) => ({ value: keyword })),
				webPublishDate: bakedDocument?.webPublishDate || makePartialSplitDate({
					date: faker.date.between({
						from: "2040-01-01",
						to: "2050-01-01",
					}),
					includeMonth: faker.datatype.boolean(),
					includeDay: faker.datatype.boolean(),
				}),
				journalPublishDate: bakedDocument?.journalPublishDate || makePartialSplitDate({
					date: faker.date.between({
						from: "2040-01-01",
						to: "2050-01-01",
					}),
					includeMonth: faker.datatype.boolean(),
					includeDay: faker.datatype.boolean(),
				}),
				lastUpdate: bakedDocument?.lastUpdate || new Date(),
				lastExportOnSea: null,
				articleTypes: bakedDocument?.articleTypes || Array.from(
					{
						length: faker.number.int({
							min: 1,
							max: 3,
						}),
					},
					() => faker.helpers.arrayElement(articleTypeEnum.toTuple()),
				),
				authors: bakedDocument?.authors || Array.from(
					{
						length: faker.number.int({
							min: 1,
							max: 5,
						}),
					},
					() => ({
						name: faker.person.fullName(),
						affiliations: Array.from(
							{
								length: faker.number.int({
									min: 1,
									max: 3,
								}),
							},
							() => faker.company.name(),
						),
					}),
				),
			},
		),
	);
}
