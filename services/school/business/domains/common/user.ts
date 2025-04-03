import { EntityHandler, type GetValueObject } from "@vendors/clean";
import { UserEntity } from "../entities/user";

export const userObjecter = EntityHandler.createEntityObjecter("user", UserEntity);

export type User = GetValueObject<typeof userObjecter>;
