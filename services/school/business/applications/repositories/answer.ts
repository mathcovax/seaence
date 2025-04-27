import { type Int } from "@business/domains/common/Int";
import { type AnswerId, type AnswerEntity } from "@business/domains/entities/answer";
import { type PostAnswerCount, type PostId } from "@business/domains/entities/post";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

interface FindByPostIdParams {
	page: Int;
	quantityPerPage: Int;
}

export interface AnswerRepository extends RepositoryBase<AnswerEntity> {
	generateAnswerId(): AnswerId;
	findByPostId(postId: PostId, params: FindByPostIdParams): Promise<AnswerEntity[]>;
	getCountByPostId(postId: PostId): Promise<PostAnswerCount>;
}

export const answerRepository = createRepositoryHandler<AnswerRepository>();
