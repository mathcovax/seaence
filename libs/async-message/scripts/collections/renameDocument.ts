import { type AsyncMessage } from "../asyncMessage";
import { MessageCollection } from "../messageCollection";

export interface RenameDocumentMessageValue {
	documentId: string;
	newTitle: string;
	oldTitle: string;
}

export class RenameDocumentMessageColletion extends MessageCollection<RenameDocumentMessageValue> {
	public static readonly oneWeekInSecond = 604800;

	public constructor(asyncMessage: AsyncMessage) {
		super(
			asyncMessage,
			{
				name: "updateDocument",
				expireIn: RenameDocumentMessageColletion.oneWeekInSecond,
			},
		);
	}
}
