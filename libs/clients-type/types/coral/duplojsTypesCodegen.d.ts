import { TheDate, SerializedTheDate } from "@duplojs/utils/date";

export type OperatorAnd = {
    type: "operator";
    name: "and";
    content: OperatorContent[];
};

export type OperatorNOT = {
    type: "operator";
    name: "not";
    content: OperatorContent | null;
};

export type OperatorOR = {
    type: "operator";
    name: "or";
    content: OperatorContent[];
};

export type ComparatorText = {
    type: "comparator";
    name: "text";
    boost: "1" | "2" | "3";
    field: "allField" | "title" | "abstract" | "keywords";
    value: string;
};

export type ComparatorYear = {
    type: "comparator";
    name: "year";
    boost: "1" | "2" | "3";
    field: "allDate" | "webDate" | "journalDate";
    value: number;
};

export type ComparatorStrictText = {
    type: "comparator";
    name: "strictText";
    boost: "1" | "2" | "3";
    field: "allField" | "title" | "abstract" | "keywords";
    value: string;
};

export type ComparatorAuthor = {
    type: "comparator";
    name: "author";
    boost: "1" | "2" | "3";
    value: string;
};

export type ComparatorYearInterval = {
    type: "comparator";
    name: "yearInterval";
    boost: "1" | "2" | "3";
    field: "allDate" | "webDate" | "journalDate";
    value: {
        from: number;
        to: number;
    };
};

export type ComparatorArticleType = {
    type: "comparator";
    name: "articleType";
    boost: "1" | "2" | "3";
    value: ("metaAnalysis" | "controlledClinicalTrial" | "randomizedControlledTrial")[];
};

export type ComparatorProvider = {
    type: "comparator";
    name: "provider";
    boost: "1" | "2" | "3";
    value: "pubmed"[];
};

export type OperatorContent = OperatorAnd | OperatorNOT | OperatorOR | ComparatorText | ComparatorYear | ComparatorStrictText | ComparatorAuthor | ComparatorYearInterval | ComparatorArticleType | ComparatorProvider;

export type OperatorContent = OperatorAnd | OperatorNOT | OperatorOR | ComparatorText | ComparatorYear | ComparatorStrictText | ComparatorAuthor | ComparatorYearInterval | ComparatorArticleType | ComparatorProvider;

