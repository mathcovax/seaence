import "../repositories";
import { CreatePostUsecase } from "@business/applications/usecases/createPost";
import { GetPostsFromDocumentIdUsecase } from "@business/applications/usecases/getPostsFromDocumentId";
import { GetAnswersFromPostUsecase } from "@business/applications/usecases/getAnswersFromPost";
import { ReplyToPostUsecase } from "@business/applications/usecases/replyToPost";
import { GetPostTotalCountFromDocumentIdUsecase } from "@business/applications/usecases/getPostTotalCountFromDocumentId";
import { GetPostByIdUsecase } from "@business/applications/usecases/getPostById";

export const createPostUsecase = new CreatePostUsecase();
export const getPostsFromdocumentIdUsecase = new GetPostsFromDocumentIdUsecase();
export const getPostByIdUsecase = new GetPostByIdUsecase();
export const getAnswersFromPostUsecase = new GetAnswersFromPostUsecase();
export const getPostTotalCountFromdocumentIdUsecase = new GetPostTotalCountFromDocumentIdUsecase();
export const replyToPostUsecase = new ReplyToPostUsecase();
