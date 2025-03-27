<script setup lang="ts">
import { mdiViewGrid, mdiFormatListBulletedSquare } from "@mdi/js";
import DocumentResultCard from "../components/DocumentResultCard.vue";
import DocumentResultRow from "../components/DocumentResultRow.vue";

// Mock data
const START_INDEX = 1;
const documents = Array.from({ length: 10 }, (unused, index) => ({
	id: index + START_INDEX,
	title: `Document ${index + START_INDEX}`,
	description: `
		Lorem ipsum dolor sit amet, consectetur adipiscing elit,
		sed do eiusmod tempor incididunt ut labore etdolore magna aliqua.
		Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
		Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
		Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	`,
	author: "Albert Einstein",
	imageUrl: "https://picsum.photos/100/100",
}));
</script>

<template>
	<section class="min-h-[calc(100vh-6rem-2rem)] space-y-12">
		<DSInputSearch
			button-text="Rechercher"
			class="sticky top-28 z-10 w-full max-w-xl mx-auto"
		/>

		<DSTabs default-value="cards">
			<DSTabsList class="w-36 grid grid-cols-2">
				<DSTabsTrigger
					value="cards"
					title="Cards"
				>
					<TheIcon :icon="mdiViewGrid" />
				</DSTabsTrigger>

				<DSTabsTrigger
					value="rows"
					title="Rows"
				>
					<TheIcon :icon="mdiFormatListBulletedSquare" />
				</DSTabsTrigger>
			</DSTabsList>

			<DSTabsContent value="cards">
				<div class="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
					<DocumentResultCard
						v-for="document in documents"
						:key="document.id"
						:document="document"
					/>
				</div>
			</DSTabsContent>

			<DSTabsContent value="rows">
				<div class="w-full max-w-5xl mx-auto">
					<DocumentResultRow
						v-for="document in documents"
						:key="document.id"
						:document="document"
					/>
				</div>
			</DSTabsContent>
		</DSTabs>
	</section>
</template>
