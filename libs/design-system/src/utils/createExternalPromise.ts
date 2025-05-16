/* eslint-disable func-style */

export function createExternalPromise<
	GenericPromiseValue extends Promise<unknown>,
>() {
	type PossibleValue = Awaited<GenericPromiseValue> | GenericPromiseValue | Promise<GenericPromiseValue>;

	let resolve = (_value: PossibleValue) => {};
	let reject = (_value: PossibleValue) => {};
	const promise = new Promise<PossibleValue>((res, rej) => {
		resolve = res;
		reject = rej;
	}) as GenericPromiseValue;

	return {
		resolve,
		reject,
		promise,
	};
}
