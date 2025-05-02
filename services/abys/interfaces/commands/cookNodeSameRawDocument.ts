import { mongo } from "@interfaces/providers/mongo";
import { cookNodeSameRawDocumentsUsecase } from "@interfaces/usecase";

await cookNodeSameRawDocumentsUsecase.execute({});

await mongo.client.close();
