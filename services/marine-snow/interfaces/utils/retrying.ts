import { sleep, type MybePromise } from "@duplojs/utils";

interface RetryOptions {
	maxRetry?: number;
	timeToSleep?: number;
}

export async function retry<
	GenericOutput extends unknown,
>(
	retryFunction: () => MybePromise<GenericOutput>,
	tryAgain: (result: GenericOutput) => boolean,
	options?: RetryOptions,
): Promise<GenericOutput> {
	const maxRetry = options?.maxRetry ?? Infinity;

	let result: GenericOutput | null = null;

	for (let index = 0; index < maxRetry; index++) {
		result = await retryFunction();

		if (!tryAgain(result)) {
			break;
		}

		if (options?.timeToSleep) {
			await sleep(options.timeToSleep);
		}
	}

	return result!;
}
