<script setup lang="ts">
import { cn } from "../../../lib/utils";
import { ChevronsRight } from "lucide-vue-next";
import { PaginationLast, type PaginationLastProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import DSOutlineButton from "../button/DSOutlineButton.vue";

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
		<DSOutlineButton
			square
			:class="cn('', props.class)"
		>
			<slot>
				<ChevronsRight class="h-4 w-4" />
			</slot>
		</DSOutlineButton>
	</PaginationLast>
</template>
