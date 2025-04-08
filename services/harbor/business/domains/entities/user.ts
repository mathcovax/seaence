
import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";

export const userIdObjecter = zod.string().createValueObjecter("userId");
export const userEmailObjecter = zod.string().email().createValueObjecter("userEmail");
export const userUsernameObjecter = zod.string().createValueObjecter("userUsername");

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
			username: this.extractUsername(params.email),
		});
	}

	private static extractUsername(email: UserEmail) {
		const username = email.value.split("@").shift();

		if (!username) {
			throw new Error("Invalid email format");
		}

		return userUsernameObjecter.unsafeCreate(username);
	}
}
