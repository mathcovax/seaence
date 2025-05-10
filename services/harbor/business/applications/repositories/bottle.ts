import { type UserEntity } from "@business/domains/entities/user";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface BottleRepository extends RepositoryBase {
	sendInscriptionNotification(user: UserEntity): Promise<unknown>;
}

export const bottleRepository = createRepositoryHandler<BottleRepository>();
