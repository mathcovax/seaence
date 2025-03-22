import { type MissionEntity } from "@business/domains/entities/mission";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface QueueRepository extends RepositoryBase<MissionEntity> {
	addInQueue(mission: MissionEntity): Promise<void>;
	getFirst(): Promise<MissionEntity>;
}

export const queueRepository = createRepositoryHandler<
	QueueRepository
>();
