import { type Locator } from "@playwright/test";
import { createComponentEngine, type ComponentElements, type ComponentInstance } from "./componentEngine";
import { type WebSiteInstance } from "./webSiteEngine";
import { type IsEqual } from "@duplojs/utils";

export interface PageInstance<
	GenericName extends string = string,
	GenericPathParams extends Record<string, string> = Record<string, string>,
	GenericElement extends ComponentElements | undefined = ComponentElements | undefined,
> extends ComponentInstance<
		GenericName,
		GenericElement
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
	GenericElements extends ComponentElements | undefined = undefined,
>(
	name: GenericName,
	makePath: (params: GenericPathParams) => string,
	{
		getMainElement,
		getElements,
	}: {
		getMainElement(body: Locator): Locator;
		getElements?(mainElement: Locator, body: Locator): GenericElements;
	},
) {
	const component = createComponentEngine(
		name,
		{
			getMainElement,
			getElements,
		},
	);

	return (webSite: WebSiteInstance): PageInstance<
		GenericName,
		GenericPathParams,
		GenericElements
	> => {
		const pageBase = component(webSite);

		return {
			page: true,
			makePath: makePath as never,
			...pageBase,
		};
	};
}
