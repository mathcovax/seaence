export function deepLog(message: unknown) {
	console.dir(
		message,
		{
			depth: 5,
			colors: true,
		},
	);
}
