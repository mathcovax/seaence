const defaultPage = 1;
const debounceTime = 500;

export function useSearchDocumentInFolder() {
	const { params } = documentInFolderPage.use();

	const searchDocumentInFolder = useSearch(
		({ page, term, abortController }) => horizonClient
			.post(
				"/find-many-document-in-folder",
				{
					body: {
						documentFolderId: params.value.documentFolderId,
						page,
						partialDocumentInFolderName: term,
					},
					signal: abortController.signal,
					disableAuthenticationRequiredManagement: true,
					disabledLoader: true,
				},
			)
			.iWantInformation("documentInFolderList.found")
			.then(({ body }) => body),
		({ term, abortController }) => horizonClient
			.post(
				"/find-many-document-in-folder-details",
				{
					body: {
						documentFolderId: params.value.documentFolderId,
						partialDocumentInFolderName: term,
					},
					signal: abortController.signal,
					disableAuthenticationRequiredManagement: true,
					disabledLoader: true,
				},
			)
			.iWantInformation("documentInFolderList.foundDetails")
			.then(({ body }) => body),
		{
			debounceTime,
			page: defaultPage,
			immediate: true,
			term: "",
		},
	);

	return searchDocumentInFolder;
}
