interface CleanErrorMoreData {
	message?: string;
	error?: Error;
	custom?: Record<string, unknown>;
}

export class CleanError<
	GenericInformation extends string = string,
> extends Error {
	public constructor(
		public information: GenericInformation,
		public moreData?: CleanErrorMoreData,
	) {
		super(moreData?.message ?? information);
	}
}
