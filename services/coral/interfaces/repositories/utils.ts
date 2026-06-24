import { kindClass } from "@duplojs/utils";

export interface MoreDataError {
	[key: string]: unknown;
	message?: string;
	error?: Error;
}

export class TechnicalError extends kindClass(
	"technical-error",
	Error,
) {
	public constructor(
		public information: string,
		public moreData?: MoreDataError,
	) {
		super({}, `technical error: ${information}`);
	}
}

