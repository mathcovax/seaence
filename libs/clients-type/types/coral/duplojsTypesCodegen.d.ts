// Generated by @duplojs/types-codegen
/* eslint-disable */
/* prettier-ignore */
/* istanbul ignore file */
/* v8 ignore start */
// noinspection JSUnusedGlobalSymbols
// @ts-nocheck
type OperatorContent = OperatorAnd | OperatorOR | OperatorNot | ComparatorText | ComparatorYear | {
    type: "comparator";
    name: "strictText";
    boost: "1" | "2" | "3";
    field: "allField" | "title" | "abstract" | "keywords";
    value: string;
} | {
    type: "comparator";
    name: "author";
    boost: "1" | "2" | "3";
    value: string;
} | {
    type: "comparator";
    name: "yearInterval";
    boost: "1" | "2" | "3";
    field: "allDate" | "webDate" | "journalDate";
    value: {
        from: number;
        to: number;
    };
} | {
    type: "comparator";
    name: "articleType";
    boost: "1" | "2" | "3";
    value: ("metaAnalysis")[];
} | {
    type: "comparator";
    name: "provider";
    boost: "1" | "2" | "3";
    value: ("pubmed")[];
};

export { OperatorContent };

type OperatorAnd = {
    type: "operator";
    name: "and";
    content: OperatorContent[];
};

export { OperatorAnd };

type OperatorOR = {
    type: "operator";
    name: "or";
    content: OperatorContent[];
};

export { OperatorOR };

type OperatorNot = {
    type: "operator";
    name: "not";
    content: OperatorContent | null;
};

export { OperatorNot };

type ComparatorText = {
    type: "comparator";
    name: "text";
    boost: "1" | "2" | "3";
    field: "allField" | "title" | "abstract" | "keywords";
    value: string;
};

export { ComparatorText };

type ComparatorYear = {
    type: "comparator";
    name: "year";
    boost: "1" | "2" | "3";
    field: "allDate" | "webDate" | "journalDate";
    value: number;
};

export { ComparatorYear };

