<script setup lang="ts">
import { cn } from "../../../lib/utils";
import { ChevronRight } from "lucide-vue-next";
import { PaginationNext, type PaginationNextProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import DSButton from "../button/DSButton.vue";

const props = withDefaults(defineProps<PaginationNextProps & { class?: HTMLAttributes["class"] }>(), {
	asChild: true,
});

const delegatedProps = computed(() => {
	const { class: _class, ...delegated } = props;

	return delegated;
});
</script>

<template>
	<PaginationNext v-bind="delegatedProps">
		<DSButton
			variant="outline"
			size="icon"
			:class="cn('', props.class)"
		>
			<slot>
				<ChevronRight class="h-4 w-4" />
			</slot>
		</DSButton>
	</PaginationNext>
</template>
