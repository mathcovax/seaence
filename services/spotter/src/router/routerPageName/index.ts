import { routerPageNameMain } from "@/domains/edito/router";
import { routerPageNameAuth } from "@/domains/auth/router";

export const routerPageName = Object.freeze({
	...routerPageNameMain,
	...routerPageNameAuth,
});
