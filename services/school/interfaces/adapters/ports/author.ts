import { AuthorPort } from "@applications/ports/author";
import { C, unwrap } from "@duplojs/utils";
import { mongo } from "../../providers/mongo";

export const authorPort = AuthorPort.createImplementation({
	async rename(id, name) {
		await Promise.all([
			mongo.postCollection.updateMany(
				{ authorId: unwrap(id) },
				{ $set: { authorName: unwrap(name) } },
			),
			mongo.answerCollection.updateMany(
				{ authorId: unwrap(id) },
				{ $set: { authorName: unwrap(name) } },
			),
		]);

		return C.appendEvidence(id, "rename");
	},
	async anonymise(id) {
		await Promise.all([
			mongo.postCollection.updateMany(
				{ authorId: unwrap(id) },
				{ $set: { authorName: null } },
			),
			mongo.answerCollection.updateMany(
				{ authorId: unwrap(id) },
				{ $set: { authorName: null } },
			),
		]);

		return C.appendEvidence(id, "anonymise");
	},
	async restore(id, name) {
		await Promise.all([
			mongo.postCollection.updateMany(
				{ authorId: unwrap(id) },
				{ $set: { authorName: unwrap(name) } },
			),
			mongo.answerCollection.updateMany(
				{ authorId: unwrap(id) },
				{ $set: { authorName: unwrap(name) } },
			),
		]);

		return C.appendEvidence(id, "restore");
	},
});
