import { hasKey } from "@duplojs/utils";
import { envs } from "@interfaces/envs";
import { AbysAPI, type RawDocument } from "@interfaces/providers/abys";
import { PubMedAPI } from "@interfaces/providers/scienceDatabase/pubmed";
import { abstractSectionNameEnum, acronymMounthToNumber, reverseArticleTypeBackedToUI, uniqueFieldNameMapper } from "@interfaces/providers/scienceDatabase/pubmed/types/utils";
import { CleanError } from "@vendors/clean/error";
import { match, P } from "ts-pattern";

const expectHttpCode = 200;

export async function pubmedSender(reference: string) {
	const pubmedResponse = await PubMedAPI.getArticle(reference);

	if (pubmedResponse instanceof Error) {
		return new CleanError(
			"Parsing error when fetching article",
			{ error: pubmedResponse },
		);
	}

	if (pubmedResponse.code !== expectHttpCode) {
		return new CleanError(
			"Wrong http code when fetching article",
			{ custom: { pubmedResponse } },
		);
	}

	const rawDocument = match(pubmedResponse.body)
		.returnType<RawDocument | Error>()
		.with(
			{ PubmedArticleSet: { PubmedArticle: P.any } },
			({ PubmedArticleSet: { PubmedArticle } }) => {
				const articleTypes = PubmedArticle
					.MedlineCitation
					.Article
					.PublicationTypeList
					.PublicationType
					.map((type) => type["@_UI"])
					.reduce<RawDocument["articleTypes"] | null>(
						(pv, type) => pv && reverseArticleTypeBackedToUI[type]
							? [
								...pv,
								reverseArticleTypeBackedToUI[type],
							]
							: null,
						[],
					);

				if (!articleTypes?.length) {
					return new CleanError(
						"Wrong articleType",
						{
							custom: {
								articleTypes: PubmedArticle
									.MedlineCitation
									.Article
									.PublicationTypeList
									.PublicationType,
							},
						},
					);
				}

				const articleIds = PubmedArticle
					.PubmedData
					.ArticleIdList
					.ArticleId
					.map((articleId) => ({
						name: articleId["@_IdType"],
						value: articleId["#text"],
					}));

				let uniqueArticleField = articleIds
					.reduce<RawDocument["uniqueArticleField"] | null>(
						(pv, { name, value }) => !pv && hasKey(uniqueFieldNameMapper, name)
							? {
								name: uniqueFieldNameMapper[name],
								value,
							}
							: pv,
						null,
					);

				if (!uniqueArticleField) {
					uniqueArticleField = articleIds
						.reduce<RawDocument["uniqueArticleField"] | null>(
							(pv, { name, value }) => !pv && name === "pubmed"
								? {
									name: "specific",
									value: `pubmed/${value}`,
								}
								: pv,
							null,
						);
				}

				if (!uniqueArticleField) {
					return new CleanError(
						"Missing unique article field.",
						{ custom: { articleIds } },
					);
				}

				const pubmedWebPublishDate = PubmedArticle
					.MedlineCitation
					.Article
					.PublicationTypeList
					.ArticleDate;

				const pubmedJournalPublishDate = PubmedArticle
					.MedlineCitation
					.Article
					.Journal
					?.JournalIssue
					.PubDate;

				if (!pubmedWebPublishDate && !pubmedJournalPublishDate) {
					return new CleanError(
						"Missing web publish date and journal publish date",
					);
				}

				const authors = PubmedArticle
					.MedlineCitation
					.Article
					.AuthorList
					?.Author
					.map(
						(author) => "CollectiveName" in author
							? {
								name: author.CollectiveName["#text"],
								affiliations: null,
							}
							: {
								name: `${author.LastName?.["#text"] ?? ""} ${author.ForeName?.["#text"] ?? ""}`.trim(),
								affiliations: author.AffiliationInfo?.length
									? author.AffiliationInfo
										.map(({ Affiliation }) => Affiliation["#text"])
									: null,
							},
					) ?? null;

				const grants = PubmedArticle
					.MedlineCitation
					.Article
					.GrantList
					?.Grant
					.map(({ Acronym, Agency, Country }) => ({
						acronym: Acronym?.["#text"] ?? null,
						agency: Agency["#text"],
						country: Country?.["#text"] ?? null,
					})) ?? null;

				const { AbstractText: abstractText } = PubmedArticle
					.MedlineCitation
					.Article
					.Abstract ?? {};

				const detailedAbstract = abstractText instanceof Array
					? abstractText.reduce<RawDocument["detailedAbstract"]>(
						(pv, abstractPart) => {
							if (!pv) {
								return null;
							}

							const sectionName = abstractPart["@_Label"]
								.toLowerCase()
								.replace(
									/ [a-z]/g,
									(match) => match.toUpperCase(),
								);

							if (!abstractSectionNameEnum.has(sectionName)) {
								return null;
							}

							return [
								...pv,
								{
									name: sectionName,
									content: abstractPart["#text"],
								},
							];
						},
						[],
					)
					: null;

				const keywords = [
					...PubmedArticle
						.MedlineCitation
						.KeywordList
						?.Keyword
						.map((keyword) => ({
							value: keyword["#text"],
						})) ?? [],
					...PubmedArticle
						.MedlineCitation
						.MeshHeadingList
						?.MeshHeading
						.map((meshTerm) => ({
							value: meshTerm.DescriptorName["#text"],
						})) ?? [],
				];

				const journalPublishDate = pubmedJournalPublishDate
					? {
						day: pubmedJournalPublishDate.Day?.["#text"] ?? null,
						mounth: (
							(mounth?: string) => mounth && acronymMounthToNumber[mounth]
								? acronymMounthToNumber[mounth]
								: null
						)(pubmedJournalPublishDate.Month?.["#text"]),
						year: pubmedJournalPublishDate.Year?.["#text"] ?? null,
					}
					: null;

				return {
					provider: "pubmed",
					uniqueArticleField,
					resourceUrl: `${envs.PUBMED_RESOURCE_BASE_URL}/${reference}`,
					articleTypes,
					articleIds,
					authors,
					grants,
					title: PubmedArticle.MedlineCitation.Article.ArticleTitle["#text"],
					webPublishDate: pubmedWebPublishDate
						? `${pubmedWebPublishDate.Year["#text"]}/${pubmedWebPublishDate.Month["#text"]}/${pubmedWebPublishDate.Day["#text"]}`
						: null,
					journalPublishDate,
					abstract: !abstractText || abstractText instanceof Array
						? null
						: abstractText["#text"],
					detailedAbstract,
					keywords,
				};
			},
		)
		.with(
			{ PubmedArticleSet: { PubmedBookArticle: P.any } },
			() => new CleanError("Unsupport book"),
		)
		.exhaustive();

	if (rawDocument instanceof Error) {
		return rawDocument;
	}

	const abysResponse = await AbysAPI.sendRawDocument(rawDocument);

	if (abysResponse.information !== "rawDocument.upsert") {
		return new CleanError(
			"Wrong response when send doccument to abys.",
			{ custom: { abysResponse } },
		);
	}

	return true;
}
