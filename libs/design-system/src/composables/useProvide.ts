import { inject, provide } from "vue";

export function useProvide<
	GenericValue extends unknown,
>() {
	const currentSymbole = Symbol("provideSymbole");

	return {
		initProvide(value: GenericValue) {
			provide(currentSymbole, value);
		},
		getProvidedValue() {
			return inject<GenericValue>(currentSymbole);
		},
	};
}
