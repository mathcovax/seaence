import "../repositories";
import { CreatePostUsecase } from "@business/applications/usecases/createPost";
import { GetPostsFromArticleIdUsecase } from "@business/applications/usecases/getPostsFromArticleId";
import { GetAnswersFromPostUsecase } from "@business/applications/usecases/getAnswersFromPost";
import { ReplyToPostUsecase } from "@business/applications/usecases/replyToPost";
import { GetPostTotalCountFromArticleIdUsecase } from "@business/applications/usecases/getPostTotalCountFromArticleId";
import { GetPostByIdUsecase } from "@business/applications/usecases/getPostById";

export const createPostUsecase = new CreatePostUsecase();
export const getPostsFromArticleIdUsecase = new GetPostsFromArticleIdUsecase();
export const getPostByIdUsecase = new GetPostByIdUsecase();
export const getAnswersFromPostUsecase = new GetAnswersFromPostUsecase();
export const getPostTotalCountFromArticleIdUsecase = new GetPostTotalCountFromArticleIdUsecase();
export const replyToPostUsecase = new ReplyToPostUsecase();