type CodegenRoutes = ({
    method: "POST";
    path: "/create-document-folder";
    body: {
        userId: string;
        documentFolderName: string;
    };
    response: {
        code: 409;
        information: "documentFolder.alreadyExists";
        body?: undefined;
    } | {
        code: 409;
        information: "documentFolder.maxQuantity";
        body?: undefined;
    } | {
        code: 200;
        information: "documentFolder.created";
        body?: undefined;
    };
}) | ({
    method: "POST";
    path: "/get-document-folder";
    body: {
        documentFolderId: string;
        userId: string;
    };
    response: {
        code: 403;
        information: "documentFolder.wrongProprietary";
        body?: undefined;
    } | {
        code: 404;
        information: "documentFolder.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "documentFolder.found";
        body: {
            id: string;
            userId: string;
            name: string;
            numberOfDocument: number;
            createdAt: Date;
        };
    };
}) | ({
    method: "POST";
    path: "/remove-document-folder";
    body: {
        documentFolderId: string;
        userId: string;
    };
    response: {
        code: 403;
        information: "documentFolder.wrongProprietary";
        body?: undefined;
    } | {
        code: 404;
        information: "documentFolder.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "documentFolder.removed";
        body?: undefined;
    };
}) | ({
    method: "POST";
    path: "/find-many-document-folder";
    body: {
        userId: string;
        partialDocumentFolderName: string;
        page: number;
        quantityPerPage: number;
    };
    response: {
        code: 200;
        information: "documentFolders.found";
        body: {
            id: string;
            userId: string;
            name: string;
            numberOfDocument: number;
            createdAt: Date;
        }[];
    };
}) | ({
    method: "POST";
    path: "/find-many-document-folders-details";
    body: {
        userId: string;
        partialDocumentFolderName: string;
    };
    response: {
        code: 200;
        information: "documentFolders.foundDetails";
        body: {
            total: number;
        };
    };
}) | ({
    method: "POST";
    path: "/find-many-document-folders-in-which-document-exist";
    body: {
        page: number;
        quantityPerPage: number;
        partialDocumentFolderName: string;
        userId: string;
        nodeSameRawDocumentId: string;
    };
    response: {
        code: 200;
        information: "documentFolders.found";
        body: {
            id: string;
            userId: string;
            name: string;
            numberOfDocument: number;
            createdAt: Date;
        }[];
    };
}) | ({
    method: "POST";
    path: "/find-many-document-folders-in-which-document-exist-details";
    body: {
        partialDocumentFolderName: string;
        userId: string;
        nodeSameRawDocumentId: string;
    };
    response: {
        code: 200;
        information: "documentFolders.foundDetails";
        body: {
            total: number;
        };
    };
}) | ({
    method: "POST";
    path: "/create-many-document-in-folder";
    body: {
        documentFolderIds: string[];
        userId: string;
        nodeSameRawDocumentId: string;
        documentInFolderName: string;
    };
    response: {
        code: 404;
        information: "documentFolder.noneFound";
        body?: undefined;
    } | {
        code: 200;
        information: "documentInFolder.created";
        body?: undefined;
    };
}) | ({
    method: "POST";
    path: "/get-document-in-folder";
    body: {
        documentFolderId: string;
        userId: string;
    } & {
        nodeSameRawDocumentId: string;
    };
    response: {
        code: 403;
        information: "documentFolder.wrongProprietary";
        body?: undefined;
    } | {
        code: 404;
        information: "documentFolder.notfound";
        body?: undefined;
    } | {
        code: 404;
        information: "documentInFolder.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "documentInFolder.found";
        body: {
            documentFolderId: string;
            nodeSameRawDocumentId: string;
            name: string;
            addedAt: Date;
        };
    };
}) | ({
    method: "POST";
    path: "/remove-document-in-folder";
    body: {
        documentFolderId: string;
        userId: string;
    } & {
        nodeSameRawDocumentId: string;
    };
    response: {
        code: 403;
        information: "documentFolder.wrongProprietary";
        body?: undefined;
    } | {
        code: 404;
        information: "documentFolder.notfound";
        body?: undefined;
    } | {
        code: 404;
        information: "documentInFolder.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "documentInFolder.removed";
        body?: undefined;
    };
}) | ({
    method: "POST";
    path: "/find-many-document-in-folder";
    body: {
        documentFolderId: string;
        userId: string;
    } & {
        partialDocumentInFolderName: string;
        page: number;
        quantityPerPage: number;
    };
    response: {
        code: 403;
        information: "documentFolder.wrongProprietary";
        body?: undefined;
    } | {
        code: 404;
        information: "documentFolder.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "documentsInFolder.found";
        body: {
            documentFolderId: string;
            nodeSameRawDocumentId: string;
            name: string;
            addedAt: Date;
        }[];
    };
}) | ({
    method: "POST";
    path: "/find-many-document-in-folder-details";
    body: {
        documentFolderId: string;
        userId: string;
    } & {
        partialDocumentInFolderName: string;
    };
    response: {
        code: 403;
        information: "documentFolder.wrongProprietary";
        body?: undefined;
    } | {
        code: 404;
        information: "documentFolder.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "documentsInFolder.foundDetails";
        body: {
            total: number;
        };
    };
}) | ({
    method: "POST";
    path: "/upsert-favorite-equation";
    body: {
        userId: string;
        equation: OperatorContent;
        favoriteEquationName: string;
    };
    response: {
        code: 204;
        information: "favoriteEquation.upsert";
        body?: undefined;
    };
}) | ({
    method: "POST";
    path: "/find-one-favorite-equation";
    body: {
        userId: string;
        favoriteEquationId: string;
    };
    response: {
        code: 403;
        information: "favoriteEquation.wrongProprietary";
        body?: undefined;
    } | {
        code: 404;
        information: "favoriteEquation.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "favoriteEquation.findOne";
        body: {
            id: string;
            name: string;
            userId: string;
            equation: OperatorContent;
            addedAt: Date;
        };
    };
}) | ({
    method: "POST";
    path: "/remove-favorite-equation";
    body: {
        userId: string;
        favoriteEquationId: string;
    };
    response: {
        code: 403;
        information: "favoriteEquation.wrongProprietary";
        body?: undefined;
    } | {
        code: 404;
        information: "favoriteEquation.notfound";
        body?: undefined;
    } | {
        code: 200;
        information: "favoriteEquation.removed";
        body?: undefined;
    };
}) | ({
    method: "POST";
    path: "/find-many-favorite-equation-name";
    body: {
        userId: string;
        partialFavoriteEquationName: string;
        page: number;
        quantityPerPage: number;
    };
    response: {
        code: 200;
        information: "favoriteEquation.name.findMany";
        body: {
            id: string;
            name: string;
        }[];
    };
}) | ({
    method: "POST";
    path: "/find-many-favorite-equation-details";
    body: {
        userId: string;
        partialFavoriteEquationName: string;
    };
    response: {
        code: 200;
        information: "favoriEquation.findMany.details";
        body: {
            total: number;
        };
    };
}) | ({
    method: "POST";
    path: "/node-same-raw-document-ids-have-document-in-folder";
    body: {
        userId: string;
        nodeSameRawDocumentIds: string[];
    };
    response: {
        code: 200;
        information: "nodeSameRawDocumentIdsHaveDocumentInFolder.found";
        body: string[];
    };
});

export { CodegenRoutes };
/* v8 ignore stop */
