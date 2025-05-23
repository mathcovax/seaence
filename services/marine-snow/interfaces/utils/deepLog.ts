export function deepLog(message: unknown) {
	console.dir(
		message,
		{
			depth: 10,
			colors: true,
		},
	);
}
