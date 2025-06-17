
import { commonDateObjecter, createEnum, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
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

export const userLanguageEnum = createEnum(["fr-FR", "en-US"]);
export const userLanguageObjecter = zod.enum(userLanguageEnum.toTuple()).createValueObjecter("userLanguage");
export type UserLanguage = GetValueObject<typeof userLanguageObjecter>;

export type UserBanned = GetValueObject<typeof userBannedObjecter>;
export type UserEmail = GetValueObject<typeof userEmailObjecter>;
export type UserUsername = GetValueObject<typeof userUsernameObjecter>;
export type UserId = GetValueObject<typeof userIdObjecter>;

type InputCreateUserEntity = Omit<
	GetEntityProperties<typeof UserEntity>,
	"lastUpdate" | "banned"
>;

type UpdatePropsUserEntity = Partial<
	Pick<GetEntityProperties<typeof UserEntity>, "username" | "language">
>;

export class UserEntity extends EntityHandler.create({
	id: userIdObjecter,
	email: userEmailObjecter,
	username: userUsernameObjecter,
	lastUpdate: commonDateObjecter,
	language: userLanguageObjecter,
	banned: userBannedObjecter,
}) {
	public static create(params: InputCreateUserEntity) {
		return new UserEntity({
			...params,
			banned: userBannedObjecter.unsafeCreate(false),
			lastUpdate: commonDateObjecter.unsafeCreate(new Date()),
		});
	}

	public updateProps(values: UpdatePropsUserEntity) {
		return this.update({
			...values,
			lastUpdate: commonDateObjecter.unsafeCreate(new Date()),
		});
	}

	public makeBan() {
		return this.update({
			banned: userBannedObjecter.unsafeCreate(true),
		});
	}

	public updateDelayIsRespected() {
		return (Date.now() - this.lastUpdate.value.getTime()) > userRules.updateDelay;
	}
}
