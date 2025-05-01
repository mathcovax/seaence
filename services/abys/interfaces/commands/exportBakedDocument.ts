import { mongo } from "@interfaces/providers/mongo";
import { exportBakedDocumentToAbysUsecase } from "@interfaces/usecase";

await exportBakedDocumentToAbysUsecase.execute({});

await mongo.client.close();
