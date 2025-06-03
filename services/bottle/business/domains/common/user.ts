import { EntityHandler } from "@vendors/clean";
import { UserEntity } from "../entities/user";

export const userObjecter = EntityHandler.createEntityObjecter("user", UserEntity);
