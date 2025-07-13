import "../repositories";
import { CreateUserUsecase } from "@business/applications/usecases/user/createUser";
import { EnableReplyToPostNotificationSettingToPostUsecase } from "@business/applications/usecases/setting/enableReplyToPostNotificationSettingToPost";
import { CreateReplyToPostNotificationsUsecase } from "@business/applications/usecases/notification/createReplyToPostNotification";
import { FindManyNotificationToUserUsecase } from "@business/applications/usecases/notification/findManyNotificationToUser";
import { FindOneUserByIdUsecase } from "@business/applications/usecases/user/findUserById";
import { CountNotificationToUserUsecase } from "@business/applications/usecases/notification/countNotitificationToUser";
import { FindOneReplyToPostNotificationSettingToUserByPostIdUsecase } from "@business/applications/usecases/setting/findOneReplyToPostNotificationSettingToUserByPostId";
import { DisableReplyToPostNotificationSettingToPostUsecase } from "@business/applications/usecases/setting/disableReplyToPostNotificationSettingToPost";
import { CreateUserPostBanNotificationUsecase } from "@business/applications/usecases/notification/createUserPostBanNotification";
import { CreateUserPostWarningNotificationUsecase } from "@business/applications/usecases/notification/createUserPostWarningNotification";
import { CreateUserAnswerBanNotificationUsecase } from "@business/applications/usecases/notification/createUserAnswerBanNotification";
import { CreateUserAnswerWarningNotificationUsecase } from "@business/applications/usecases/notification/createUserAnswerWarningNotification";
import { UpdateUserUsecase } from "@business/applications/usecases/user/updateUser";
import { FindUserLastNotificationDateUsecase } from "@business/applications/usecases/notification/findUserLastNotificationDate";
import { AnonymizeUserUsecase } from "@business/applications/usecases/user/anonymizeUser";
import { RestoreUserUsecase } from "@business/applications/usecases/user/restoreUser";

export const createUserUsecase = new CreateUserUsecase();
export const enableReplyToPostNotificationSettingToPostUsecase
= new EnableReplyToPostNotificationSettingToPostUsecase();
export const createReplyToPostNotificationsUsecase = new CreateReplyToPostNotificationsUsecase();
export const findManyNotificationToUserUsecase = new FindManyNotificationToUserUsecase();
export const findOneUserByIdUsecase = new FindOneUserByIdUsecase();
export const countNotificationToUserUsecase = new CountNotificationToUserUsecase();
export const findOneReplyToPostNotificationSettingToUserByPostIdUsecase
= new FindOneReplyToPostNotificationSettingToUserByPostIdUsecase();
export const disableReplyToPostNotificationSettingToPostUsecase
= new DisableReplyToPostNotificationSettingToPostUsecase();
export const createUserPostBanNotificationUsecase = new CreateUserPostBanNotificationUsecase();
export const createUserPostWarningNotificationUsecase = new CreateUserPostWarningNotificationUsecase();
export const createUserAnswerBanNotificationUsecase = new CreateUserAnswerBanNotificationUsecase();
export const createUserAnswerWarningNotificationUsecase = new CreateUserAnswerWarningNotificationUsecase();
export const updateUserUsecase = new UpdateUserUsecase();
export const findUserLastNotificationDateUsecase = new FindUserLastNotificationDateUsecase();
export const anonymizeUserUsecase = new AnonymizeUserUsecase();
export const restoreUserUsecase = new RestoreUserUsecase();
