import { type UserEntity } from "@business/domains/entities/user";
import { type EntityToSimpleObject } from "@vendors/clean";

export interface MongoUser extends EntityToSimpleObject<typeof UserEntity> {}
