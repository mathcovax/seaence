import "../repositories";
import { CreateUserUsecase } from "@business/applications/usecases/createUser";
import { CreateAndSendRegisterNotificationUsecase } from "@business/applications/usecases/createAndSendRegisterNotification";

export const createAndSendRegisterNotificationUsecase = new CreateAndSendRegisterNotificationUsecase();
export const createUserUsecase = new CreateUserUsecase();
