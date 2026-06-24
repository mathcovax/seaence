import { DocumentFolderRepository } from "@business/applications/repositories/documentFolder";
import { DocumentFolder } from "@business/domains/entities/documentFolder";
import { A, C, D, DPE, escapeRegExp, O, pipe, pipeCall, toNative, unwrap, unwrapGroup } from "@duplojs/utils";
import { mongo } from "@interfaces/providers/mongo";
import { uuidv7 } from "uuidv7";
import { TechnicalError } from "./utils";
import { type MongoDocumentFolder } from "@interfaces/providers/mongo/entities/documentFolder";

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const defaultCountResult = C.Int.createOrThrow(0);

const countResultDataParser = DPE.object({
	folder: DPE.number(),
});

export const documentFolderRepository = DocumentFolderRepository.createImplementation({
	generateId() {
		return DocumentFolder.Id.createOrThrow(uuidv7());
	},
	async findByName(params) {
		const { userId, documentFolderName: name } = unwrapGroup(params);

		const result = await mongo.documentFolder.findOne({
			userId,
			name,
		});

		if (!result) {
			return C.none("documentFolder");
		}

		return C.some(DocumentFolder.Entity.mapOrThrow(result));
	},
	async findMany(params) {
		const { userId, partialDocumentFolderName, page, quantityPerPage } = unwrapGroup(params);

		const result = await mongo.documentFolder
			.find(
				{
					userId,
					name: {
						$regex: escapeRegExp(partialDocumentFolderName),
						$options: "i",
					},
				},
			)
			.sort({ createdAt: -1 })
			.skip(page * quantityPerPage)
			.limit(quantityPerPage)
			.toArray();

		return A.map(
			result,
			DocumentFolder.Entity.mapOrThrow,
		);
	},
	async findOneById(id) {
		const result = await mongo.documentFolder.findOne({
			id: unwrap(id),
		});

		if (!result) {
			return C.none("documentFolder");
		}

		return C.some(DocumentFolder.Entity.mapOrThrow(result));
	},
	async getQuantityOfOwner(userId) {
		return mongo.documentFolder
			.countDocuments(
				{
					userId: unwrap(userId),
				},
			)
			.then(C.PositiveInt.createOrThrow);
	},
	async getByDocumentInFolder(documentInFolder) {
		const result = await mongo.documentFolder.findOne({
			id: unwrap(documentInFolder.documentFolderId),
		});

		if (!result) {
			throw new TechnicalError("document-folder-is-missing", { from: documentInFolder });
		}

		return DocumentFolder.Entity.mapOrThrow(result);
	},
	async countDocumentInFolder(entity) {
		return mongo.documentInFolder.countDocuments({
			documentFolderId: unwrap(entity.id),
		})
			.then(C.Int.createOrThrow);
	},
	async findManyByNodeSameRawDocument(params) {
		const { nodeSameRawDocumentId, page, userId, quantityPerPage, partialDocumentFolderName } = unwrapGroup(params);

		return mongo.documentInFolder
			.aggregate<MongoDocumentFolder>([
				{
					$match: {
						nodeSameRawDocumentId,
						userId,
					},
				},
				{
					$lookup: {
						from: "documentFolder",
						localField: "documentFolderId",
						foreignField: "id",
						as: "folder",
					},
				},
				{
					$unwind: "$folder",
				},
				{
					$match: {
						"folder.name": {
							$regex: escapeRegExp(partialDocumentFolderName),
							$options: "i",
						},
						"folder.userId": userId,
					},
				},
				{
					$sort: {
						"folder.addedAt": -1,
					},
				},
				{
					$skip: page * quantityPerPage,
				},
				{
					$limit: quantityPerPage,
				},
				{
					$replaceRoot: {
						newRoot: "$folder",
					},
				},
			])
			.toArray()
			.then(A.map(DocumentFolder.Entity.mapOrThrow));
	},
	async countResultOfFindMany(params) {
		const { userId, partialDocumentFolderName } = unwrapGroup(params);

		return mongo.documentFolder
			.countDocuments(
				{
					userId,
					name: {
						$regex: escapeRegExp(partialDocumentFolderName),
					},
				},
			)
			.then(C.Int.createOrThrow);
	},
	async countResultOfFindManyByNodeSameRawDocument(params) {
		const { userId, partialDocumentFolderName, nodeSameRawDocumentId } = unwrapGroup(params);

		// system D
		const [result] = await mongo.documentInFolder
			.aggregate([
				{
					$match: {
						nodeSameRawDocumentId,
						userId,
					},
				},
				{
					$lookup: {
						from: "documentFolder",
						localField: "documentFolderId",
						foreignField: "id",
						as: "folder",
					},
				},
				{
					$unwind: "$folder",
				},
				{
					$match: {
						"folder.name": {
							$regex: escapeRegExp(partialDocumentFolderName),
							$options: "i",
						},
						"folder.userId": userId,
					},
				},
				{
					$count: "folder",
				},
			]).toArray();

		if (!result) {
			return defaultCountResult;
		}

		return pipe(
			result,
			countResultDataParser.parseOrThrow,
			O.getProperty("folder"),
			pipeCall(C.Int.createOrThrow),
		);
	},
	async remove(entity) {
		const id = unwrap(entity.id);

		await mongo.documentInFolder.deleteMany({
			documentFolderId: id,
		});

		await mongo.documentFolder.deleteOne({
			id,
		});
	},
	async deleteAllByUserId(userId) {
		await mongo.documentFolder.deleteMany(
			{
				userId: unwrap(userId),
			},
		);
	},
	async save(entity) {
		const simpleEntity = C.unwrapEntity(entity, { transformer: toNative });

		await mongo.documentFolder.updateOne(
			{
				id: simpleEntity.id,
			},
			{
				$set: {
					...simpleEntity,
					updatedAt: D.now(),
				},
			},
			{ upsert: true },
		);

		return entity;
	},
});
