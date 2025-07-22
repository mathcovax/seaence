import { type WebSiteInstance } from "@playwright";
import { evalSetLocalStorageItem } from "./evalSetLocalStorageItem";

export interface SetLocalStorageItemParams {
	webSite: WebSiteInstance;
	key: string;
	value: string;
}

export function setLocalStorageItem(
	{
		webSite,
		key,
		value,
	}: SetLocalStorageItemParams,
) {
	return webSite.playwrightPage.evaluate(
		evalSetLocalStorageItem,
		[key, value],
	);
}
