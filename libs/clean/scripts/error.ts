export interface CleanErrorMoreData {
	[key: string]: unknown;
	message?: string;
	error?: Error;
}

export class CleanError<
	GenericInformation extends string = string,
	GenericMoreDate extends CleanErrorMoreData = {},
> extends Error {
	public constructor(
		public information: GenericInformation,
		public moreData: GenericMoreDate = {} as GenericMoreDate,
	) {
		super(moreData?.message ?? information);
	}
}

export class TechnicalError<
	GenericInformation extends string = string,
	GenericMoreDate extends CleanErrorMoreData = {},
> extends CleanError<GenericInformation, GenericMoreDate> {

}
