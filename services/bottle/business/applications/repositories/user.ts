import { type UserId, type UserEntity } from "@business/domains/entities/user";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface UserRepository extends RepositoryBase<UserEntity> {
	findOneUserById(userId: UserId): Promise<UserEntity | null>;
}

export const userRepository = createRepositoryHandler<UserRepository>();
