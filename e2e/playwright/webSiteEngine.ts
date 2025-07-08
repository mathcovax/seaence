import test, { expect, type Page } from "@playwright/test";
import { type createPageEngine } from "./pageEngine";
import { type createComponentEngine } from "./component";

export interface WebSiteEngine {
	playwrightPage: Page;
	iNavigateTo<
		GenericPageEngine extends ReturnType<typeof createPageEngine>,
	>(
		pageEngine: GenericPageEngine,
		...args: Parameters<ReturnType<GenericPageEngine>["makePath"]>
	): Promise<ReturnType<GenericPageEngine>>;
	iGoTo<
		GenericPageEngine extends ReturnType<typeof createPageEngine>,
	>(
		pageEngine: GenericPageEngine,
		...args: Parameters<ReturnType<GenericPageEngine>["makePath"]>
	): Promise<ReturnType<GenericPageEngine>>;
	iWantToBeOnThisPage<
		GenericPageEngine extends ReturnType<typeof createPageEngine>,
	>(
		pageEngine: GenericPageEngine,
		...args: Parameters<ReturnType<GenericPageEngine>["makePath"]>
	): Promise<ReturnType<GenericPageEngine>>;
	iWantToSee<
		GenericComponentEngine extends ReturnType<typeof createComponentEngine>,
	>(
		componentEngine: GenericComponentEngine,
	): Promise<ReturnType<GenericComponentEngine>>;
}

export function createWebSiteEngine(
	playwrightPage: Page,
) {
	const webSite: WebSiteEngine = {
		playwrightPage,
		async iNavigateTo(pageEngine, params) {
			const page = pageEngine(webSite);

			const path = page.makePath(params);

			await test.step(
				`I navigate to ${page.name}:${path}`,
				async() => {
					await playwrightPage.goto(path);

					await Promise.all([
						expect(playwrightPage).toHaveURL(path),
						expect(page.mainElement).toBeVisible(),
					]);
				},
			);

			return page as never;
		},
		async iGoTo(pageEngine, params) {
			const page = pageEngine(webSite);

			const path = page.makePath(params);

			await test.step(
				`I go to ${page.name}:${path}`,
				async() => {
					await playwrightPage.goto(path);
				},
			);

			return page as never;
		},
		async iWantToBeOnThisPage(pageEngine, params) {
			const page = pageEngine(webSite);

			const path = page.makePath(params);

			await test.step(
				`I want be on this page ${page.name}:${path}`,
				async() => {
					await Promise.all([
						expect(playwrightPage).toHaveURL(path),
						expect(page.mainElement).toBeVisible(),
					]);
				},
			);

			return page as never;
		},
		async iWantToSee(componentEngine) {
			const component = componentEngine(webSite);

			await test.step(
				`I want to see ${component.name}`,
				async() => {
					await expect(component.mainElement).toBeVisible();
				},
			);

			return component as never;
		},
	};

	return webSite;
}
