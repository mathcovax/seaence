import { type UserId } from "@business/domains/entities/user";
import { type UserBannedId, type UserBannedEntity, type UserBannedUserId } from "@business/domains/entities/userBanned";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface UserBannedRepository extends RepositoryBase<UserBannedEntity> {
	generateUserBannedId(): UserBannedId;
	findByUserId(userId: UserId): Promise<UserBannedEntity | null>;
}

export const userBannedRepository = createRepositoryHandler<UserBannedRepository>();
