import { EntityHandler, zod, type GetEntityProperties } from "@vendors/clean";

export const workerIdObjecter = zod
	.string()
	.createValueObjecter("workerId");

export class WorkerEntity extends EntityHandler.create({
	workerId: workerIdObjecter,
}) {
	public static create(params: GetEntityProperties<typeof WorkerEntity>) {
		return new WorkerEntity(params);
	}
}
