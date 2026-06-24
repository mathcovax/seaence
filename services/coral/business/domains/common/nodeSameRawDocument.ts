import { C, DPE } from "@duplojs/utils";

export const NodeSameRawDocumentId = C.createNewType(
	"nodeSameRawDocumentId",
	DPE.string(),
);
export type NodeSameRawDocumentId = C.GetNewType<typeof NodeSameRawDocumentId>;
