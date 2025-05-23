import "../repositories";
import { FindUserByIdUsecase } from "@business/applications/usecases/findUserById";
import { FindOrCreateUserUsecase } from "@business/applications/usecases/findOrCreateUser";
import { RenameUserUsecase } from "@business/applications/usecases/renameUser";

export const findOrCreateUser = new FindOrCreateUserUsecase();
export const findUserById = new FindUserByIdUsecase();
export const renameUserUsecase = new RenameUserUsecase();
