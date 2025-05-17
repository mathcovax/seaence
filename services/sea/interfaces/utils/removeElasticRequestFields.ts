import { type MybeArray } from "@vendors/clean";

const typeObject = "object";

export function removeElasticRequestFields(elasticRequestFields: MybeArray<Record<string, unknown>>) {
	if (elasticRequestFields instanceof Array) {
		for (const value of elasticRequestFields) {
			if (value && typeof value === typeObject) {
				removeElasticRequestFields(value);
			}
		}
	} else {
		for (const key in elasticRequestFields) {
			if (key.startsWith("__")) {
				elasticRequestFields[key] = undefined;
			} else if (elasticRequestFields[key] && typeof elasticRequestFields[key] === typeObject) {
				removeElasticRequestFields(elasticRequestFields[key] as never);
			}
		}
	}
}
