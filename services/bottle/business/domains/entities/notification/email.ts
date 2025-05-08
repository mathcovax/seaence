import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { BaseNotificationEntity, processedObjecter } from "./base";
import { userIdObjecter } from "../user";

export const emailContentObjecter = zod.string().createValueObjecter("emailContent");
export type EmailContent = GetValueObject<typeof emailContentObjecter>;

export class InscriptionNotificationEntity extends EntityHandler.create(
	{
		userId: userIdObjecter,
	},
	BaseNotificationEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof InscriptionNotificationEntity>,
			"processed" | "createdAt"
		>,
	) {
		return new InscriptionNotificationEntity({
			...params,
			processed: processedObjecter.unsafeCreate(false),
		});
	}
}
