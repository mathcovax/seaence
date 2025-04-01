interface CleanErrorMoreData {
	message?: string;
	error?: Error;
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
