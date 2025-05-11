import { type UserEntity } from "@business/domains/entities/user";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface UserRepository extends RepositoryBase<UserEntity> {}

export const userRepository = createRepositoryHandler<UserRepository>();
