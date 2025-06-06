const zero = 0;
const defaultMaxWorld = 50;

export function summarizeText(
	text: string,
	maxWords = defaultMaxWorld,
) {
	if (!text) {
		return "";
	}

	const words = text.trim().split(/\s+/);

	if (words.length <= maxWords) {
		return text;
	}

	const truncatedWords = words.slice(zero, maxWords);
	return `${truncatedWords.join(" ")}...`;
}
