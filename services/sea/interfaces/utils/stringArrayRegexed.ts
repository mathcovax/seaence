import { stringArrayToRegex } from "./stringArrayToRegex";

export class StringArrayRegexed extends Array<string> {
	public regex: RegExp;

	public constructor(...values: string[]) {
		super();
		this.push(...values);
		this.regex = stringArrayToRegex(values, "i");
	}
}
