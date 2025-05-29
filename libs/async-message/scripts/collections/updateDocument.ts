import { type AsyncMessage } from "../asyncMessage";
import { MessageCollection } from "../messageCollection";

export interface UpdateDocumentMessageValue {
	documentId: string;
	newTitle: string;
	newAbstract: string;
}

export class UpdateDocumentMessageColletion extends MessageCollection<UpdateDocumentMessageValue> {
	public static readonly oneWeekInSecond = 604800;

	public constructor(asyncMessage: AsyncMessage) {
		super(
			asyncMessage,
			{
				name: "updateDocument",
				expireIn: UpdateDocumentMessageColletion.oneWeekInSecond,
			},
		);
	}
}
