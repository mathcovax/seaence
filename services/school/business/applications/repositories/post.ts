import { type PostId, type PostEntity, type NodeDocumentId } from "@business/domains/entities/post";
import { createRepositoryHandler, type Int, type RepositoryBase } from "@vendors/clean";

interface FindByDocumentIdParams {
	page: Int;
	quantityPerPage: Int;
}
export interface PostRepository extends RepositoryBase<PostEntity> {
	generatePostId(): PostId;
	findByNodeDocumentId(documentId: NodeDocumentId, params: FindByDocumentIdParams): Promise<PostEntity[]>;
	findOneById(postId: PostId): Promise<PostEntity | null>;
	getTotalCountByNodeDocumentId(documentId: NodeDocumentId): Promise<Int>;
}

export const postRepository = createRepositoryHandler<PostRepository>();
