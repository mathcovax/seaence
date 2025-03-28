# Pubmed EFetch API Response Model

```typescript
/**
 * Interface representing the NCBI EFetch API response for PubMed articles
 */
export interface NCBIEFetchResponse {
 PubmedArticleSet: {
  PubmedArticle: PubmedArticle[];
 };
}

export interface PubmedArticle {
 MedlineCitation: MedlineCitation;
 PubmedData?: PubmedData;
}

export interface MedlineCitation {
 /** Status of the citation in MEDLINE */
 Status: string;
 /** Owner of the citation */
 Owner?: string;
 /** MEDLINE unique identifier */
 PMID: {
  _: string;
  /** Version of the PMID */
  Version?: string; s
 };
 /** Date the citation was created or revised */
 DateCompleted?: DateYMD;
 /** Date the citation was created */
 DateCreated?: DateYMD;
 /** Date the citation was revised */
 DateRevised?: DateYMD;
 /** Journal information */
 Article: Article;
 /** Medical subject headings */
 MeshHeadingList?: {
  MeshHeading: MeshHeading[];
 };
 /** Keywords associated with the article */
 KeywordList?: {
  Keyword: Keyword[];
  /** Owner of the keyword list */
  Owner?: string;
 };
 /** Chemical compounds mentioned in the article */
 ChemicalList?: {
  Chemical: Chemical[];
 };
 /** Citation subsets */
 CitationSubset?: string[];
 /** Comments or corrections */
 CommentsCorrectionsList?: {
  CommentsCorrections: CommentsCorrections[];
 };
 /** Other related IDs */
 OtherID?: OtherID[];
 /** Article IDs from other databases */
 ArticleIdList?: {
  ArticleId: ArticleId[];
 };
 /** Related article information */
 GeneralNote?: GeneralNote[];
}

export interface DateYMD {
 Year: string;
 Month: string;
 Day: string;
}

export interface Article {
 /** Type of article (research, review, etc.) */
 PublicationTypeList?: {
  PublicationType: PublicationType[];
 };
 /** Article title */
 ArticleTitle: string;
 /** Language of the article */
 Language?: string[];
 /** Journal information */
 Journal: {
  /** Journal title */
  Title?: string;
  /** ISO abbreviation of the journal title */
  ISOAbbreviation?: string;
  /** ISSN of the journal */
  ISSN?: {
   _: string;
   IssnType?: string;
  };
  /** Volume, issue, and date information */
  JournalIssue: {
   /** Volume number */
   Volume?: string;
   /** Issue number */
   Issue?: string;
   /** Publication date */
   PubDate: {
    Year?: string;
    Month?: string;
    Day?: string;
    Season?: string;
    MedlineDate?: string;
   };
  };
 };
 /** Abstract text */
 Abstract?: {
  AbstractText: (string | {
   _: string;
   Label?: string;
   NlmCategory?: string;
  })[];
  CopyrightInformation?: string;
 };
 /** Authors list */
 AuthorList?: {
  Author: Author[];
  CompleteYN?: string;
 };
 /** Article pagination */
 Pagination?: {
  MedlinePgn?: string;
 };
 /** Electronic location identifiers (DOI, etc.) */
 ELocationID?: ELocationID[];
 /** Publication date alternate format */
 ArticleDate?: {
  Year: string;
  Month: string;
  Day: string;
  DateType?: string;
 };
 /** Grant information */
 GrantList?: {
  Grant: Grant[];
  CompleteYN?: string;
 };
 /** Publication status */
 PublicationStatus?: string;
}

export interface Author {
 /** Last name of the author */
 LastName?: string;
 /** First name of the author */
 ForeName?: string;
 /** Initials of the author */
 Initials?: string;
 /** Suffix of the author (Jr, Sr, etc.) */
 Suffix?: string;
 /** Collective/group author name */
 CollectiveName?: string;
 /** Identifiers for the author */
 Identifier?: {
  _: string;
  Source: string;
 }[];
 /** Author's affiliation */
 AffiliationInfo?: {
  Affiliation: string;
  Identifier?: {
   _: string;
   Source: string;
  };
 }[];
 /** Indicates if author is the main/first author */
 ValidYN?: string;
 /** Indicates author's equal contribution status */
 EqualContrib?: string;
}

export interface ELocationID {
 _: string;
 EIdType: string;
 ValidYN?: string;
}

export interface Grant {
 /** Grant ID */
 GrantID?: string;
 /** Grant acronym */
 Acronym?: string;
 /** Grant funding agency */
 Agency?: string;
 /** Grant country */
 Country?: string;
}

export interface PublicationType {
 _: string;
 UI?: string;
}

export interface MeshHeading {
 /** Descriptor name */
 DescriptorName: {
  _: string;
  UI: string;
  MajorTopicYN?: string;
  Type?: string;
 };
 /** Qualifier name */
 QualifierName?: {
  _: string;
  UI: string;
  MajorTopicYN?: string;
 }[];
}

export interface Keyword {
 _: string;
 MajorTopicYN?: string;
}

export interface Chemical {
 /** Registry number */
 RegistryNumber: string;
 /** Name of substance */
 NameOfSubstance: {
  _: string;
  UI: string;
 };
}

export interface CommentsCorrections {
 /** Reference type */
 RefType: string;
 /** Referenced PMID */
 RefSource: string;
 /** PMID of the reference */
 PMID?: {
  _: string;
  Version?: string;
 };
 /** Note about the reference */
 Note?: string;
}

export interface OtherID {
 _: string;
 Source: string;
}

export interface ArticleId {
 _: string;
 IdType: string;
}

export interface GeneralNote {
 _: string;
 Owner?: string;
}

export interface PubmedData {
 /** History of the article */
 History?: {
  PubMedPubDate: PubMedPubDate[];
 };
 /** Publication status */
 PublicationStatus?: string;
 /** Article ID list */
 ArticleIdList: {
  ArticleId: ArticleId[];
 };
 /** References cited in the article */
 ReferenceList?: {
  Reference: Reference[];
 };
}

export interface PubMedPubDate {
 Year: string;
 Month: string;
 Day: string;
 Hour?: string;
 Minute?: string;
 PubStatus: string;
}

export interface Reference {
 /** Citation text */
 Citation?: string;
 /** Article ID list */
 ArticleIdList?: {
  ArticleId: ArticleId[];
 };
}
```
