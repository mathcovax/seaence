import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";

export const userIdObjecter = zod.string().createValueObjecter("userId");
export type UserId = GetValueObject<typeof userIdObjecter>;

export const usernameObjecter = zod.string().createValueObjecter("username");
export type Username = GetValueObject<typeof usernameObjecter>;

export const userEmailObjecter = zod.string().createValueObjecter("userEmail");
export type UserEmail = GetValueObject<typeof userEmailObjecter>;

export class UserEntity extends EntityHandler.create({
	id: userIdObjecter,
	username: usernameObjecter,
	email: userEmailObjecter,
}) {
	public static create(params: GetEntityProperties<typeof UserEntity>) {
		return new UserEntity(params);
	}
}
