import { mongo } from "@interfaces/providers/mongo";
import { indexUpdatedBakedDocumentsUsecase } from "@interfaces/usecase";

await indexUpdatedBakedDocumentsUsecase.execute({});

await mongo.client.close();
