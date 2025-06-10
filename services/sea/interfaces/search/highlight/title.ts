
interface Params {
	strict?: string[];
	stamed?: string[];
	source: string;
}

export function highlightTitle(
	{
		strict,
		stamed,
		source,
	}: Params,
) {
	if (!strict && !stamed) {
		return source;
	}

	let title = source;

	if (strict) {
		title = strict.reduce(
			(acc, value) => acc.replaceAll(
				value,
				`<strong class="matching-result-strict">${value}</strong>`,
			),
			title,
		);
	}

	if (stamed) {
		title = stamed.reduce(
			(acc, value) => acc.replaceAll(
				value,
				`<strong class="matching-result">${value}</strong>`,
			),
			title,
		);
	}

	return title;
}
