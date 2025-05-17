/* eslint-disable @typescript-eslint/no-magic-numbers */

import { type ArticlePayload } from "./article";
import { type SearchResultPayload } from "./searchResult";

export type PubMedRoute =
	| {
		method: "GET";
		path: "/entrez/eutils/esearch.fcgi";
		query: {
			db: string;
			term: string;
			retmax: string;
			retstart: string;
			retmode: string;
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
			db: string;
			id: string | string[];
			retmode: string;
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
