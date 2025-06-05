
import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
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

export const userBannedObjecter = zod
	.boolean()
	.createValueObjecter("userBanned");

export type UserBanned = GetValueObject<typeof userBannedObjecter>;
export type UserEmail = GetValueObject<typeof userEmailObjecter>;
export type UserUsername = GetValueObject<typeof userUsernameObjecter>;
export type UserId = GetValueObject<typeof userIdObjecter>;

type InputCreateUserEntity = Omit<GetEntityProperties<typeof UserEntity>, "lastUpdate">;

type UpdatePropsUserEntity = Partial<
	Pick<GetEntityProperties<typeof UserEntity>, "username">
>;

export class UserEntity extends EntityHandler.create({
	id: userIdObjecter,
	email: userEmailObjecter,
	username: userUsernameObjecter,
	lastUpdate: commonDateObjecter,
	banned: userBannedObjecter,
}) {
	public static create(params: InputCreateUserEntity) {
		return new UserEntity({
			...params,
			lastUpdate: commonDateObjecter.unsafeCreate(new Date()),
		});
	}

	public updateProps(values: UpdatePropsUserEntity) {
		return this.update({
			...values,
			lastUpdate: commonDateObjecter.unsafeCreate(new Date()),
		});
	}

	public updateDelayIsRespected() {
		return (Date.now() - this.lastUpdate.value.getTime()) > userRules.updateDelay;
	}
}
