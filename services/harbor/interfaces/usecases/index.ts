import "../repositories";
import { FindUserByIdUsecase } from "@business/applications/usecases/findUserById";
import { FindOrCreateUserUsecase } from "@business/applications/usecases/findOrCreateUser";
import { UpdateUserUsecase } from "@business/applications/usecases/updateUser";

export const findOrCreateUser = new FindOrCreateUserUsecase();
export const findUserById = new FindUserByIdUsecase();
export const updateUserUsecase = new UpdateUserUsecase();
