import { type InscriptionNotificationEntity } from "@business/domains/entities/notification/email";
import { type EntityToSimpleObject } from "@vendors/clean";

export interface MongoInscriptionNotification extends EntityToSimpleObject<typeof InscriptionNotificationEntity> {}

export type MongoNotification =
	| MongoInscriptionNotification;
