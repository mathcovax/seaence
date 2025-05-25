export function logger(...args: any[]) {
	console.dir(
		args[1]
			? args
			: args[1],
		{
			depth: 10,
			colors: true,
		},
	);
}
