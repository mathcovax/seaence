/* eslint-disable func-style */

export function createExternalPromise<
	GenericPromiseValue extends unknown,
>() {
	type PossibleValue = Awaited<GenericPromiseValue> | GenericPromiseValue | Promise<GenericPromiseValue>;

	let resolve = (_value: PossibleValue) => {};
	let reject = (_value: PossibleValue) => {};
	const promise = new Promise<Awaited<GenericPromiseValue>>((res, rej) => {
		resolve = res as never;
		reject = rej;
	});

	return {
		resolve,
		reject,
		promise,
	};
}
