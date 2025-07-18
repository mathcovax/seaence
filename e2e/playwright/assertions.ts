/* eslint-disable @typescript-eslint/no-use-before-define */
import { expect } from "@playwright/test";
import { createWrapperStepEmbeder, createStepEmbeder, type WrapperStepEmbededFunction } from "./createStepEmbeder";

const assertions = {
	toBeVisible({ element }) {
		return expect(element).toBeVisible();
	},
	async toHaveText({ element, component, elementKey }, context: string | RegExp = /.+/) {
		await Assertions.toBeVisible(component, elementKey);

		return expect(element).toHaveText(context);
	},
	async toHaveNoText({ element, component, elementKey }) {
		await Assertions.toBeVisible(component, elementKey);

		return expect(element).toHaveText("");
	},
	toBeHidden({ element }) {
		return expect(element).toBeHidden();
	},
} satisfies WrapperStepEmbededFunction;

export namespace Assertions {
	export const withStepContent = createWrapperStepEmbeder("$component: I want $element have $content.", assertions);

	export const toBeVisible = createStepEmbeder(
		"$component: I want $element is visible.",
		assertions.toBeVisible,
	);

	export const toHaveText = createStepEmbeder(
		"$component: I want $element have Text.",
		assertions.toHaveText,
	);

	export const toHaveNoText = createStepEmbeder(
		"$component: I want $element have no Text.",
		assertions.toHaveNoText,
	);

	export const toBeHidden = createStepEmbeder(
		"$component: I want $element is hidden.",
		assertions.toBeHidden,
	);
}
