export function repeater<
	GenericCallbackFn extends((index: number) => Promise<unknown>),
>(
	length: number,
	callback: GenericCallbackFn,
): Promise<Awaited<ReturnType<GenericCallbackFn>>[]> {
	return Promise.all<Awaited<ReturnType<GenericCallbackFn>>>(
		Array
			.from({ length })
			.map((_value, index) => callback(index) as never),
	);
}
