import { UserCheckDocumentFolderCapacityUsecase } from "@business/applications/usecases/documentFolder/userCheckDocumentFolderCapacity";
import "../repositories";
import { UserCountResultOfSearchDocumentFolderUsecase } from "@business/applications/usecases/documentFolder/userCountResultOfSearchDocumentFolder";
import { UserCreateDocumentFolderUsecase } from "@business/applications/usecases/documentFolder/userCreateDocumentFolder";
import { UserFindDocumentFolderByIdUsecase } from "@business/applications/usecases/documentFolder/userFindDocumentFolderById";
import { UserRemoveDocumentFolderUsecase } from "@business/applications/usecases/documentFolder/userRemoveDocumentFolder";
import { UserSearchDocumentFolderUsecase } from "@business/applications/usecases/documentFolder/userSearchDocumentFolder";
import { UserCountResultOfSearchDocumentInFolderUsecase } from "@business/applications/usecases/documentInFolder/userCountResultOfSearchDocumentInFolder";
import { UserCreateDocumentInManyFoldersUsecase } from "@business/applications/usecases/documentInFolder/userCreateDocumentInManyFolders";
import { UserFindDocumentInFolderByUniqueCombinationUsecase } from "@business/applications/usecases/documentInFolder/userFindDocumentInFolderByUniqueCombination";
import { UserRemoveDocumentInFolderUsecase } from "@business/applications/usecases/documentInFolder/userRemoveDocumentInFolder";
import { UserSearchDocumentInFolderUsecase } from "@business/applications/usecases/documentInFolder/userSearchDocumentInFolder";
import { UserCountResultOfFindManyFavoriteEquationUsecase } from "@business/applications/usecases/favoriteEquation/userCountResultOfSearchFavoriteEquation";
import { UserUpsertFavoriteEquationUsecase } from "@business/applications/usecases/favoriteEquation/userUpsertFavoriteEquation";
import { UserFindFavoriteEquationByIdUsecase } from "@business/applications/usecases/favoriteEquation/userFindFavoriteEquationById";
import { UserRemoveFavoriteEquationUsecase } from "@business/applications/usecases/favoriteEquation/userRemoveFavoriteEquation";
import { UserFindManyFavoriteEquationUsecase } from "@business/applications/usecases/favoriteEquation/userSearchFavoriteEquation";
import { UserFindManyDocumentFolderByIdUsecase } from "@business/applications/usecases/documentFolder/userFindManyDocumentFolderById";
import { UserCheckManyDocumentFolderCapacityUsecase } from "@business/applications/usecases/documentFolder/userCheckManyDocumentFolderCapacity";
import { FindManyDocumentFolderInWichDocumentExistUsecase } from "@business/applications/usecases/documentFolder/findManyDocumentFolderInWichDocumentExist";
import { CountResultOfFindManyDocumentFolderInWichDocumentExistUsecase } from "@business/applications/usecases/documentFolder/countResultOfFindManyDocumentFolderInWichDocumentExist";

export const userCreateDocumentFolderUsecase = new UserCreateDocumentFolderUsecase();
export const userFindDocumentFolderByIdUsecase = new UserFindDocumentFolderByIdUsecase();
export const userFindManyDocumentFolderByIdsUsecase = new UserFindManyDocumentFolderByIdUsecase();
export const userRemoveDocumentFolderUsecase = new UserRemoveDocumentFolderUsecase();
export const userSearchDocumentFolderUsecase = new UserSearchDocumentFolderUsecase();
export const userCountResultOfSearchDocumentFolderUsecase = new UserCountResultOfSearchDocumentFolderUsecase();
export const userCheckDocumentFolderCapacityUsecase = new UserCheckDocumentFolderCapacityUsecase();
export const userCheckManyDocumentFolderCapacityUsecase = new UserCheckManyDocumentFolderCapacityUsecase();
export const findManyDocumentFolderInWichDocumentExistUsecase = new FindManyDocumentFolderInWichDocumentExistUsecase();
export const countResultOfFindManyDocumentFolderInWichDocumentExistUsecase
	= new CountResultOfFindManyDocumentFolderInWichDocumentExistUsecase();

export const userCreateDocumentInManyFoldersUsecase = new UserCreateDocumentInManyFoldersUsecase();
export const userFindDocumentInFolderByUniqueCombinationUsecase
	= new UserFindDocumentInFolderByUniqueCombinationUsecase();
export const userRemoveDocumentInFolderUsecase = new UserRemoveDocumentInFolderUsecase();
export const userSearchDocumentInFolderUsecase = new UserSearchDocumentInFolderUsecase();
export const userCountResultOfSearchDocumentInFolderUsecase = new UserCountResultOfSearchDocumentInFolderUsecase();

export const userUpsertFavoriteEquationUsecase = new UserUpsertFavoriteEquationUsecase();
export const userFindFavoriteEquationByIdUsecase = new UserFindFavoriteEquationByIdUsecase();
export const userRemoveFavoriteEquationUsecase = new UserRemoveFavoriteEquationUsecase();
export const userFindManyFavoriteEquationUsecase = new UserFindManyFavoriteEquationUsecase();
export const userCountResultOfFindManyFavoriteEquationUsecase = new UserCountResultOfFindManyFavoriteEquationUsecase();

