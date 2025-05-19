export function jsonKeyChanger(input: unknown, map: Record<string, string>): unknown {
	if (Array.isArray(input)) {
		return input.map((item) => jsonKeyChanger(item, map));
	} else if (input && typeof input === "object") {
		return Object.entries(input)
			.reduce(
				(acc, [key, value]) => {
					const compressedKey = map[key] ?? key;
					return {
						...acc,
						[compressedKey]: jsonKeyChanger(value, map),
					};
				},
				{},
			);
	}

	return input;
}

export function reverseJsonKeyChanger(input: unknown, map: Record<string, string>): unknown {
	const reverseKeyMap = Object.fromEntries(
		Object
			.entries(map)
			.map(([key, value]) => [value, key]),
	);

	return jsonKeyChanger(input, reverseKeyMap);
}
