import { type UserEntity } from "@business/domains/entities/user";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface BottleRepository extends RepositoryBase {
	createRegisterNotification(user: UserEntity): Promise<void>;
}

export const bottleRepository = createRepositoryHandler<BottleRepository>();
