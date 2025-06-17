<script setup lang="ts">
import {
	PaginationRoot,
	PaginationList,
	PaginationListItem,
} from "reka-ui";
import DSPaginationPrev from "./DSPaginationPrev.vue";
import DSButton from "../button/DSButton.vue";
import DSPaginationEllipsis from "./DSPaginationEllipsis.vue";
import DSPaginationNext from "./DSPaginationNext.vue";
import { computed } from "vue";

const emit = defineEmits<{
	update: [value: number];
}>();

const props = defineProps<{
	total: number;
	quantityPerPage: number;
	maxPage?: number;
	size?: "small" | "default";
}>();

const currentPageModel = defineModel<number>("currentPage");

function update(page: number) {
	currentPageModel.value = page;
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
		:page="currentPageModel"
		@update:page="update"
	>
		<PaginationList
			v-slot="{ items }"
			class="flex items-center gap-1 *:shrink-0"
		>
			<DSPaginationPrev
				:class="{
					'hidden': size !== 'small'
				}"
			/>

			<template v-for="(item, index) in items">
				<PaginationListItem
					v-if="item.type === 'page'"
					:key="index"
					:value="item.value"
					as-child
				>
					<DSButton
						square
						:variant="item.value === page ? 'primary' : 'outline'"
						:class="{
							'hidden': size === 'small' && item.value !== page
						}"
					>
						{{ item.value }}
					</DSButton>
				</PaginationListItem>

				<DSPaginationEllipsis
					v-else
					:class="{
						'hidden': size === 'small'
					}"
					:key="item.type"
					:index="index"
				/>
			</template>

			<DSPaginationNext
				:class="{
					'hidden': size !== 'small'
				}"
			/>
		</PaginationList>
	</PaginationRoot>
</template>
