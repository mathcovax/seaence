import { Description, type Duplo, ExtractStep, instanceofDuplose, Route } from "@duplojs/core";
import { makeParsingBodyTextHook } from "@duplojs/node";
import { type BytesInString, stringToBytes } from "@duplojs/utils";

export class BodyLimitDescription extends Description {
	public size: number;

	public constructor(
		size: BytesInString | number,
	) {
		super();
		this.size = stringToBytes(size);
	}
}

export function bodyLimit() {
	return function(instance: Duplo) {
		instance.hook(
			"onRegistered",
			(duplose) => {
				if (!instanceofDuplose(Route, duplose)) {
					return;
				}

				const extractStep = duplose.definiton.steps.find(
					(step) => step instanceof ExtractStep,
				);

				if (!extractStep) {
					return;
				}

				const bodyLimitDescription = extractStep.descriptions.find(
					(description) => description instanceof BodyLimitDescription,
				);

				if (!bodyLimitDescription) {
					return;
				}

				duplose.hook(
					"parsingBody",
					makeParsingBodyTextHook({
						...instance.config,
						bodySizeLimit: bodyLimitDescription.size,
					}),
				);
			},
		);
	};
}
