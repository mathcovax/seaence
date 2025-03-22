import { workerRepository } from "@business/applications/repositories/worker";
import { WorkersCluster } from "@interfaces/worker";

workerRepository.default = {
	save() {
		throw new Error("This method is not allowed");
	},
	up(quantity) {
		WorkersCluster.up(quantity);

		return Promise.resolve();
	},
	close(quantity) {
		WorkersCluster.close(quantity);

		return Promise.resolve();
	},
	count() {
		return Promise.resolve(
			WorkersCluster.workers.length,
		);
	},
};
