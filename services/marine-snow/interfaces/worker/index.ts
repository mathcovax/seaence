import { resolve } from "path";
import { Worker } from "worker_threads";
import { type Mission } from "@business/applications/repositories/mission";
import { searchResultMissionFailedUsecase } from "@business/applications/usecases/missinon/searchResultMissionFailed";
import { type WorkerResult } from "./main";
import { providerObjecter } from "@business/domains/common/provider";
import { urlObjecter } from "@business/domains/common/url";
import { articleTypeObjecter } from "@business/domains/common/articleType";
import { createSearchResultUsecase } from "@business/applications/usecases/searchResult/createSearchResult";
import { searchResultMissionSuccessUsecase } from "@business/applications/usecases/missinon/searchResultMissionSuccess";

export class WorkersCluster {
	public plannedClosure = false;

	public currentMission: Mission | null = null;

	public worker = new Worker(resolve(import.meta.dirname, "main.ts"));

	public constructor() {
		this.worker.on(
			"message",
			this.successMission.bind(this),
		);

		this.worker.on(
			"messageerror",
			this.failedMission.bind(this),
		);

		this.worker.on(
			"error",
			this.error.bind(this),
		);
	}

	public startMission(mission: Mission) {
		if (this.currentMission) {
			throw new Error("Worker alreay have mission.");
		}

		this.currentMission = mission;

		this.worker.emit(
			"message",
			this.currentMission.toJSON(),
		);
	}

	private async successMission(result: WorkerResult) {
		if (!this.currentMission) {
			throw new Error(`Worker d'ont have mission but recieve success output : ${JSON.stringify(result)}.`);
		}

		if (result.name === "searchResult") {
			const promiseList = result.data
				.map(
					({ provider, url, articleType }) => createSearchResultUsecase.execute({
						provider: providerObjecter.unsafeCreate(provider),
						url: urlObjecter.unsafeCreate(url),
						articleType: articleTypeObjecter.unsafeCreate(articleType),
					}),
				);

			await Promise.all(promiseList);

			return;
		} else {
			console.error(`Unsupport mission result : ${JSON.stringify(result)}`);
		}

		await searchResultMissionSuccessUsecase.execute(
			{
				mission: this.currentMission,
			},
		);

		this.currentMission = null;
	}

	private async failedMission(data: string) {
		console.error(data);

		if (!this.currentMission) {
			throw new Error(`Worker d'ont have mission but recieve failed output : ${data}.`);
		}

		await searchResultMissionFailedUsecase.execute(
			{
				mission: this.currentMission,
			},
		);

		this.currentMission = null;
	}

	private async error(data: unknown) {
		console.error(`Worker error : ${JSON.stringify(data)}`);

		if (this.currentMission) {
			await searchResultMissionFailedUsecase.execute(
				{
					mission: this.currentMission,
				},
			);
		}

		this.currentMission = null;
		this.plannedClosure = true;

		await WorkersCluster.shutdownWorker(this);
	}

	public static workers: WorkersCluster[];

	public static up(quantity: number) {
		const newWorkers = Array
			.from({ length: quantity })
			.map(() => new WorkersCluster());

		this.workers.push(...newWorkers);
	}

	public static close(quantity: number) {
		let quantityPlannedClosure = 0;

		for (const workersCluster of this.workers) {
			if (workersCluster.plannedClosure) {
				continue;
			}

			workersCluster.plannedClosure = true;
			quantityPlannedClosure++;

			if (quantityPlannedClosure === quantity) {
				break;
			}
		}
	}

	private static async shutdownWorker(workersCluster: WorkersCluster) {
		this.workers = this.workers.filter(
			(worker) => worker !== workersCluster,
		);

		await workersCluster.worker.terminate();
	}
}
