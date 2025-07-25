/* eslint-disable @typescript-eslint/no-explicit-any */
import test, { type Locator } from "@playwright/test";
import { type ComponentInstance } from "./componentEngine";

interface ContextStepEmbeded {
	component: ComponentInstance<string, Record<string, Locator>>;
	elementKey: string;
	element: Locator;
}

export type StepEmbededFunction = (context: ContextStepEmbeded, ...args: any) => any;

export type WrapperStepEmbededFunction = Record<string, StepEmbededFunction>;

export function createStepEmbeder<
	GenericStepEmbededFunction extends StepEmbededFunction,
>(
	stepName: string,
	step: GenericStepEmbededFunction,
) {
	return <
		GenericComponent extends ComponentInstance,
	>(
		component: GenericComponent,
		elementKey: keyof GenericComponent["elements"],
		...args: Parameters<GenericStepEmbededFunction> extends [any, ...infer InferedRest] ? InferedRest : never
	) => {
		const element = component.elements?.[elementKey as never];

		if (!element) {
			throw new Error("Missing Element.");
		}

		return test.step(
			stepName
				.replace("$component", component.name)
				.replace("$element", elementKey.toString()),
			() => step(
				{
					element,
					component,
					elementKey,
				} as never,
				...args,
			),
		) as ReturnType<typeof step>;
	};
}

export function createWrapperStepEmbeder<
	GenericWrapperStepEmbededFunction extends WrapperStepEmbededFunction,
>(
	baseStepName: string,
	wrapperStepEmbededFunction: GenericWrapperStepEmbededFunction,
) {
	return (stepName: string) => new Proxy(
		wrapperStepEmbededFunction,
		{
			get(target, prop: never) {
				return createStepEmbeder(
					baseStepName.replace("$content", stepName),
					target[prop],
				);
			},
		},
	) as {
		[Prop in keyof GenericWrapperStepEmbededFunction]:
		ReturnType<typeof createStepEmbeder<GenericWrapperStepEmbededFunction[Prop]>>
	};
}
