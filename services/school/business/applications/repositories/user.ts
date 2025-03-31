import { type UserEntity, type UserId } from "@business/domains/entities/user";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface UserRepository extends RepositoryBase<UserEntity> {
	findOneById(userId: UserId): Promise<UserEntity | null>;
}

export const userRepository = createRepositoryHandler<UserRepository>();
