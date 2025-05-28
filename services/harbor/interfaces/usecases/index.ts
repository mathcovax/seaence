import "../repositories";
import { FindUserByIdUsecase } from "@business/applications/usecases/findUserById";
import { UpdateUserUsecase } from "@business/applications/usecases/updateUser";
import { FindUserByEmailUsecase } from "@business/applications/usecases/findUserByEmail";
import { CreateUserUsecase } from "@business/applications/usecases/createUser";

export const findUserById = new FindUserByIdUsecase();
export const findUserByEmail = new FindUserByEmailUsecase();
export const updateUser = new UpdateUserUsecase();
export const createUser = new CreateUserUsecase();
