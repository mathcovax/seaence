export function mapAsync<
	GenericItem,
	GenericCallbackFn extends(
		(value: GenericItem, index: number) => Promise<unknown>
	),
>(
	items: GenericItem[],
	callback: GenericCallbackFn,
): Promise<Awaited<ReturnType<GenericCallbackFn>>[]> {
	return Promise.all<Awaited<ReturnType<GenericCallbackFn>>>(
		items
			.map((value, index) => callback(value, index) as never),
	);
}
