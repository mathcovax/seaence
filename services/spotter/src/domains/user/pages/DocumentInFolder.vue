<script setup lang="ts">
import DocumentInFolderItem from "../components/DocumentInFolderItem.vue";
import DocumentInFolderSeparatorItem from "../components/DocumentInFolderSeparatorItem.vue";

const router = useRouter();
const { $pt } = documentInFolderPage.use();

const mock = [
	{
		documentFolderId: "azz",
		nodeSameRawDocumentId: "rerer",
		name: "dfdfdf",
		addedAt: "1995-12-17T03:24:00",
	},
	{
		documentFolderId: "azz",
		nodeSameRawDocumentId: "rerer",
		name: "dfdfdf",
		addedAt: "1995-12-17T03:24:00",
	},
	{
		documentFolderId: "azz",
		nodeSameRawDocumentId: "rerer",
		name: "dfdfdf",
		addedAt: "1995-12-17T03:24:00",
	},
];

const defaultdocumentinFolderIndex = 0;
const selectedDocumentinFolderIndex = ref(defaultdocumentinFolderIndex);

function handleKeydown(event: KeyboardEvent) {
	const one = 1;
	if (event.key === "ArrowDown") {
		event.preventDefault();
		selectedDocumentinFolderIndex.value = Math.min(
			selectedDocumentinFolderIndex.value + one,
			mock.length - one,
		);
	} else if (event.key === "ArrowUp") {
		event.preventDefault();
		selectedDocumentinFolderIndex.value = Math.max(
			selectedDocumentinFolderIndex.value - one,
			defaultdocumentinFolderIndex,
		);
	} else if (event.key === "Enter") {
		const selectedDocumentInFolder = mock[selectedDocumentinFolderIndex.value];
		if (selectedDocumentInFolder) {
			console.log(selectedDocumentInFolder);
		}
	}
}

onMounted(() => {
	window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleKeydown);
});

</script>

<template>
	<section class="max-w-5xl mx-auto px-4 py-8">
		<div
			v-if="true"
			class="flex flex-col gap-6"
		>
			<div class="mb-6 flex gap-4 items-center">
				<DSPrimaryButton
					icon="arrowLeft"
					@click="router.back()"
				/>

				<h1 class="text-3xl font-semibold text-blue-seaence">
					{{ $pt("title") }} : {{ "test" }}
				</h1>
			</div>

			<div v-if="mock && mock.length > 0">
				<div class="space-y-6">
					<div
						v-for="(item, index) in mock"
						:key="item.nodeSameRawDocumentId"
					>
						<DocumentInFolderItem
							:document-in-folder="item"
							:is-selected="selectedDocumentinFolderIndex === index"
						/>

						<DocumentInFolderSeparatorItem v-if="index < mock.length - 1" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
