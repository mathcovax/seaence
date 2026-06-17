import { C } from "@duplojs/utils";
import type { AnswerRepository } from "@domains/repositories/answer";
import type { BaseRepositoryPort } from "./types";
import type { Answer } from "@domains/entities/answer";
import type { Post } from "@domains/entities/post";

export interface FindManyAnswerByPostParams {
	postId: Post.Id;
	page: C.PositiveInt;
	quantityPerPage: C.StrictPositiveInt;
}

export interface AnswerPort extends AnswerRepository, BaseRepositoryPort<Answer.Entity> {
	findOneById(id: Answer.Id): Promise<C.Maybe<Answer.EntityWithStatus>>;
	findOldestUnprocessed(): Promise<C.Maybe<Answer.Entity & Answer.Unprocessed>>;
	findManyByPost(params: FindManyAnswerByPostParams): Promise<Answer.EntityWithStatus[]>;
	getTotalCountOfUnprocessed(): Promise<C.PositiveInt>;
}

export const AnswerPort = C.createPort<AnswerPort>();
