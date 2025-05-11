import { type RegisterNotificationEntity } from "@business/domains/entities/notification/register";
import { type EntityToSimpleObject } from "@vendors/clean";

export interface MongoRegisterNotification extends EntityToSimpleObject<typeof RegisterNotificationEntity> {}

export type MongoNotification =
	| MongoRegisterNotification;
