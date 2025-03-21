import { type AnswerEntity } from "@business/domains/entities/answer";
import { type PostId } from "@business/domains/entities/post";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface AnswerRepository extends RepositoryBase<AnswerEntity> {
	findByPostId(postId: PostId): Promise<AnswerEntity[]>;
	replyToPost(answer: AnswerEntity): Promise<void>;
}

export const answerRepository = createRepositoryHandler<AnswerRepository>();
