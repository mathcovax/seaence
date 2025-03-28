import { EntityHandler, type GetEntityProperties, type GetValueObject } from "@vendors/clean";

export const userIdObjecter = zod.string().createValueObjecter("userId");
const usernameObjecter = zod.string().createValueObjecter("username");

export type UserId = GetValueObject<typeof userIdObjecter>;
export type Username = GetValueObject<typeof usernameObjecter>;

export class UserEntity extends EntityHandler.create({
	userId: userIdObjecter,
	username: usernameObjecter,
}) {
	public static create(params: GetEntityProperties<UserEntity>) {
		return new UserEntity(params);
	}
}
