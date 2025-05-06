import { type PostId, type PostEntity, type NodeSameRawDocumentId } from "@business/domains/entities/post";
import { createRepositoryHandler, type Int, type RepositoryBase } from "@vendors/clean";

interface FindByDocumentIdParams {
	page: Int;
	quantityPerPage: Int;
}
export interface PostRepository extends RepositoryBase<PostEntity> {
	generatePostId(): PostId;
	findByNodeSameRawDocumentId(
		documentId: NodeSameRawDocumentId,
		params: FindByDocumentIdParams
	): Promise<PostEntity[]>;
	findOneById(postId: PostId): Promise<PostEntity | null>;
	getTotalCountByNodeSameRawDocumentId(documentId: NodeSameRawDocumentId): Promise<Int>;
}

export const postRepository = createRepositoryHandler<PostRepository>();
