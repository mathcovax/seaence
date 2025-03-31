/* eslint-disable @typescript-eslint/no-magic-numbers */

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
				body: {
					esearchresult: {
						idlist: string[];
					};
				};
				ok: true;
			}
			| {
				code: 429;
				information: string;
				body: undefined;
				ok: false;
			};
	};
