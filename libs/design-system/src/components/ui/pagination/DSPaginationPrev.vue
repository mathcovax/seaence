<script setup lang="ts">
import { cn } from "../../../lib/utils";
import { ChevronLeft } from "lucide-vue-next";
import { PaginationPrev, type PaginationPrevProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import DSOutlineButton from "../button/DSOutlineButton.vue";

const props = withDefaults(defineProps<PaginationPrevProps & { class?: HTMLAttributes["class"] }>(), {
	asChild: true,
});

const delegatedProps = computed(() => {
	const { class: _class, ...delegated } = props;

	return delegated;
});
</script>

<template>
	<PaginationPrev v-bind="delegatedProps">
		<DSOutlineButton
			square
			:class="cn('', props.class)"
		>
			<slot>
				<ChevronLeft class="h-4 w-4" />
			</slot>
		</DSOutlineButton>
	</PaginationPrev>
</template>
