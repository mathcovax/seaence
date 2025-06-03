import "../repositories";
import { CreateUserUsecase } from "@business/applications/usecases/createUser";
import { EnableReplyToPostNotificationSettingsToPostUsecase } from "@business/applications/usecases/enableReplyToPostNotificationSettingsToPost";
import { CreateReplyToPostNotificationsUsecase } from "@business/applications/usecases/createReplyToPostNotification";
import { FindNotificationToUserUsecase } from "@business/applications/usecases/findNotificationToUser";
import { FindUserByIdUsecase } from "@business/applications/usecases/findUserById";
import { CountNotificationToUserUsecase } from "@business/applications/usecases/countNotitificationToUser";
import { FindReplyToPostNotificationSettingsToUserByPostIdUsecase } from "@business/applications/usecases/findReplyToPostNotificationSettingsToUserByPostId";
import { DisableReplyToPostNotificationSettingsToPostUsecase } from "@business/applications/usecases/disableReplyToPostNotificationSettingsToPost";

export const createUserUsecase = new CreateUserUsecase();
export const enableReplyToPostNotificationSettingsToPostUsecase
= new EnableReplyToPostNotificationSettingsToPostUsecase();
export const createReplyToPostNotificationsUsecase = new CreateReplyToPostNotificationsUsecase();
export const findNotificationToUserUsecase = new FindNotificationToUserUsecase();
export const findUserByIdUsecase = new FindUserByIdUsecase();
export const countNotificationToUserUsecase = new CountNotificationToUserUsecase();
export const findReplyToPostNotificationSettingsToUserByPostIdUsecase
= new FindReplyToPostNotificationSettingsToUserByPostIdUsecase();
export const disableReplyToPostNotificationSettingsToPostUsecase
= new DisableReplyToPostNotificationSettingsToPostUsecase();
