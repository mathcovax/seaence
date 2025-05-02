import { hasKey } from "@duplojs/utils";
import { AbysAPI, type RawDocument } from "@interfaces/providers/abys";
import { PubMedAPI } from "@interfaces/providers/scienceDatabase/pubmed";
import { type splitDateSchema } from "@interfaces/providers/scienceDatabase/pubmed/types/article";
import { reverseArticleTypeBackedToUI, uniqueFieldNameMapper } from "@interfaces/providers/scienceDatabase/pubmed/types/utils";
import { TechnicalError } from "@vendors/clean/error";
import { match, P } from "ts-pattern";

const expectHttpCode = 200;
const pubmedBaseUrl = "https://pubmed.ncbi.nlm.nih.gov";

function formatDate(splitDate: typeof splitDateSchema["_output"]) {
	return match({
		year: splitDate.Year["#text"],
		month: splitDate.Month?.["#text"] ?? null,
		day: splitDate.Day?.["#text"] ?? null,
	})
		.with(
			{
				year: P.number,
				month: P.number,
				day: null,
			},
			(splitDate) => splitDate,
		)
		.with(
			{
				year: P.number,
				month: null,
				day: null,
			},
			(splitDate) => splitDate,
		)
		.with(
			{
				year: P.number,
				month: P.number,
				day: P.number,
			},
			(splitDate) => splitDate,
		)
		.otherwise(
			(splitDate) => new TechnicalError("Wrong split date format", splitDate),
		);
}

export async function pubmedSender(reference: string) {
	const pubmedResponse = await PubMedAPI.getArticle(reference);

	if (pubmedResponse instanceof Error) {
		return new TechnicalError(
			"Parsing error when fetching article",
			{ error: pubmedResponse },
		);
	}

	if (pubmedResponse.code !== expectHttpCode) {
		return new TechnicalError(
			"Wrong http code when fetching article",
			{ pubmedResponse },
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
					return new TechnicalError(
						"Wrong articleType",
						{
							articleTypes: PubmedArticle
								.MedlineCitation
								.Article
								.PublicationTypeList
								.PublicationType,
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
					return new TechnicalError(
						"Missing unique article field.",
						{ articleIds },
					);
				}

				const pubmedWebPublishDate = PubmedArticle
					.MedlineCitation
					.Article
					.ArticleDate;

				const pubmedJournalPublishDate = PubmedArticle
					.MedlineCitation
					.Article
					.Journal
					?.JournalIssue
					.PubDate;

				if (!pubmedWebPublishDate && !pubmedJournalPublishDate) {
					return new TechnicalError(
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

				const abstractDetails = abstractText instanceof Array
					? abstractText.map(
						(part) => ({
							name: part["@_Label"].toLowerCase(),
							content: part["#text"],
						}),
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
					? formatDate(pubmedJournalPublishDate)
					: null;

				if (journalPublishDate instanceof Error) {
					return journalPublishDate;
				}

				const webPublishDate = pubmedWebPublishDate
					? formatDate(pubmedWebPublishDate)
					: null;

				if (webPublishDate instanceof Error) {
					return webPublishDate;
				}

				return {
					provider: "pubmed",
					uniqueArticleField,
					resourceUrl: `${pubmedBaseUrl}/${reference}`,
					articleTypes,
					articleIds,
					authors,
					grants,
					title: PubmedArticle.MedlineCitation.Article.ArticleTitle["#text"],
					webPublishDate,
					journalPublishDate,
					abstract: !abstractText || abstractText instanceof Array
						? null
						: abstractText["#text"],
					abstractDetails,
					keywords,
				};
			},
		)
		.with(
			{ PubmedArticleSet: { PubmedBookArticle: P.any } },
			() => new TechnicalError("Unsupport book"),
		)
		.exhaustive();

	if (rawDocument instanceof Error) {
		return rawDocument;
	}

	const abysResponse = await AbysAPI.sendRawDocument(rawDocument);

	if (abysResponse.information !== "rawDocument.upsert") {
		return new TechnicalError(
			"Wrong response when send doccument to abys.",
			{ abysResponse },
		);
	}

	return true;
}
