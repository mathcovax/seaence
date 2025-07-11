/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import test, { expect, type Page } from "@playwright/test";
import { type PageInstance, type createPageEngine } from "./pageEngine";
import { type createComponentEngine } from "./componentEngine";

export interface WebSiteInstance {
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
	iWantToExist<
		GenericComponentEngine extends ReturnType<typeof createComponentEngine>,
	>(
		componentEngine: GenericComponentEngine,
	): Promise<ReturnType<GenericComponentEngine>>;
}

export function webSiteEngine(
	playwrightPage: Page,
) {
	const webSite: WebSiteInstance = {
		playwrightPage,
		async iNavigateTo(pageEngine, ...args) {
			const page = pageEngine(webSite) as PageInstance<string, never>;

			const path = page.makePath(args.shift() as never);

			await test.step(
				`webSite: I navigate to ${page.name}:${path}`,
				async() => {
					await playwrightPage.goto(path);
					await expect(playwrightPage).toHaveURL(path);
					await expect(page.mainElement).toBeVisible();
				},
			);

			return page as never;
		},
		async iGoTo(pageEngine, ...args) {
			const page = pageEngine(webSite) as PageInstance<string, never>;

			const path = page.makePath(args.shift() as never);

			await test.step(
				`webSite: I go to ${page.name}:${path}`,
				async() => {
					await playwrightPage.goto(path);
				},
			);

			return page as never;
		},
		async iWantToBeOnThisPage(pageEngine, ...args) {
			const page = pageEngine(webSite) as PageInstance<string, never>;

			const path = page.makePath(args.shift() as never);

			await test.step(
				`webSite: I want be on this page ${page.name}:${path}`,
				async() => {
					await expect(playwrightPage).toHaveURL(path);
					await expect(page.mainElement).toBeVisible();
				},
			);

			return page as never;
		},
		async iWantToSee(componentEngine) {
			const component = componentEngine(webSite) as PageInstance<string, never>;

			await test.step(
				`webSite: I want to see ${component.name}`,
				async() => {
					await expect(component.mainElement).toBeVisible();
				},
			);

			return component as never;
		},
		async iWantToExist(componentEngine) {
			const component = componentEngine(webSite) as PageInstance<string, never>;

			await test.step(
				`webSite: I want to exist ${component.name}`,
				async() => {
					await expect(component.mainElement).toBeAttached();
				},
			);

			return component as never;
		},
	};

	return webSite;
}
