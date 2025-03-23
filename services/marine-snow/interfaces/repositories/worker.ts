import { workerRepository } from "@business/applications/repositories/worker";
import { WorkerCluster } from "@interfaces/worker";

workerRepository.default = {
	save() {
		throw new Error("This method is not allowed");
	},
	up(quantity) {
		WorkerCluster.up(quantity);

		return Promise.resolve();
	},
	close(quantity) {
		WorkerCluster.close(quantity);

		return Promise.resolve();
	},
	count() {
		return Promise.resolve(
			WorkerCluster.workers.length,
		);
	},
};
