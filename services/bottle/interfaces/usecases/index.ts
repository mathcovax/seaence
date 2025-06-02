import "../repositories";
import { CreateUserUsecase } from "@business/applications/usecases/createUser";
import { CreateAndSendRegisterNotificationUsecase } from "@business/applications/usecases/createAndSendRegisterNotification";
import { ActivateReplyToPostNotificationSettingsToPostUsecase } from "@business/applications/usecases/activateReplyToPostNotificationSettingsToPost";
import { CreateReplyToPostNotificationsUsecase } from "@business/applications/usecases/createReplyToPostNotification";
import { FindProcessedNotificationToUserUsecase } from "@business/applications/usecases/findProcessedNotificationToUser";

export const createAndSendRegisterNotificationUsecase = new CreateAndSendRegisterNotificationUsecase();
export const createUserUsecase = new CreateUserUsecase();
export const activateReplyToPostNotificationSettingsToPostUsecase
= new ActivateReplyToPostNotificationSettingsToPostUsecase();
export const createReplyToPostNotificationsUsecase = new CreateReplyToPostNotificationsUsecase();
export const findProcessedNotificationToUserUsecase = new FindProcessedNotificationToUserUsecase();
