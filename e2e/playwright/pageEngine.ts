import { type Locator, type Page } from "@playwright/test";
import { createComponentEngine, type Elements, type ComponentEngine } from "./component";
import { type WebSiteEngine } from "./webSiteEngine";
import { type AnyFunction } from "@duplojs/utils";

export interface PageEngine<
	GenericName extends string,
	GenericPathParams extends Record<string, string>,
	GenericElement extends Elements | undefined,
	GenericActions extends Record<string, AnyFunction> | undefined,
> extends ComponentEngine<
		GenericName,
		GenericElement,
		GenericActions
	> {
	page: unknown;
	makePath(
		...args: {} extends GenericPathParams
			? [params: GenericPathParams]
			: []
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

	return (webSite: WebSiteEngine): PageEngine<
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
