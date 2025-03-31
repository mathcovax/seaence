import { type AnswerId, type AnswerEntity } from "@business/domains/entities/answer";
import { type PostId } from "@business/domains/entities/post";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface AnswerRepository extends RepositoryBase<AnswerEntity> {
	generateAnswerId(): AnswerId;
	findByPostId(postId: PostId): Promise<AnswerEntity[]>;
}

export const answerRepository = createRepositoryHandler<AnswerRepository>();
