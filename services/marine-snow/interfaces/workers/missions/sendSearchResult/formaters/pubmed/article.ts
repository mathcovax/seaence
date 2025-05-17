import { hasKey } from "@duplojs/utils";
import { type RawDocument } from "@interfaces/providers/abys";
import { type ArticlePayload } from "@interfaces/providers/scienceDatabase/pubmed/types/article";
import { TechnicalError } from "@vendors/clean";
import { formatDate } from "./date";
import { reverseArticleTypeBackedToUI, uniqueFieldNameMapper } from "@interfaces/providers/scienceDatabase/pubmed/types/utils";

type PubmedArticle = Extract<ArticlePayload["PubmedArticleSet"], { PubmedArticle: object }>["PubmedArticle"][number];

const pubmedBaseUrl = "https://pubmed.ncbi.nlm.nih.gov";

export function formatePubmedArticle(
	pubmedArticle: PubmedArticle,
): RawDocument | Error {
	const articleTypes = pubmedArticle
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
				articleTypes: pubmedArticle
					.MedlineCitation
					.Article
					.PublicationTypeList
					.PublicationType,
			},
		);
	}

	const articleIds = pubmedArticle
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

	const pubmedWebPublishDate = pubmedArticle
		.MedlineCitation
		.Article
		.ArticleDate;

	const pubmedJournalPublishDate = pubmedArticle
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

	const authors = pubmedArticle
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

	const grants = pubmedArticle
		.MedlineCitation
		.Article
		.GrantList
		?.Grant
		.map(({ Acronym, Agency, Country }) => ({
			acronym: Acronym?.["#text"] ?? null,
			agency: Agency["#text"],
			country: Country?.["#text"] ?? null,
		})) ?? null;

	const { AbstractText: abstractText } = pubmedArticle
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
		...pubmedArticle
			.MedlineCitation
			.KeywordList
			?.Keyword
			.map((keyword) => ({
				value: keyword["#text"],
			})) ?? [],
		...pubmedArticle
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
		resourceUrl: `${pubmedBaseUrl}/${pubmedArticle.MedlineCitation.PMID["#text"]}`,
		articleTypes,
		articleIds,
		authors,
		grants,
		title: pubmedArticle.MedlineCitation.Article.ArticleTitle["#text"],
		webPublishDate,
		journalPublishDate,
		abstract: !abstractText || abstractText instanceof Array
			? null
			: abstractText["#text"],
		abstractDetails,
		keywords,
	};
}
