
import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { userRules } from "@vendors/entity-rules";

export const userIdObjecter = zod
	.string()
	.createValueObjecter("userId");

export const userEmailObjecter = zod
	.string()
	.email()
	.createValueObjecter("userEmail");

export const userUsernameObjecter = zod
	.string()
	.min(userRules.username.minLength)
	.max(userRules.username.maxLength)
	.createValueObjecter("userUsername");

export type UserEmail = GetValueObject<typeof userEmailObjecter>;
export type UserUsername = GetValueObject<typeof userUsernameObjecter>;
export type UserId = GetValueObject<typeof userIdObjecter>;

type InputCreateUserEntity = Omit<GetEntityProperties<typeof UserEntity>, "username">;

export class UserEntity extends EntityHandler.create({
	id: userIdObjecter,
	email: userEmailObjecter,
	username: userUsernameObjecter,
}) {
	public static create(params: InputCreateUserEntity) {
		return new UserEntity({
			...params,
			username: userUsernameObjecter.unknownUnsafeCreate(
				params.email.value.split("@").shift(),
			),
		});
	}

	public rename(newUsername: UserUsername) {
		return this.update({
			username: newUsername,
		});
	}
}
