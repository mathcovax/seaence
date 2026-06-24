import { C } from "@duplojs/utils";

import { documentFolderRepository } from "@interfaces/repositories/documentFolder";
import { documentInFolderRepository } from "@interfaces/repositories/documentInFolder";
import { favoriteEquationRepository } from "@interfaces/repositories/favoriteEquation";

import * as DocumentFolderUseCases from "@business/applications/useCases/documentFolder";
import * as DocumentInFolderUseCases from "@business/applications/useCases/documentInFolder";
import * as FavoriteEquationUseCases from "@business/applications/useCases/favoriteEquation";

// Specific
import * as NodeSameRawDocumentUseCases from "@business/applications/useCases/nodeSameRawDocument";
import * as UserUseCases from "@business/applications/useCases/user";

export const useCases = C.useCaseInstances(
	{
		...DocumentFolderUseCases,
		...DocumentInFolderUseCases,
		...FavoriteEquationUseCases,
		...NodeSameRawDocumentUseCases,
		...UserUseCases,
	},
	{
		documentFolderRepository,
		documentInFolderRepository,
		favoriteEquationRepository,
	},
);
