<script setup lang="ts">
import {
	PaginationRoot as DSPagination,
	PaginationList as DSPaginationList,
	PaginationListItem as DSPaginationListItem,
} from "reka-ui";

const emit = defineEmits<{
	update: [value: number];
}>();

defineProps<{
	total: number;
	currentPage: number;
	productPerPage: number;
}>();

function update(page: number) {
	emit("update", page);
}
</script>

<template>
	<DSPagination
		v-slot="{ page }"
		:items-per-page="productPerPage"
		:total="total * productPerPage / productPerPage"
		:sibling-count="1"
		show-edges
		:page="currentPage"
		@update:page="update"
		class="flex justify-center my-8"
	>
		<DSPaginationList
			v-slot="{ items }"
			class="flex items-center gap-1"
		>
			<DSPaginationFirst />

			<DSPaginationPrev />

			<template v-for="(item, index) in items">
				<DSPaginationListItem
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
				</DSPaginationListItem>

				<DSPaginationEllipsis
					v-else
					:key="item.type"
					:index="index"
				/>
			</template>

			<DSPaginationNext />

			<DSPaginationLast />
		</DSPaginationList>
	</DSPagination>
</template>
