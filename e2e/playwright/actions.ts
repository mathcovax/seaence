import { Assertions } from "./assertions";
import { createWrapperStepEmbeder, createStepEmbeder, type WrapperStepEmbededFunction } from "./createStepEmbeder";

const actions = {
	async click({ element, elementKey, component }) {
		await Assertions.toBeVisible(component, elementKey);

		return element.click();
	},
	async forceClick({ element }) {
		return element.click();
	},
	async fill({ element, elementKey, component }, content: string) {
		await Assertions.toBeVisible(component, elementKey);

		return element.fill(content);
	},
} satisfies WrapperStepEmbededFunction;

export namespace Actions {
	export const withStepContent = createWrapperStepEmbeder("$component: I $content on $element.", actions);

	export const click = createStepEmbeder(
		"$component: I click on $element.",
		actions.click,
	);

	export const forceClick = createStepEmbeder(
		"$component: I force click on $element.",
		actions.click,
	);

	export const fill = createStepEmbeder(
		"$component: I fill on $element.",
		actions.fill,
	);
}
