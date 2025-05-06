import "../repositories";
import { FindUserByIdUsecase } from "@business/applications/usecases/findUserById";
import { FindOrCreateUserUsecase } from "@business/applications/usecases/findOrCreateUser";

export const findOrCreateUser = new FindOrCreateUserUsecase();
export const findUserById = new FindUserByIdUsecase();
