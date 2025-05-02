import { type DocumentId } from "@business/domains/entities/document";
import { type PostId, type PostEntity } from "@business/domains/entities/post";
import { createRepositoryHandler, type Int, type RepositoryBase } from "@vendors/clean";

interface FindByDocumentIdParams {
	page: Int;
	quantityPerPage: Int;
}
export interface PostRepository extends RepositoryBase<PostEntity> {
	generatePostId(): PostId;
	findByDocumentId(documentId: DocumentId, params: FindByDocumentIdParams): Promise<PostEntity[]>;
	findOneById(postId: PostId): Promise<PostEntity | null>;
	getTotalCountByDocumentId(documentId: DocumentId): Promise<Int>;
}

export const postRepository = createRepositoryHandler<PostRepository>();
