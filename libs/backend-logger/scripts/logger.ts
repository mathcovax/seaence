export function logger(...args: any[]) {
	console.dir(
		args[1]
			? args
			: args[0],
		{
			depth: 10,
			colors: true,
		},
	);
}

export function forwardLogger<
	GenericValue extends unknown,
>(
	value: GenericValue,
): GenericValue {
	logger(value);
	return value;
}
