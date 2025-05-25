import { type AnswerId, type AnswerEntity } from "@business/domains/entities/answer";
import { type PostAnswerCount, type PostId } from "@business/domains/entities/post";
import { type UserId } from "@business/domains/entities/user";
import { createRepositoryHandler, type Int, type RepositoryBase } from "@vendors/clean";

interface FindByPostIdParams {
	page: Int;
	quantityPerPage: Int;
}

export interface AnswerRepository extends RepositoryBase<AnswerEntity> {
	generateAnswerId(): AnswerId;
	findByPostId(postId: PostId, params: FindByPostIdParams): Promise<AnswerEntity[]>;
	getCountByPostId(postId: PostId): Promise<PostAnswerCount>;
	findByAuthorId(userId: UserId): AsyncGenerator<AnswerEntity>;
}

export const answerRepository = createRepositoryHandler<AnswerRepository>();
