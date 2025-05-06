import { type UserId, type UserEntity, type UserEmail } from "@business/domains/entities/user";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface UserRepository extends RepositoryBase<UserEntity> {
	generateUserId(): UserId;
	findOneByEmail(email: UserEmail): Promise<UserEntity | null>;
	findOneById(id: UserId): Promise<UserEntity | null>;
}

export const userRepository = createRepositoryHandler<UserRepository>();
