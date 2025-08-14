const defaultPage = 1;
const debounceTime = 500;

export function useSearchDocumentFolder() {
	const searchDocumentFolder = useSearch(
		({ page, term, abortController }) => horizonClient
			.post(
				"/find-many-document-folder",
				{
					body: {
						page,
						partialDocumentFolderName: term,
					},
					signal: abortController.signal,
					disableAuthenticationRequiredManagement: true,
					disabledLoader: true,
				},
			)
			.iWantInformation("documentFolders.found")
			.then(({ body }) => body),
		({ term, abortController }) => horizonClient
			.post(
				"/find-many-document-folder-details",
				{
					body: {
						partialDocumentFolderName: term,
					},
					signal: abortController.signal,
					disableAuthenticationRequiredManagement: true,
					disabledLoader: true,
				},
			)
			.iWantInformation("documentFolders.foundDetails")
			.then(({ body }) => body),
		{
			debounceTime,
			page: defaultPage,
			immediate: true,
			term: "",
		},
	);

	return searchDocumentFolder;
}
