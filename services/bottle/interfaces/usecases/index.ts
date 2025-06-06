import "../repositories";
import { CreateUserUsecase } from "@business/applications/usecases/createUser";
import { EnableReplyToPostNotificationSettingsToPostUsecase } from "@business/applications/usecases/enableReplyToPostNotificationSettingToPost";
import { CreateReplyToPostNotificationsUsecase } from "@business/applications/usecases/createReplyToPostNotification";
import { FindManyNotificationToUserUsecase } from "@business/applications/usecases/findManyNotificationToUser";
import { FindOneUserByIdUsecase } from "@business/applications/usecases/findUserById";
import { CountNotificationToUserUsecase } from "@business/applications/usecases/countNotitificationToUser";
import { FindOneReplyToPostNotificationSettingToUserByPostIdUsecase } from "@business/applications/usecases/findOneReplyToPostNotificationSettingToUserByPostId";
import { DisableReplyToPostNotificationSettingToPostUsecase } from "@business/applications/usecases/disableReplyToPostNotificationSettingToPost";

export const createUserUsecase = new CreateUserUsecase();
export const enableReplyToPostNotificationSettingsToPostUsecase
= new EnableReplyToPostNotificationSettingsToPostUsecase();
export const createReplyToPostNotificationsUsecase = new CreateReplyToPostNotificationsUsecase();
export const findManyNotificationToUserUsecase = new FindManyNotificationToUserUsecase();
export const findOneUserByIdUsecase = new FindOneUserByIdUsecase();
export const countNotificationToUserUsecase = new CountNotificationToUserUsecase();
export const findOneReplyToPostNotificationSettingToUserByPostIdUsecase
= new FindOneReplyToPostNotificationSettingToUserByPostIdUsecase();
export const disableReplyToPostNotificationSettingToPostUsecase
= new DisableReplyToPostNotificationSettingToPostUsecase();
