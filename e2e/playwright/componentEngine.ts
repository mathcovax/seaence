
import { type Page, type Locator } from "@playwright/test";
import { type WebSiteInstance } from "./webSiteEngine";
import { type AnyFunction } from "@duplojs/utils";

export type Elements = Record<string, Locator>;

export interface ComponentInstance<
	GenericName extends string = string,
	GenericElements extends Elements | undefined = Elements | undefined,
	GenericActions extends Record<string, AnyFunction> | undefined = Record<string, AnyFunction> | undefined,
> {
	component: unknown;
	name: GenericName;
	get mainElement(): Locator;
	elements: GenericElements;
	actions: GenericActions;
}

export function createComponentEngine<
	GenericName extends string,
	GenericElements extends Elements | undefined = undefined,
	GenericActions extends Record<string, AnyFunction> | undefined = undefined,
>(
	name: GenericName,
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
	return (webSite: WebSiteInstance) => {
		const mainElement = getMainElement(
			webSite.playwrightPage,
		);

		const elements = getElements?.(mainElement);

		const actions = getActions?.(
			{
				...elements,
				mainElement,
			} as never,
		);

		return {
			name,
			mainElement,
			elements,
			actions,
		} as ComponentInstance<
			GenericName,
			GenericElements,
			GenericActions
		>;
	};
}
