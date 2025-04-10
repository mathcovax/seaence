import { PubMedAPI } from "@interfaces/providers/scienceDatabase/pubmed";

await PubMedAPI.getArticle("36999350").then(({ body }) => void console.log(JSON.stringify(body, undefined, 4)));
