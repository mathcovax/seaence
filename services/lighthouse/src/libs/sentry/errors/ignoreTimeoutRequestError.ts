export class IgnoreTimeoutRequestError extends Error {
	public constructor(message?: string) {
		super(message ?? "No reason.");
	}
}