export type Routes = {
    method: "POST";
    path: "/node-same-raw-document-ids-have-document-in-folder";
    body: {
        userId: string;
        nodeSameRawDocumentIds: string[];
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "200";
        information: "nodeSameRawDocumentIdsHaveDocumentInFolder.found";
        body: string[];
    };
} | {
    method: "POST";
    path: "/find-many-favorite-equation-name";
    body: {
        userId: string;
        partialFavoriteEquationName: string;
        page: number;
        quantityPerPage: number;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "200";
        information: "favoriteEquation.name.findMany";
        body: {
            id: string;
            name: string;
        }[];
    };
} | {
    method: "POST";
    path: "/find-many-favorite-equation-details";
    body: {
        userId: string;
        partialFavoriteEquationName: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "200";
        information: "favoriteEquation.findMany.details";
        body: {
            total: number;
        };
    };
} | {
    method: "POST";
    path: "/find-one-favorite-equation";
    body: {
        userId: string;
        favoriteEquationId: string;
    };
    responses: {
        code: "200";
        information: "favoriteEquation.findOne";
        body: {
            id: string;
            name: string;
            userId: string;
            equation: OperatorContent;
            addedAt: ...;
        };
    } | {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "403";
        information: "favoriteEquation.wrongProprietary";
        body?: undefined;
    } | {
        code: "404";
        information: "favoriteEquation.notfound";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/remove-favorite-equation";
    body: {
        userId: string;
        favoriteEquationId: string;
    };
    responses: {
        code: "204";
        information: "favoriteEquation.removed";
        body?: undefined;
    } | {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "403";
        information: "favoriteEquation.wrongProprietary";
        body?: undefined;
    } | {
        code: "404";
        information: "favoriteEquation.notfound";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/upsert-favorite-equation";
    body: {
        userId: string;
        equation: OperatorContent;
        favoriteEquationName: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "204";
        information: "favoriteEquation.upsert";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/create-document-folder";
    body: {
        userId: string;
        documentFolderName: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "201";
        information: "documentFolder.created";
        body?: undefined;
    } | {
        code: "409";
        information: "documentFolder.alreadyExists";
        body?: undefined;
    } | {
        code: "409";
        information: "documentFolder.maxQuantity";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/find-many-document-folder";
    body: {
        userId: string;
        partialDocumentFolderName: string;
        page: number;
        quantityPerPage: number;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "200";
        information: "documentFolders.found";
        body: {
            id: string;
            userId: string;
            name: string;
            numberOfDocument: number;
            createdAt: ...;
        }[];
    };
} | {
    method: "POST";
    path: "/find-many-document-folders-details";
    body: {
        userId: string;
        partialDocumentFolderName: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "200";
        information: "documentFolders.foundDetails";
        body: {
            total: number;
        };
    };
} | {
    method: "POST";
    path: "/find-many-document-folders-in-which-document-exist";
    body: {
        userId: string;
        nodeSameRawDocumentId: string;
        partialDocumentFolderName: string;
        page: number;
        quantityPerPage: number;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "200";
        information: "documentFolders.found";
        body: {
            id: string;
            userId: string;
            name: string;
            numberOfDocument: number;
            createdAt: ...;
        }[];
    };
} | {
    method: "POST";
    path: "/find-many-document-folders-in-which-document-exist-details";
    body: {
        userId: string;
        partialDocumentFolderName: string;
        nodeSameRawDocumentId: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "200";
        information: "documentFolders.foundDetails";
        body: {
            total: number;
        };
    };
} | {
    method: "POST";
    path: "/find-one-document-folder";
    body: {
        documentFolderId: string;
        userId: string;
    };
    responses: {
        code: "200";
        information: "documentFolder.found";
        body: {
            id: string;
            userId: string;
            name: string;
            numberOfDocument: number;
            createdAt: ...;
        };
    } | {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "403";
        information: "documentFolder.wrongProprietary";
        body?: undefined;
    } | {
        code: "404";
        information: "documentFolder.notfound";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/remove-document-folder";
    body: {
        documentFolderId: string;
        userId: string;
    };
    responses: {
        code: "204";
        information: "documentFolder.removed";
        body?: undefined;
    } | {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "403";
        information: "documentFolder.wrongProprietary";
        body?: undefined;
    } | {
        code: "404";
        information: "documentFolder.notfound";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/rename-document-folder";
    body: {
        newDocumentFolderName: string;
        documentFolderId: string;
        userId: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "409";
        information: "documentFolder.alreadyExists";
        body?: undefined;
    } | {
        code: "204";
        information: "documentFolder.renamed";
        body?: undefined;
    } | {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "403";
        information: "documentFolder.wrongProprietary";
        body?: undefined;
    } | {
        code: "404";
        information: "documentFolder.notfound";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/rename-document-in-folder";
    body: {
        newDocumentInFolderName: string;
        nodeSameRawDocumentId: string;
        documentFolderId: string;
        userId: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "204";
        information: "documentInFolder.renamed";
        body?: undefined;
    } | {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "404";
        information: "documentInFolder.notfound";
        body?: undefined;
    } | {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "403";
        information: "documentFolder.wrongProprietary";
        body?: undefined;
    } | {
        code: "404";
        information: "documentFolder.notfound";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/remove-document-in-folder";
    body: {
        nodeSameRawDocumentId: string;
        documentFolderId: string;
        userId: string;
    };
    responses: {
        code: "204";
        information: "documentInFolder.removed";
        body?: undefined;
    } | {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "404";
        information: "documentInFolder.notfound";
        body?: undefined;
    } | {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "403";
        information: "documentFolder.wrongProprietary";
        body?: undefined;
    } | {
        code: "404";
        information: "documentFolder.notfound";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/find-one-document-in-folder";
    body: {
        nodeSameRawDocumentId: string;
        documentFolderId: string;
        userId: string;
    };
    responses: {
        code: "200";
        information: "documentInFolder.found";
        body: {
            name: string;
            documentFolderId: string;
            userId: string;
            nodeSameRawDocumentId: string;
            addedAt: ...;
        };
    } | {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "404";
        information: "documentInFolder.notfound";
        body?: undefined;
    } | {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "403";
        information: "documentFolder.wrongProprietary";
        body?: undefined;
    } | {
        code: "404";
        information: "documentFolder.notfound";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/create-many-document-in-folder";
    body: {
        userId: string;
        nodeSameRawDocumentId: string;
        documentInFolderName: string;
        documentFolderIds: string[];
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "404";
        information: "documentFolder.noneFound";
        body?: undefined;
    } | {
        code: "403";
        information: "documentFolder.noneCapacity";
        body?: undefined;
    } | {
        code: "200";
        information: "documentInFolder.created";
        body: {
            capacityError: number;
            foundError: number;
        };
    };
} | {
    method: "POST";
    path: "/find-many-document-in-folder";
    body: {
        partialDocumentInFolderName: string;
        page: number;
        quantityPerPage: number;
        documentFolderId: string;
        userId: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "200";
        information: "documentsInFolder.found";
        body: {
            name: string;
            documentFolderId: string;
            userId: string;
            nodeSameRawDocumentId: string;
            addedAt: ...;
        }[];
    } | {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "403";
        information: "documentFolder.wrongProprietary";
        body?: undefined;
    } | {
        code: "404";
        information: "documentFolder.notfound";
        body?: undefined;
    };
} | {
    method: "POST";
    path: "/find-many-document-in-folder-details";
    body: {
        partialDocumentInFolderName: string;
        documentFolderId: string;
        userId: string;
    };
    responses: {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "200";
        information: "documentsInFolder.foundDetails";
        body: {
            total: number;
        };
    } | {
        code: "422";
        information: "extract-error";
        body?: undefined;
    } | {
        code: "403";
        information: "documentFolder.wrongProprietary";
        body?: undefined;
    } | {
        code: "404";
        information: "documentFolder.notfound";
        body?: undefined;
    };
};