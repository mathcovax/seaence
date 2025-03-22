import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";
import { type Mission } from "./mission";

export interface QueueRepository extends RepositoryBase<Mission> {
	addInQueue(mission: Mission): Promise<void>;
	getFirst(): Promise<Mission | null>;
}

export const queueRepository = createRepositoryHandler<
	QueueRepository
>();
