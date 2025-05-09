// Generated by @duplojs/types-codegen
/* eslint-disable */
/* prettier-ignore */
/* istanbul ignore file */
/* v8 ignore start */
// noinspection JSUnusedGlobalSymbols
// @ts-nocheck
type CodegenRoutes = ({
    method: "POST";
    path: "/authentication";
    body: string;
    response: {
        code: 401;
        information: "credential.invalid";
        body?: undefined;
    } | {
        code: 200;
        information: "user.logged";
        body: string;
    };
}) | ({
    method: "POST";
    path: "/create-answer";
    body: {
        postId: string;
        content: string;
    };
    response: {
        code: 403;
        information: "accessToken.invalid";
        body?: undefined;
    } | {
        code: 404;
        information: "user.notfound";
        body?: undefined;
    } | {
        code: 404;
        information: "post.notfound";
        body?: undefined;
    } | {
        code: 201;
        information: "answer.created";
        body?: undefined;
    };
}) | ({
    method: "POST";
    path: "/answer-list";
    body: {
        postId: string;
        page: number;
    };
    response: {
        code: 404;
        information: "post.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "answerList.found";
        body: {
            id: string;
            postId: string;
            content: string;
            author: {
                id: string;
                username: string;
            };
        }[];
    };
}) | ({
    method: "POST";
    path: "/create-post";
    body: {
        topic: string;
        content: string;
        documentId: string;
    };
    response: {
        code: 403;
        information: "accessToken.invalid";
        body?: undefined;
    } | {
        code: 404;
        information: "user.notfound";
        body?: undefined;
    } | {
        code: 404;
        information: "document.notfound";
        body?: undefined;
    } | {
        code: 201;
        information: "post.created";
        body?: undefined;
    };
}) | ({
    method: "POST";
    path: "/post-list";
    body: {
        documentId: string;
        page: number;
    };
    response: {
        code: 404;
        information: "document.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "postList.found";
        body: {
            id: string;
            topic: string;
            content: string | null;
            author: {
                id: string;
                username: string;
            };
            createdAt: string;
            answerCount: number;
        }[];
    };
}) | ({
    method: "POST";
    path: "/post-page";
    body: {
        postId: string;
        language: "fr-FR" | "en-US";
    };
    response: {
        code: 404;
        information: "post.notfound";
        body?: undefined;
    } | {
        code: 404;
        information: "document.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "postPage.found";
        body: {
            post: {
                id: string;
                topic: string;
                content: string | null;
                author: {
                    id: string;
                    username: string;
                };
                createdAt: string;
                answerCount: number;
            };
            document: {
                id: string;
                title: string;
                language: "fr-FR" | "en-US";
            };
            quantityAnswerPerPage: number;
        };
    };
}) | ({
    method: "POST";
    path: "/post-list-page";
    body: {
        documentId: string;
    };
    response: {
        code: 404;
        information: "document.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "postListPage.found";
        body: {
            document: {
                id: string;
                title: string;
                language: "fr-FR" | "en-US";
            };
            totalPostCount: number;
            quantityPostPerPage: number;
        };
    };
}) | ({
    method: "GET";
    path: "/user";
    response: {
        code: 403;
        information: "accessToken.invalid";
        body?: undefined;
    } | {
        code: 404;
        information: "user.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "user.get";
        body: {
            id: string;
            username: string;
            email: string;
        };
    };
});

export { CodegenRoutes };
/* v8 ignore stop */
