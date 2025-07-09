import test, { expect } from "@playwright/test";
import { type ComponentInstance } from "./componentEngine";

export namespace Actions {
	export function click<
		GenericComponent extends ComponentInstance,
	>(
		component: GenericComponent,
		elementKey: keyof GenericComponent["elements"],
	) {
		const element = component.elements?.[elementKey as never];

		if (!element) {
			throw new Error("Missing Element.");
		}

		return test.step(
			`${component.name}: I click on "${elementKey.toString()}".`,
			async() => {
				await expect(element).toBeVisible();

				await element.click();
			},
		);
	}
}
