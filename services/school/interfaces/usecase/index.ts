import "../repositories";
import { CreatePostUsecase } from "@business/applications/usecases/createPost";
import { FindPostsFromNodeSameRawDocumentIdUsecase } from "@business/applications/usecases/findPostsFromNodeSameRawDocumentId";
import { FindAnswersFromPostUsecase } from "@business/applications/usecases/findAnswersFromPost";
import { ReplyToPostUsecase } from "@business/applications/usecases/replyToPost";
import { GetPostTotalCountFromNodeSameRawDocumentIdUsecase } from "@business/applications/usecases/getPostTotalCountFromNodeSameRawDocumentId";
import { FindPostByIdUsecase } from "@business/applications/usecases/findPostById";
import { RenameAuthorUsecase } from "@business/applications/usecases/renameAuthor";

export const createPostUsecase = new CreatePostUsecase();
export const findPostsFromNodeSameRawDocumentIdUsecase = new FindPostsFromNodeSameRawDocumentIdUsecase();
export const findPostByIdUsecase = new FindPostByIdUsecase();
export const findAnswersFromPostUsecase = new FindAnswersFromPostUsecase();
export const getPostTotalCountFromNodeSameRawDocumentIdUsecase
	= new GetPostTotalCountFromNodeSameRawDocumentIdUsecase();
export const replyToPostUsecase = new ReplyToPostUsecase();
export const renameAuthor = new RenameAuthorUsecase();
