<script setup lang="ts">
import { cn } from "../../../lib/utils";
import {
	DSButton,
} from "../button";
import { ChevronLeft } from "lucide-vue-next";
import { PaginationPrev, type PaginationPrevProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

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
		<DSButton
			:class="cn('w-10 h-10 p-0', props.class)"
			variant="outline"
		>
			<slot>
				<ChevronLeft class="h-4 w-4" />
			</slot>
		</DSButton>
	</PaginationPrev>
</template>
