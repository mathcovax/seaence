import { type WorkerEntity } from "@business/domains/entities/worker";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface WorkerRepository extends RepositoryBase<WorkerEntity> {
	up(quantity: number): Promise<void>;
	close(quantity: number): Promise<void>;
	count(): Promise<number>;
}

export const workerRepository = createRepositoryHandler<
	WorkerRepository
>();
