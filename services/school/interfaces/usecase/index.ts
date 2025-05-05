import "../repositories";
import { CreatePostUsecase } from "@business/applications/usecases/createPost";
import { GetPostsFromNodeDocumentIdUsecase } from "@business/applications/usecases/getPostsFromNodeDocumentId";
import { GetAnswersFromPostUsecase } from "@business/applications/usecases/getAnswersFromPost";
import { ReplyToPostUsecase } from "@business/applications/usecases/replyToPost";
import { GetPostTotalCountFromNodeDocumentIdUsecase } from "@business/applications/usecases/getPostTotalCountFromNodeDocumentId";
import { GetPostByIdUsecase } from "@business/applications/usecases/getPostById";

export const createPostUsecase = new CreatePostUsecase();
export const getPostsFromNodeDocumentIdUsecase = new GetPostsFromNodeDocumentIdUsecase();
export const getPostByIdUsecase = new GetPostByIdUsecase();
export const getAnswersFromPostUsecase = new GetAnswersFromPostUsecase();
export const getPostTotalCountFromNodeDocumentIdUsecase = new GetPostTotalCountFromNodeDocumentIdUsecase();
export const replyToPostUsecase = new ReplyToPostUsecase();
