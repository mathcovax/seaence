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

process.on(
	"uncaughtException",
	(error, origine) => {
		logger(error, origine);
		process.exit(process.exitCode);
	},
);
