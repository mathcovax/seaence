export interface MongoPost {
	id: string;
	topic: string;
	content: string;
	nodeSameRawDocumentId: string;
	authorId: string;
	authorName: string | null;
	answerCount: number;
	status: "compliant" | "unprocessed" | "notCompliant";
	createdAt: Date;
}
