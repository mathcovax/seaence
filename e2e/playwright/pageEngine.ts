import { type Locator, type Page } from "@playwright/test";
import { createComponentEngine, type Elements, type ComponentInstance } from "./componentEngine";
import { type WebSiteInstance } from "./webSiteEngine";
import { type IsEqual, type AnyFunction } from "@duplojs/utils";

export interface PageInstance<
	GenericName extends string = string,
	GenericPathParams extends Record<string, string> = Record<string, string>,
	GenericElement extends Elements | undefined = Elements | undefined,
	GenericActions extends Record<string, AnyFunction> | undefined = Record<string, AnyFunction> | undefined,
> extends ComponentInstance<
		GenericName,
		GenericElement,
		GenericActions
	> {
	page: unknown;
	makePath(
		...args: IsEqual<GenericPathParams, Record<string, string>> extends true
			? []
			: [params: GenericPathParams]
	): string;
}

export function createPageEngine<
	GenericName extends string,
	GenericPathParams extends Record<string, string>,
	GenericElements extends Elements | undefined = undefined,
	GenericActions extends Record<string, AnyFunction> | undefined = undefined,
>(
	name: GenericName,
	makePath: (params?: GenericPathParams) => string,
	{
		getMainElement,
		getElements,
		getActions,
	}: {
		getMainElement(page: Page): Locator;
		getElements?(mainElement: Locator): GenericElements;
		getActions?(elements: GenericElements & { mainElement: Locator }): GenericActions;
	},
) {
	const component = createComponentEngine(
		name,
		{
			getMainElement,
			getElements,
			getActions,
		},
	);

	return (webSite: WebSiteInstance): PageInstance<
		GenericName,
		GenericPathParams,
		GenericElements,
		GenericActions
	> => {
		const pageBase = component(webSite);

		return {
			page: true,
			makePath,
			...pageBase,
		};
	};
}
