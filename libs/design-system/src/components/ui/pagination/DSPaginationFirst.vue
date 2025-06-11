<script setup lang="ts">
import { cn } from "../../../lib/utils";
import { ChevronsLeft } from "lucide-vue-next";
import { PaginationFirst, type PaginationFirstProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import DSOutlineButton from "../button/DSOutlineButton.vue";

const props = withDefaults(defineProps<PaginationFirstProps & { class?: HTMLAttributes["class"] }>(), {
	asChild: true,
});

const delegatedProps = computed(() => {
	const { class: _class, ...delegated } = props;

	return delegated;
});
</script>

<template>
	<PaginationFirst v-bind="delegatedProps">
		<DSOutlineButton
			square
			:class="cn('', props.class)"
		>
			<slot>
				<ChevronsLeft class="h-4 w-4" />
			</slot>
		</DSOutlineButton>
	</PaginationFirst>
</template>
