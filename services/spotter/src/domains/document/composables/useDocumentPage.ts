import type { BakedDocument, Post } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

export function useDocumentPage(
	bakedDocumentId: Ref<string>,
	whenFindError: () => void,
) {
	const document = ref<BakedDocument | null>(null);
	const posts = ref<Post[] | null>(null);

	function findDocument() {
		return horizonClient
			.post(
				"/document-page",
				{
					body: {
						bakedDocumentId: bakedDocumentId.value,
					},
				},
			)
			.whenInformation(
				"documentPage.found",
				({ body }) => {
					document.value = body.document;
					posts.value = body.posts;
				},
			)
			.whenRequestError(
				whenFindError,
			);
	}

	watch(bakedDocumentId, () => {
		void findDocument();
	}, { immediate: true });

	return {
		document,
		posts,
		findDocument,
	};
}
