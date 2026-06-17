import { TheDate, SerializedTheDate } from "@duplojs/utils/date";

export type Routes = {
    method: "POST";
    path: "/create-report-answer";
    body: {
        answerId: string;
        level: "ban" | "warning";
        reason: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "404";
        information: "answer.notfound";
        body?: undefined;
    } | {
        code: "403";
        information: "answer.wrongStatus";
        body?: undefined;
    } | {
        code: "201";
        information: "report.created";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/find-unprocessed-answer-details";
    responses: {
        code: "200";
        information: "unprocessedAnswer.details";
        body: {
            totalCount: number;
        };
    };
} | {
    method: "POST";
    path: "/find-many-answer-by-post";
    body: {
        postId: string;
        page: number;
        quantityPerPage: number;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "404";
        information: "post.notfound";
        body?: undefined;
    } | {
        code: "200";
        information: "answers.found";
        body: {
            id: string;
            postId: string;
            authorId: string;
            authorName: string | null;
            content: string;
            status: "compliant" | "unprocessed" | "notCompliant";
            createdAt: SerializedTheDate | TheDate;
        }[];
    };
} | {
    method: "POST";
    path: "/find-oldest-unprocessed-answer";
    responses: {
        code: "200";
        information: "oldestUnprocessedAnswer.found";
        body: {
            id: string;
            postId: string;
            authorId: string;
            authorName: string | null;
            content: string;
            status: "compliant" | "unprocessed" | "notCompliant";
            createdAt: SerializedTheDate | TheDate;
        };
    } | {
        code: "404";
        information: "oldestUnprocessedAnswer.notfound";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/mark-answer-as-compliant";
    body: {
        answerId: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "404";
        information: "answer.notfound";
        body?: undefined;
    } | {
        code: "403";
        information: "answer.wrongStatus";
        body?: undefined;
    } | {
        code: "204";
        information: "answer.markedAsCompliant";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/reply-to-post";
    body: {
        postId: string;
        content: string;
        authorId: string;
        authorName: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "404";
        information: "post.notfound";
        body?: undefined;
    } | {
        code: "403";
        information: "post.wrongStatus";
        body?: undefined;
    } | {
        code: "201";
        information: "answer.created";
        body?: undefined;
    } | {
        code: "422";
        information: "replyToPost.failed";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/create-post";
    body: {
        topic: string;
        content: string;
        nodeSameRawDocumentId: string;
        authorId: string;
        authorName: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "201";
        information: "post.created";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/create-report-post";
    body: {
        postId: string;
        level: "ban" | "warning";
        reason: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "404";
        information: "post.notfound";
        body?: undefined;
    } | {
        code: "403";
        information: "post.wrongStatus";
        body?: undefined;
    } | {
        code: "201";
        information: "report.created";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/find-unprocessed-post-details";
    responses: {
        code: "200";
        information: "unprocessedPost.details";
        body: {
            totalCount: number;
        };
    };
} | {
    method: "POST";
    path: "/find-many-post-by-node-same-raw-document";
    body: {
        nodeSameRawDocumentId: string;
        page: number;
        quantityPerPage: number;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "200";
        information: "posts.found";
        body: {
            id: string;
            topic: string;
            content: string;
            nodeSameRawDocumentId: string;
            answerCount: number;
            authorId: string;
            authorName: string | null;
            status: "compliant" | "unprocessed" | "notCompliant";
            createdAt: SerializedTheDate | TheDate;
        }[];
    };
} | {
    method: "POST";
    path: "/find-many-post-by-node-same-raw-document-details";
    body: {
        nodeSameRawDocumentId: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "200";
        information: "posts.foundDetails";
        body: {
            totalCount: number;
        };
    };
} | {
    method: "POST";
    path: "/find-oldest-unprocessed-post";
    responses: {
        code: "200";
        information: "oldestUnprocessedPost.found";
        body: {
            id: string;
            topic: string;
            content: string;
            nodeSameRawDocumentId: string;
            answerCount: number;
            authorId: string;
            authorName: string | null;
            status: "compliant" | "unprocessed" | "notCompliant";
            createdAt: SerializedTheDate | TheDate;
        };
    } | {
        code: "404";
        information: "oldestUnprocessedPost.notfound";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/find-one-post";
    body: {
        postId: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "404";
        information: "post.notfound";
        body?: undefined;
    } | {
        code: "200";
        information: "post.found";
        body: {
            id: string;
            topic: string;
            content: string;
            nodeSameRawDocumentId: string;
            answerCount: number;
            authorId: string;
            authorName: string | null;
            status: "compliant" | "unprocessed" | "notCompliant";
            createdAt: SerializedTheDate | TheDate;
        };
    };
} | {
    method: "POST";
    path: "/mark-post-as-compliant";
    body: {
        postId: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "404";
        information: "post.notfound";
        body?: undefined;
    } | {
        code: "403";
        information: "post.wrongStatus";
        body?: undefined;
    } | {
        code: "204";
        information: "post.markAsCompliant";
        body?: undefined;
    };
};