<script setup lang="ts">
import {
	type ListboxRootEmits,
	type ListboxRootProps,
	ListboxRoot,
	useFilter,
	useForwardPropsEmits,
} from "reka-ui";
import { cn } from "../../../lib/utils";
import { computed, type HTMLAttributes, reactive, ref, watch } from "vue";
import { provideCommandContext } from ".";

const props = withDefaults(defineProps<ListboxRootProps & {
	class?: HTMLAttributes["class"];
	searchTerm: string;
}>(), {
	modelValue: "",
});

const emits = defineEmits<ListboxRootEmits & {
	"update:searchTerm": [value: string];
}>();

const delegatedProps = computed(() => {
	const { class: _class, ...delegated } = props;

	return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const allItems = ref<Map<string, string>>(new Map());
const allGroups = ref<Map<string, Set<string>>>(new Map());

const { contains } = useFilter({ sensitivity: "base" });
const filterState = reactive({
	search: "",
	filtered: {

		/** The count of all visible items. */
		count: 0,

		/** Map from visible item id to its search score. */
		items: new Map() as Map<string, number>,

		/** Set of groups with at least one visible item. */
		groups: new Set() as Set<string>,
	},
});

watch(
	() => props.searchTerm,
	() => {
		filterState.search = props.searchTerm;
	},
);

watch(
	() => filterState.search,
	() => void emits("update:searchTerm", filterState.search),
);

function filterItems() {
	if (!filterState.search) {
		filterState.filtered.count = allItems.value.size;
		// Do nothing, each item will know to show itself because search is empty
		return;
	}

	// Reset the groups
	filterState.filtered.groups = new Set();
	let itemCount = 0;

	// Check which items should be included
	const yes = 1;
	const no = 0;
	for (const [id, value] of allItems.value) {
		const score = contains(value, filterState.search);
		filterState.filtered.items.set(id, score ? yes : no);
		if (score) {
			itemCount++;
		}
	}

	// Check which groups have at least 1 item shown
	const noItem = 0;
	for (const [groupId, group] of allGroups.value) {
		for (const itemId of group) {
			if (filterState.filtered.items.get(itemId)! > noItem) {
				filterState.filtered.groups.add(groupId);
				break;
			}
		}
	}

	filterState.filtered.count = itemCount;
}

watch(() => filterState.search, () => {
	filterItems();
});

provideCommandContext({
	allItems,
	allGroups,
	filterState,
});
</script>

<template>
	<ListboxRoot
		data-slot="command"
		v-bind="forwarded"
		:class="cn('bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md', props.class)"
	>
		<slot />
	</ListboxRoot>
</template>
