// Generated by @duplojs/types-codegen
/* eslint-disable */
/* prettier-ignore */
/* istanbul ignore file */
/* v8 ignore start */
// noinspection JSUnusedGlobalSymbols
// @ts-nocheck
type CodegenRoutes = ({
    method: "GET";
    path: "/documents/{nodeSameRawDocumentId}/posts";
    params: {
        nodeSameRawDocumentId: string;
    };
    query: {
        page: number;
        quantityPerPage: number;
    };
    response: {
        code: 200;
        information: "posts.found";
        body: {
            id: string;
            nodeSameRawDocumentId: string;
            status: "compliant" | "unprocessed" | "notCompliant";
            topic: string;
            content: string;
            authorId: string;
            authorName: string;
            answerCount: number;
            createdAt: Date;
        }[];
    };
}) | ({
    method: "GET";
    path: "/documents/{nodeSameRawDocumentId}/posts-details";
    params: {
        nodeSameRawDocumentId: string;
    };
    response: {
        code: 200;
        information: "document.posts.details";
        body: {
            totalCount: number;
        };
    };
}) | ({
    method: "POST";
    path: "/posts";
    body: {
        topic: string;
        content: string;
        nodeSameRawDocumentId: string;
        authorId: string;
        authorName: string;
    };
    response: {
        code: 201;
        information: "post.created";
        body: {
            id: string;
        };
    };
}) | ({
    method: "GET";
    path: "/posts/{postId}";
    params: {
        postId: string;
    };
    response: {
        code: 404;
        information: "post.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "post.found";
        body: {
            id: string;
            nodeSameRawDocumentId: string;
            status: "compliant" | "unprocessed" | "notCompliant";
            topic: string;
            content: string;
            authorId: string;
            authorName: string;
            answerCount: number;
            createdAt: Date;
        };
    };
}) | ({
    method: "GET";
    path: "/find-oldest-unprocessed-post";
    response: {
        code: 404;
        information: "oldestUnprocessedPost.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "oldestUnprocessedPost.found";
        body: {
            id: string;
            nodeSameRawDocumentId: string;
            status: "compliant" | "unprocessed" | "notCompliant";
            topic: string;
            content: string;
            authorId: string;
            authorName: string;
            answerCount: number;
            createdAt: Date;
        };
    };
}) | ({
    method: "GET";
    path: "/unprocessed-post-details";
    response: {
        code: 200;
        information: "unprocessedPost.details";
        body: {
            totalCount: number;
        };
    };
}) | ({
    method: "PATCH";
    path: "/posts/{postId}/is-compliant";
    params: {
        postId: string;
    };
    response: {
        code: 404;
        information: "post.notfound";
        body?: undefined;
    } | {
        code: 403;
        information: "post.wrongStatus";
        body?: undefined;
    } | {
        code: 200;
        information: "post.updated";
        body: {
            id: string;
            nodeSameRawDocumentId: string;
            status: "compliant" | "unprocessed" | "notCompliant";
            topic: string;
            content: string;
            authorId: string;
            authorName: string;
            answerCount: number;
            createdAt: Date;
        };
    };
}) | ({
    method: "PATCH";
    path: "/posts/{postId}/is-not-compliant-and-create-warning";
    body: {
        makeUserBan: boolean;
        reason: string;
    };
    params: {
        postId: string;
    };
    response: {
        code: 404;
        information: "post.notfound";
        body?: undefined;
    } | {
        code: 403;
        information: "post.wrongStatus";
        body?: undefined;
    } | {
        code: 200;
        information: "post.updated";
        body: {
            id: string;
            nodeSameRawDocumentId: string;
            status: "compliant" | "unprocessed" | "notCompliant";
            topic: string;
            content: string;
            authorId: string;
            authorName: string;
            answerCount: number;
            createdAt: Date;
        };
    };
}) | ({
    method: "POST";
    path: "/posts/{postId}/answers";
    body: {
        content: string;
        authorId: string;
        authorName: string;
    };
    params: {
        postId: string;
    };
    response: {
        code: 404;
        information: "post.notfound";
        body?: undefined;
    } | {
        code: 201;
        information: "answer.created";
        body?: undefined;
    };
}) | ({
    method: "GET";
    path: "/posts/{postId}/answers";
    params: {
        postId: string;
    };
    query: {
        page: number;
        quantityPerPage: number;
    };
    response: {
        code: 404;
        information: "post.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "answers.found";
        body: {
            id: string;
            postId: string;
            content: string;
            authorId: string;
            authorName: string;
            status: "compliant" | "unprocessed" | "notCompliant";
            createdAt: Date;
        }[];
    };
}) | ({
    method: "GET";
    path: "/find-oldest-unprocessed-answer";
    response: {
        code: 404;
        information: "oldestUnprocessedAnswer.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "oldestUnprocessedAnswer.found";
        body: {
            id: string;
            postId: string;
            content: string;
            authorId: string;
            authorName: string;
            status: "compliant" | "unprocessed" | "notCompliant";
            createdAt: Date;
        };
    };
}) | ({
    method: "GET";
    path: "/unprocessed-answer-details";
    response: {
        code: 200;
        information: "unprocessedAnswer.details";
        body: {
            totalCount: number;
        };
    };
}) | ({
    method: "PATCH";
    path: "/answers/{answerId}/is-compliant";
    params: {
        answerId: string;
    };
    response: {
        code: 404;
        information: "answer.notfound";
        body?: undefined;
    } | {
        code: 403;
        information: "answer.wrongStatus";
        body?: undefined;
    } | {
        code: 200;
        information: "answer.updated";
        body: {
            id: string;
            postId: string;
            content: string;
            authorId: string;
            authorName: string;
            status: "compliant" | "unprocessed" | "notCompliant";
            createdAt: Date;
        };
    };
}) | ({
    method: "PATCH";
    path: "/answers/{answerId}/is-not-compliant-and-create-warning";
    body: {
        makeUserBan: boolean;
        reason: string;
    };
    params: {
        answerId: string;
    };
    response: {
        code: 404;
        information: "answer.notfound";
        body?: undefined;
    } | {
        code: 403;
        information: "answer.wrongStatus";
        body?: undefined;
    } | {
        code: 403;
        information: "answer.postMismatch";
        body?: undefined;
    } | {
        code: 200;
        information: "answer.updated";
        body: {
            id: string;
            postId: string;
            content: string;
            authorId: string;
            authorName: string;
            status: "compliant" | "unprocessed" | "notCompliant";
            createdAt: Date;
        };
    };
});

export { CodegenRoutes };
/* v8 ignore stop */
