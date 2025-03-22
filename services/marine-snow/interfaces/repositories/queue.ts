import { queueRepository } from "@business/applications/repositories/queue";
import { queue } from "@interfaces/providers/queue";

queueRepository.default = {
	save() {
		throw new Error("This method is not allowed");
	},

	addInQueue(mission) {
		queue.push(mission);

		return Promise.resolve();
	},

	getFirst() {
		return Promise.resolve(
			queue.shift() ?? null,
		);
	},
};
