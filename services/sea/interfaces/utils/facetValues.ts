import { stringArrayToRegex } from "./stringArrayToRegex";

export class FacetValues extends Array<string> {
	public regex: RegExp;

	public constructor(...values: string[]) {
		super();
		this.push(...values);
		this.regex = stringArrayToRegex(values, "i");
	}
}
