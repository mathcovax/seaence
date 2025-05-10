const escapeCharRegex = /[.*+?^${}()|[\]\\]/g;

export function stringArrayToRegex(
	values: string[],
	flags = "",
) {
	const escapedValues = values.map(
		(value) => value.replace(escapeCharRegex, "\\$&"),
	);
	const pattern = escapedValues.join("|");
	return new RegExp(pattern, flags);
}
