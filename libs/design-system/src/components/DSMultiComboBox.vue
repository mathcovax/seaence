<script setup lang="ts" generic="GenericItem extends AcceptableValue">
import { type AcceptableValue } from "reka-ui";
import { ref, defineModel } from "vue";
import DSPopover from "./ui/popover/DSPopover.vue";
import DSPopoverTrigger from "./ui/popover/DSPopoverTrigger.vue";
import DSPopoverContent from "./ui/popover/DSPopoverContent.vue";
import DSButton from "./ui/button/DSButton.vue";
import DSClosingTag from "./DSClosingTag.vue";
import DSIcon from "./ui/icon/DSIcon.vue";
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
	class?: string;
}

const props = defineProps<Props>();

const modelValue = defineModel<GenericItem[]>(
	{ required: true },
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

function removeTag(removedItem: GenericItem) {
	modelValue.value = modelValue.value.filter((item) => item !== removedItem);
}

function onSelect(selectedItem: GenericItem) {
	if (modelValue.value.find((item) => getValue(item) === getValue(selectedItem))) {
		return;
	}
	modelValue.value = [...modelValue.value, selectedItem];
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
					<template v-if="modelValue.length">
						<DSClosingTag
							v-for="(item, index) of modelValue"
							:key="getKey(item) ?? index"
							@close="removeTag(item)"
							@click="$event.stopPropagation()"
							class="px-1 py-0.5 text-xs text-primary bg-primary/20"
						>
							{{ getLabel(item) }}
						</DSClosingTag>
					</template>

					<template v-else>
						<span class="text-sm text-neutral-400 select-none">{{ placeholder }}</span>
					</template>
				</div>

				<span class="h-6 w-px bg-neutral-100 mx-1" />

				<DSButton
					variant="ghost"
					size="icon"
					class="rounded-full cursor-pointer hover:bg-primary/10"
				>
					<DSIcon
						name="plus"
						class="text-primary"
					/>
				</DSButton>
			</div>
		</DSPopoverTrigger>

		<DSPopoverContent class="w-full max-w-xs p-0">
			<DSCommand v-model:search-term="searchTerm">
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
