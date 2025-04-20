<script setup lang="ts">
import { cn } from "../../../lib/utils";
import { ChevronsRight } from "lucide-vue-next";
import { PaginationLast, type PaginationLastProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import DSButton from "../button/DSButton.vue";

const props = withDefaults(defineProps<PaginationLastProps & { class?: HTMLAttributes["class"] }>(), {
	asChild: true,
});

const delegatedProps = computed(() => {
	const { class: _class, ...delegated } = props;

	return delegated;
});
</script>

<template>
	<PaginationLast v-bind="delegatedProps">
		<DSButton
			:class="cn('w-10 h-10 p-0', props.class)"
			variant="outline"
		>
			<slot>
				<ChevronsRight class="h-4 w-4" />
			</slot>
		</DSButton>
	</PaginationLast>
</template>
