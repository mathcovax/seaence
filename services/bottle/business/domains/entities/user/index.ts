import { EntityHandler, createEnum, type GetValueObject, zod, type GetEntityProperties } from "@vendors/clean";

export const userIdObjecter = zod.string().createValueObjecter("userId");
export type UserId = GetValueObject<typeof userIdObjecter>;

export const usernameObjecter = zod.string().createValueObjecter("username");
export type Username = GetValueObject<typeof usernameObjecter>;

export const userEmailObjecter = zod.string().email().createValueObjecter("userEmail");
export type UserEmail = GetValueObject<typeof userEmailObjecter>;

export const userLanguageEnum = createEnum(["fr-FR", "en-US"]);
export const userLanguageObjecter = zod.enum(userLanguageEnum.toTuple()).createValueObjecter("userLanguage");
export type UserLanguage = GetValueObject<typeof userLanguageObjecter>;

// optional is presete to migrate
export const userAnonymizedObjecter = zod.boolean()
	.optional()
	.createValueObjecter("userAnonymized");
export type UserAnonymized = GetValueObject<typeof userAnonymizedObjecter>;

export type CreateUserParams = Pick<
	GetEntityProperties<typeof UserEntity>,
	| "id"
	| "username"
	| "email"
	| "language"
>;

export type RestoreUserParams = Pick<
	GetEntityProperties<typeof UserEntity>,
	| "username"
	| "email"
	| "language"
>;

export class UserEntity extends EntityHandler.create({
	id: userIdObjecter,
	username: usernameObjecter,
	email: userEmailObjecter,
	language: userLanguageObjecter,
	anonymized: userAnonymizedObjecter,
}) {
	public static create(params: CreateUserParams) {
		return new UserEntity({
			...params,
			anonymized: userAnonymizedObjecter.unsafeCreate(false),
		});
	}

	public updateValues(values: Partial<Omit<GetEntityProperties<typeof UserEntity>, "id" | "email">>) {
		return this.update(values);
	}

	private static readonly anonymizedEmail = "anonymizedUser@email.com";

	private static readonly anonymizedUsername = "anonymizedUser";

	private static readonly anonymizedLanguage = "en-US";

	public anonymize() {
		return this.update({
			username: usernameObjecter.unsafeCreate(UserEntity.anonymizedUsername),
			email: userEmailObjecter.unsafeCreate(UserEntity.anonymizedEmail),
			language: userLanguageObjecter.unsafeCreate(UserEntity.anonymizedLanguage),
			anonymized: userAnonymizedObjecter.unsafeCreate(true),
		});
	}

	public restore(params: RestoreUserParams) {
		return this.update({
			...params,
			anonymized: userAnonymizedObjecter.unsafeCreate(false),
		});
	}
}
