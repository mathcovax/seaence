<script setup lang="ts" generic="GenericItem extends AcceptableValue">
import { type AcceptableValue } from "reka-ui";
import { ref, defineModel, type HTMLAttributes } from "vue";
import DSPopover from "./ui/popover/DSPopover.vue";
import DSPopoverTrigger from "./ui/popover/DSPopoverTrigger.vue";
import DSPopoverContent from "./ui/popover/DSPopoverContent.vue";
import DSGhostButton from "./ui/button/DSGhostButton.vue";
import DSCommand from "./ui/command/DSCommand.vue";
import DSCommandInput from "./ui/command/DSCommandInput.vue";
import DSCommandEmpty from "./ui/command/DSCommandEmpty.vue";
import DSCommandList from "./ui/command/DSCommandList.vue";
import DSCommandGroup from "./ui/command/DSCommandGroup.vue";
import DSCommandItem from "./ui/command/DSCommandItem.vue";

interface Props {
	items: GenericItem[];
	label?(item: GenericItem): string;
	value?(item: GenericItem): AcceptableValue;
	placeholder: string;
	emptyLabel: string;
	class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const modelValue = defineModel<GenericItem>(
	{
		required: true,
	},
);

const searchTerm = defineModel<string>(
	"searchTerm",
	{ default: "" },
);

const open = ref(false);

function getKey(item: GenericItem) {
	if (props.label) {
		return props.label(item);
	}
	return null;
}

function getLabel(item: GenericItem) {
	if (props.label) {
		return props.label(item);
	}
	return item;
}

function getValue(item: GenericItem) {
	if (props.value) {
		return props.value(item);
	}
	return item;
}

function onSelect(selectedItem: GenericItem) {
	modelValue.value = selectedItem;
	open.value = false;
}
</script>

<template>
	<DSPopover v-model:open="open">
		<DSPopoverTrigger as-child>
			<div
				role="combobox"
				:aria-expanded="open"
				:class="[
					'h-12 px-3 py-2 flex gap-2 items-center bg-background border rounded-lg',
					props.class,
					open ? 'ring-2 ring-primary' : '',
				]"
			>
				<div
					class="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide"
				>
					<template v-if="modelValue">
						<span class="text-sm">{{ getLabel(modelValue) }}</span>
					</template>

					<template v-else>
						<span class="text-sm text-neutral-400 select-none">{{ placeholder }}</span>
					</template>
				</div>

				<span class="h-6 w-px bg-neutral-100 mx-1" />

				<DSGhostButton
					icon="chevronDown"
					square
					rounded
				/>
			</div>
		</DSPopoverTrigger>

		<DSPopoverContent class="p-0">
			<DSCommand
				v-model:search-term="searchTerm"
			>
				<DSCommandInput
					class="h-9"
					:placeholder="placeholder"
				/>

				<DSCommandList>
					<DSCommandEmpty>{{ emptyLabel }}</DSCommandEmpty>

					<DSCommandGroup>
						<DSCommandItem
							v-for="(item, index) in items"
							:key="getKey(item) ?? index"
							:value="getValue(item)"
							@select="onSelect(item)"
						>
							{{ getLabel(item) }}
						</DSCommandItem>
					</DSCommandGroup>
				</DSCommandList>
			</DSCommand>
		</DSPopoverContent>
	</DSPopover>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
