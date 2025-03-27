import { routerPageNameMain } from "@/domains/edito/router";
import { routerPageNameSearch } from "@/domains/search/router";
import { routerPageNameAuth } from "@/domains/auth/router";

export const routerPageName = Object.freeze({
	...routerPageNameMain,
	...routerPageNameSearch,
	...routerPageNameAuth,
});
