
import { type Locator } from "@playwright/test";
import { type WebSiteInstance } from "./webSiteEngine";

export type ComponentElements = Record<string, Locator>;

export interface ComponentInstance<
	GenericName extends string = string,
	GenericElements extends ComponentElements | undefined = ComponentElements | undefined,
> {
	component: unknown;
	name: GenericName;
	get mainElement(): Locator;
	elements: GenericElements;
}

export function createComponentEngine<
	GenericName extends string,
	GenericElements extends ComponentElements | undefined = undefined,
>(
	name: GenericName,
	{
		getMainElement,
		getElements,
	}: {
		getMainElement(body: Locator): Locator;
		getElements?(mainElement: Locator, body: Locator): GenericElements;
	},
) {
	return (webSite: WebSiteInstance) => {
		const body = webSite.playwrightPage.locator("body");
		const mainElement = getMainElement(
			body,
		);

		const elements = getElements?.(mainElement, body);

		return {
			name,
			mainElement,
			elements,
		} as ComponentInstance<
			GenericName,
			GenericElements
		>;
	};
}
