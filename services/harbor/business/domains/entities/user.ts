
import { commonDateObjecter, createEnum, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { userRules } from "@vendors/entity-rules";

export const userIdObjecter = zod
	.string()
	.createValueObjecter("userId");
export type UserId = GetValueObject<typeof userIdObjecter>;

export const userEmailObjecter = zod
	.string()
	.email()
	.createValueObjecter("userEmail");
export type UserEmail = GetValueObject<typeof userEmailObjecter>;

export const userUsernameObjecter = zod
	.string()
	.min(userRules.username.minLength)
	.max(userRules.username.maxLength)
	.createValueObjecter("userUsername");
export type UserUsername = GetValueObject<typeof userUsernameObjecter>;

export const userBannedObjecter = zod
	.boolean()
	.createValueObjecter("userBanned");
export type UserBanned = GetValueObject<typeof userBannedObjecter>;

export const userLanguageEnum = createEnum(["fr-FR", "en-US"]);
export const userLanguageObjecter = zod
	.enum(userLanguageEnum.toTuple())
	.createValueObjecter("userLanguage");
export type UserLanguage = GetValueObject<typeof userLanguageObjecter>;

export const userDeleteIdObjecter = zod
	.string()
	.createValueObjecter("userDeleteId");
export type UserDeleteId = GetValueObject<typeof userDeleteIdObjecter>;

type InputCreateUserEntity = Omit<
	GetEntityProperties<typeof UserEntity>,
	"lastUpdate" | "banned" | "deleteId"
>;

type UpdatePersonalDataUserEntity = Partial<
	Pick<GetEntityProperties<typeof UserEntity>, "username" | "language">
>;

type RestoreUserEntity = Pick<
	GetEntityProperties<typeof UserEntity>,
	"username" | "language" | "email"
>;

export class UserEntity extends EntityHandler.create({
	id: userIdObjecter,
	email: userEmailObjecter,
	username: userUsernameObjecter,
	lastUpdate: commonDateObjecter,
	language: userLanguageObjecter,
	banned: userBannedObjecter,
	deleteId: userDeleteIdObjecter.nullable(),
}) {
	public static create(params: InputCreateUserEntity) {
		return new UserEntity({
			...params,
			deleteId: null,
			banned: userBannedObjecter.unsafeCreate(false),
			lastUpdate: commonDateObjecter.unsafeCreate(new Date()),
		});
	}

	public updatePersonalData(values: UpdatePersonalDataUserEntity) {
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

	private static readonly deletedEmail = "deletedUser@email.com";

	private static readonly deletedUsername = "deletedUser";

	private static readonly deletedLanguage = "en-US";

	public delete(deleteId: UserDeleteId) {
		return this.update({
			username: userUsernameObjecter.unsafeCreate(UserEntity.deletedUsername),
			email: userEmailObjecter.unsafeCreate(UserEntity.deletedEmail),
			language: userLanguageObjecter.unsafeCreate(UserEntity.deletedLanguage),
			deleteId,
		});
	}

	public restore(values: RestoreUserEntity) {
		return this.update({
			...values,
			deleteId: null,
			lastUpdate: commonDateObjecter.unsafeCreate(new Date()),
		});
	}
}
