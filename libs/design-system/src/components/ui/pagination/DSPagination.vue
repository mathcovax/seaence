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
import { computed } from "vue";

const emit = defineEmits<{
	update: [value: number];
}>();

const props = defineProps<{
	total: number;
	currentPage: number;
	quantityPerPage: number;
	maxPage?: number;
}>();

function update(page: number) {
	emit("update", page);
}

const limitedTotal = computed(
	() => props.maxPage && ((props.total / props.quantityPerPage) > props.maxPage)
		? props.maxPage * props.quantityPerPage
		: props.total,
);

</script>

<template>
	<PaginationRoot
		v-slot="{ page }"
		:items-per-page="quantityPerPage"
		:total="limitedTotal"
		:sibling-count="1"
		show-edges
		:page="currentPage"
		@update:page="update"
		class="flex justify-center scale-75 sm:scale-100"
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
						:variant="item.value === page ? 'seaence' : 'outline'"
						size="icon"
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
