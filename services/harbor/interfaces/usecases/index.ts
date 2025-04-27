import "../repositories";
import { GetUserByIdUsecase } from "@business/applications/usecases/getUserById";
import { FindOrCreateUserUsecase } from "@business/applications/usecases/findOrCreateUser";

export const findOrCreateUser = new FindOrCreateUserUsecase();
export const getUserById = new GetUserByIdUsecase();
