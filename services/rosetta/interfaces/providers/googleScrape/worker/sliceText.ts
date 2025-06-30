const indexOffset = 1;
const two = 2;
const startSplice = 0;

interface ScliceTextParams {
	maxSize: number;
	inRecurcive?: boolean;
}

export function scliceText(
	text: string,
	params: ScliceTextParams,
): string[] {
	if (text.length <= params.maxSize) {
		return [text];
	}

	const sclicedTextTwo = text.split(". ");

	const middleIndex = Math.floor((sclicedTextTwo.length - indexOffset) / two);

	const sclicedTextOne = sclicedTextTwo.splice(startSplice, middleIndex);

	const partOne = sclicedTextOne
		.filter(Boolean)
		.map((sliceText) => `${sliceText}. `)
		.join("");

	const partTwo = sclicedTextTwo
		.filter(Boolean)
		.map((sliceText) => `${sliceText}. `)
		.join("");

	const sclicedTextPartOne = scliceText(partOne, {
		...params,
		inRecurcive: true,
	});

	const sclicedTextPartTwo = scliceText(partTwo, {
		...params,
		inRecurcive: true,
	});

	if (sclicedTextPartTwo.length && !params.inRecurcive) {
		sclicedTextPartTwo[sclicedTextPartTwo.length - indexOffset]
			= sclicedTextPartTwo[sclicedTextPartTwo.length - indexOffset].replace(/\. $/, "");
	}

	return [
		...sclicedTextPartOne,
		...sclicedTextPartTwo,
	];
}

