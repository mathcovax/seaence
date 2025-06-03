import "../repositories";
import { CreateUserUsecase } from "@business/applications/usecases/createUser";
import { ActivateReplyToPostNotificationSettingsToPostUsecase } from "@business/applications/usecases/activateReplyToPostNotificationSettingsToPost";
import { CreateReplyToPostNotificationsUsecase } from "@business/applications/usecases/createReplyToPostNotification";
import { FindNotificationToUserUsecase } from "@business/applications/usecases/findNotificationToUser";
import { FindUserByIdUsecase } from "@business/applications/usecases/findUserById";
import { CountNotificationToUserUsecase } from "@business/applications/usecases/countNotitificationToUser";
import { FindReplyToPostNotificationSettingsToUserByPostIdUsecase } from "@business/applications/usecases/findReplyToPostNotificationSettingsToUserByPostId";

export const createUserUsecase = new CreateUserUsecase();
export const activateReplyToPostNotificationSettingsToPostUsecase
= new ActivateReplyToPostNotificationSettingsToPostUsecase();
export const createReplyToPostNotificationsUsecase = new CreateReplyToPostNotificationsUsecase();
export const findNotificationToUserUsecase = new FindNotificationToUserUsecase();
export const findUserByIdUsecase = new FindUserByIdUsecase();
export const countNotificationToUserUsecase = new CountNotificationToUserUsecase();
export const findReplyToPostNotificationSettingsToUserByPostIdUsecase
= new FindReplyToPostNotificationSettingsToUserByPostIdUsecase();
