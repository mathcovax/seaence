import { type EntityToSimpleObject } from "@vendors/clean";
import { type UserEntity } from "@business/domains/entities/user";

export interface MongoUser extends EntityToSimpleObject<typeof UserEntity> {}

