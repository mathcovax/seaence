import "../repositories";
import { CreatePostUsecase } from "@business/applications/usecases/createPost";
import { FindPostsFromNodeSameRawDocumentIdUsecase } from "@business/applications/usecases/findPostsFromNodeSameRawDocumentId";
import { FindAnswersFromPostUsecase } from "@business/applications/usecases/findAnswersFromPost";
import { ReplyToPostUsecase } from "@business/applications/usecases/replyToPost";
import { GetPostTotalCountFromNodeSameRawDocumentIdUsecase } from "@business/applications/usecases/getPostTotalCountFromNodeSameRawDocumentId";
import { FindPostByIdUsecase } from "@business/applications/usecases/findPostById";
import { RenameAuthorUsecase } from "@business/applications/usecases/renameAuthor";
import { FindOldestUnprocessedPostUsecase } from "@business/applications/usecases/findOldestUnprocessedPost";
import { IndicatePostIsCompliantUsecase } from "@business/applications/usecases/indicatePostIsCompliant";
import { IndicatePostIsNotCompliantAndCreateWarningUsecase } from "@business/applications/usecases/indicatePostIsNotCompliantAndCreateWarning";
import { GetTotalCountOfUnprocessedPostsUsecase } from "@business/applications/usecases/getTotalCountOfUnprocessedPosts";

export const createPostUsecase = new CreatePostUsecase();
export const findPostsFromNodeSameRawDocumentIdUsecase = new FindPostsFromNodeSameRawDocumentIdUsecase();
export const findPostByIdUsecase = new FindPostByIdUsecase();
export const findAnswersFromPostUsecase = new FindAnswersFromPostUsecase();
export const getPostTotalCountFromNodeSameRawDocumentIdUsecase
	= new GetPostTotalCountFromNodeSameRawDocumentIdUsecase();
export const replyToPostUsecase = new ReplyToPostUsecase();
export const renameAuthor = new RenameAuthorUsecase();
export const findOldestUnprocessedPostUsecase = new FindOldestUnprocessedPostUsecase();
export const indicatePostIsCompliantUsecase = new IndicatePostIsCompliantUsecase();
export const indicatePostIsNotCompliantAndCreateWarningUsecase
	= new IndicatePostIsNotCompliantAndCreateWarningUsecase();
export const getTotalCountOfUnprocessedPostsUsecase = new GetTotalCountOfUnprocessedPostsUsecase();
