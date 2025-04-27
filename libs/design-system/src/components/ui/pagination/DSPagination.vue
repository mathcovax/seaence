<script setup lang="ts">
import {
	PaginationRoot,
	PaginationList,
	PaginationListItem,
} from "reka-ui";
import DSPaginationPrev from "./DSPaginationPrev.vue";
import DSPaginationFirst from "./DSPaginationFirst.vue";
import DSButton from "../button/DSButton.vue";
import DSPaginationEllipsis from "./DSPaginationEllipsis.vue";
import DSPaginationNext from "./DSPaginationNext.vue";
import DSPaginationLast from "./DSPaginationLast.vue";

const emit = defineEmits<{
	update: [value: number];
}>();

defineProps<{
	total: number;
	currentPage: number;
	quantityPerPage: number;
}>();

function update(page: number) {
	emit("update", page);
}
</script>

<template>
	<PaginationRoot
		v-slot="{ page }"
		:items-per-page="quantityPerPage"
		:total="total * quantityPerPage / quantityPerPage"
		:sibling-count="1"
		show-edges
		:page="currentPage"
		@update:page="update"
		class="flex justify-center my-8 scale-75 sm:scale-100"
	>
		<PaginationList
			v-slot="{ items }"
			class="flex items-center gap-1"
		>
			<DSPaginationFirst />

			<DSPaginationPrev />

			<template v-for="(item, index) in items">
				<PaginationListItem
					v-if="item.type === 'page'"
					:key="index"
					:value="item.value"
					as-child
				>
					<DSButton
						class="w-10 h-10 p-0 cursor-pointer"
						:variant="item.value === page ? 'seaence' : 'outline'"
					>
						{{ item.value }}
					</DSButton>
				</PaginationListItem>

				<DSPaginationEllipsis
					v-else
					:key="item.type"
					:index="index"
				/>
			</template>

			<DSPaginationNext />

			<DSPaginationLast />
		</PaginationList>
	</PaginationRoot>
</template>
