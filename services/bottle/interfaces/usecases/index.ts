import "../repositories";
import { CreateUserUsecase } from "@business/applications/usecases/createUser";
import { CreateAndSendRegisterNotificationUsecase } from "@business/applications/usecases/createAndSendRegisterNotification";
import { ActivateReplyToPostNotificationSettingsToPostUsecase } from "@business/applications/usecases/activateReplyToPostNotificationSettingsToPost";

export const createAndSendRegisterNotificationUsecase = new CreateAndSendRegisterNotificationUsecase();
export const createUserUsecase = new CreateUserUsecase();
export const activateReplyToPostNotificationSettingsToPostUsecase
= new ActivateReplyToPostNotificationSettingsToPostUsecase();
