import { resolve } from "path";
import { Worker } from "worker_threads";
import { type SearchResultMisson } from "./missions/searchResult";

export interface WorkersMissionStruct<
	GenericName extends string,
	GenericParams extends object,
> {
	name: GenericName;
	params: GenericParams;
}

export type WorkersMission =
	| SearchResultMisson;

export class WorkersCluster {
	public static workers: Worker[];

	public static missons: (WorkersMission)[];

	public static up(numberOfWorkersToBeRaised: number) {
		const newWorkers = Array
			.from({ length: numberOfWorkersToBeRaised })
			.map(() => new Worker(resolve(import.meta.dirname, "main.ts")));

		this.workers.push(...newWorkers);
	}
}
