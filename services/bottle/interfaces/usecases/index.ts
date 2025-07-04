import "../repositories";
import { CreateUserUsecase } from "@business/applications/usecases/createUser";
import { EnableReplyToPostNotificationSettingToPostUsecase } from "@business/applications/usecases/enableReplyToPostNotificationSettingToPost";
import { CreateReplyToPostNotificationsUsecase } from "@business/applications/usecases/createReplyToPostNotification";
import { FindManyNotificationToUserUsecase } from "@business/applications/usecases/findManyNotificationToUser";
import { FindOneUserByIdUsecase } from "@business/applications/usecases/findUserById";
import { CountNotificationToUserUsecase } from "@business/applications/usecases/countNotitificationToUser";
import { FindOneReplyToPostNotificationSettingToUserByPostIdUsecase } from "@business/applications/usecases/findOneReplyToPostNotificationSettingToUserByPostId";
import { DisableReplyToPostNotificationSettingToPostUsecase } from "@business/applications/usecases/disableReplyToPostNotificationSettingToPost";
import { CreateUserPostBanNotificationUsecase } from "@business/applications/usecases/createUserPostBanNotification";
import { CreateUserPostWarningNotificationUsecase } from "@business/applications/usecases/createUserPostWarningNotification";
import { UpdateUserUsecase } from "@business/applications/usecases/updateUser";
import { CreateUserAnswerBanNotificationUsecase } from "@business/applications/usecases/createUserAnswerBanNotification";
import { CreateUserAnswerWarningNotificationUsecase } from "@business/applications/usecases/createUserAnswerWarningNotification";

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
