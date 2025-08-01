/* eslint-disable @typescript-eslint/no-magic-numbers */

import { type ArticlePayload } from "./article";
import { type SearchResultPayload } from "./searchResult";

type Retmode = "json" | "xml";

type DB = "pubmed";

export type PubMedRoute =
	| {
		method: "GET";
		path: "/entrez/eutils/esearch.fcgi";
		query: {
			db: DB;
			term: string;
			retmax: string;
			retstart: string;
			retmode: "json";
		};
		response:
			| {
				code: 200;
				information: string;
				body: SearchResultPayload;
				ok: true;
			}
			| {
				code: 429;
				information: string;
				body: undefined;
				ok: false;
			};
	}
	| {
		method: "GET";
		path: "/entrez/eutils/efetch.fcgi";
		query: {
			db: DB;
			id: string | string[];
			retmode: "xml";
		};
		response:
			| {
				code: 200;
				information: string;
				body: ArticlePayload;
				ok: true;
			}
			| {
				code: 429;
				information: string;
				body: undefined;
				ok: false;
			};
	};
