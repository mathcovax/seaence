export function stringCanBe<
	GenericValue extends string,
	GenericValues extends GenericValue,
>(
	value: GenericValue,
	values: GenericValues[],
): value is GenericValues {
	return values.includes(value as never);
}
