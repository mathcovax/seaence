<script setup lang="ts">
import FolderHeader from "../../components/FolderHeader.vue";
import DocumentFolderCard from "./components/DocumentFolderCard.vue";
import { usePage } from "./composables/usePage";

const { $pt } = documentFolderPage.use();
const {
	Components,
	actions,
	searchDocumentFolder,
	pageDetails,
} = usePage();
</script>

<template>
	<section
		class="min-h-screen-nh space-y-6"
	>
		<FolderHeader
			:title="$pt('title')"
			:placeholder="$pt('searchPlaceholder')"
			icon="folder"
			:count-total-item="pageDetails?.total"
			:count-filtered-item="searchDocumentFolder.data.value?.details.total"
			v-model:term="searchDocumentFolder.term.value"
			add-button
			@add="actions.createDocumentFolder"
		/>

		<div
			v-if="searchDocumentFolder.data.value?.list.length && pageDetails"
			class="space-y-2"
		>
			<ul class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
				<li
					v-for="folder in searchDocumentFolder.data.value.list"
					:key="folder.id"
				>
					<DocumentFolderCard
						:document-folder="folder"
						@click="actions.clickOnDocumentFolder"
						@delete="actions.removeDocumentFolder"
						@rename="actions.renameDocumentFolder"
					/>
				</li>
			</ul>

			<div
				class="mt-10 flex justify-center"
				v-if="searchDocumentFolder.data.value.details.total > pageDetails.quantityPerPage"
			>
				<DSPagination
					:total="searchDocumentFolder.data.value.details.total"
					v-model:current-page="searchDocumentFolder.page.value"
					:quantity-per-page="pageDetails.quantityPerPage"
				/>
			</div>
		</div>

		<Components.CreateFormDialog />

		<Components.DeleteDialog />

		<Components.RenameFormDialog />
	</section>
</template>
