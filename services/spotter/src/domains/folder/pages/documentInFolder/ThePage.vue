<script setup lang="ts">
import FolderHeader from "../../components/FolderHeader.vue";
import DocumentInFolderCard from "./components/DocumentInFolderCard.vue";
import { usePage } from "./composables/usePage";

const { $pt } = documentInFolderPage.use();
const {
	Components,
	searchDocumentInFolder,
	pageDetails,
	actions,
} = usePage();

</script>

<template>
	<section
		class="min-h-screen-nh space-y-6"
	>
		<FolderHeader
			:title="$pt('title', {title: pageDetails?.documentFolderName})"
			:placeholder="$pt('searchPlaceholder')"
			icon="file"
			:count-total-item="pageDetails?.total"
			:count-filtered-item="searchDocumentInFolder.data.value?.details.total"
			v-model:term="searchDocumentInFolder.term.value"
		/>

		<div
			v-if="searchDocumentInFolder.data.value?.list.length && pageDetails"
			class="space-y-2"
		>
			<DocumentInFolderCard
				v-for="item in searchDocumentInFolder.data.value.list"
				:key="item.nodeSameRawDocumentId"
				:document-in-folder="item"
				@click="actions.clickOnDocumentInFolder"
				@delete="actions.removeDocumentInFolder"
				@rename="actions.renameDocumentInFolder"
			/>

			<div
				class="mt-10 flex justify-center"
				v-if="searchDocumentInFolder.data.value.details.total > pageDetails.quantityPerPage"
			>
				<DSPagination
					:total="searchDocumentInFolder.data.value.details.total"
					v-model:current-page="searchDocumentInFolder.page.value"
					:quantity-per-page="pageDetails.quantityPerPage"
				/>
			</div>
		</div>

		<Components.DeleteDialog />

		<Components.RenameFormDialog />
	</section>
</template>
