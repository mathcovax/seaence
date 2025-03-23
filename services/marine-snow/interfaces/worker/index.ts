import { resolve } from "path";
import { Worker } from "worker_threads";
import { type Mission } from "@business/applications/repositories/mission";
import { searchResultMissionFailedUsecase } from "@business/applications/usecases/missinon/searchResultMissionFailed";
import { type WorkerResult } from "./missions";
import { providerObjecter } from "@business/domains/common/provider";
import { urlObjecter } from "@business/domains/common/url";
import { articleTypeObjecter } from "@business/domains/common/articleType";
import { createSearchResultUsecase } from "@business/applications/usecases/searchResult/createSearchResult";
import { searchResultMissionSuccessUsecase } from "@business/applications/usecases/missinon/searchResultMissionSuccess";
import { getFirstMissionOfTheQueueUsecase } from "@business/applications/usecases/queue/getFirstMissionOfTheQueue";
import { queue } from "@interfaces/providers/queue";
import { Observable } from "@gullerya/object-observer";

export class WorkerCluster {
	public plannedClosure = false;

	public currentMission: Mission | null = null;

	public worker = new Worker(resolve(import.meta.dirname, "./missions/index.ts"));

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
			this.currentMission.toSimpleObject(),
		);
	}

	public async finishMission() {
		this.currentMission = null;

		if (this.plannedClosure) {
			await WorkerCluster.shutdownWorker(this);
		} else {
			await WorkerCluster.loopMatchMission();
		}
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

		await this.finishMission();
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

		await this.finishMission();
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

		await WorkerCluster.shutdownWorker(this);
	}

	public static workers: WorkerCluster[];

	private static preSelectedWorker = new Set<WorkerCluster>();

	public static up(quantity: number) {
		const newWorkers = Array
			.from({ length: quantity })
			.map(() => new WorkerCluster());

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

	private static async shutdownWorker(workerCluster: WorkerCluster) {
		this.workers = this.workers.filter(
			(worker) => worker !== workerCluster,
		);

		await workerCluster.worker.terminate();
	}

	private static async loopMatchMission() {
		const availableWorker = this.workers.find(
			(worker) => !worker.currentMission
			&& !worker.plannedClosure
			&& !this.preSelectedWorker.has(worker),
		);

		if (!availableWorker) {
			return;
		}

		this.preSelectedWorker.add(availableWorker);

		const mission = await getFirstMissionOfTheQueueUsecase.execute({});

		this.preSelectedWorker.delete(availableWorker);

		if (!mission) {
			return;
		}

		availableWorker.startMission(mission);
	}

	static {
		Observable.observe(
			queue,
			([change]) => {
				if (change.type === "insert") {
					void this.loopMatchMission();
				}
			},
		);
	}
}
