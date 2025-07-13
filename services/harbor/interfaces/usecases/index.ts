import "../repositories";
import { FindUserByIdUsecase } from "@business/applications/usecases/findUserById";
import { UpdateUserUsecase } from "@business/applications/usecases/updateUser";
import { FindUserByEmailUsecase } from "@business/applications/usecases/findUserByEmail";
import { CreateUserUsecase } from "@business/applications/usecases/createUser";
import { CreatePostUserWarningUsecase } from "@business/applications/usecases/createPostUserWarning";
import { CreateAnswerUserWarningUsecase } from "@business/applications/usecases/createAnswerUserWarning";
import { DeleteUserUsecase } from "@business/applications/usecases/deleteUser";
import { EmailIsLinkToDeletedUserUsecase } from "@business/applications/usecases/emailIsLinkToDeletedUser";

export const findUserById = new FindUserByIdUsecase();
export const findUserByEmail = new FindUserByEmailUsecase();
export const updateUser = new UpdateUserUsecase();
export const createUser = new CreateUserUsecase();
export const createPostUserWarning = new CreatePostUserWarningUsecase();
export const createAnswerUserWarning = new CreateAnswerUserWarningUsecase();
export const deleteUserUsecase = new DeleteUserUsecase();
export const emailIsLinkToDeletedUserUsecase = new EmailIsLinkToDeletedUserUsecase();
