import "../repositories";
import { CreatePostUsecase } from "@business/applications/usecases/createPost";
import { GetPostsFromArticleIdUsecase } from "@business/applications/usecases/getPostsFromArticleId";
import { GetAnswersFromPostUsecase } from "@business/applications/usecases/getAnswersFromPost";
import { ReplyToPostUsecase } from "@business/applications/usecases/replyToPost";

export const createPostUsecase = new CreatePostUsecase();
export const getPostsFromArticleIdUsecase = new GetPostsFromArticleIdUsecase();
export const getAnswersFromPostUsecase = new GetAnswersFromPostUsecase();
export const replyToPostUsecase = new ReplyToPostUsecase();
