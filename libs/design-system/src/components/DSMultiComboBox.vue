<script setup lang="ts" generic="GenericItem extends AcceptableValue">
import { type AcceptableValue } from "reka-ui";
import { ref, defineModel } from "vue";
import DSPopover from "./ui/popover/DSPopover.vue";
import DSGhostButton from "./ui/button/DSGhostButton.vue";
import DSClosingTag from "./DSClosingTag.vue";
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
	max?: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	focus: [];
}>();

const modelValue = defineModel<GenericItem[]>(
	{ required: true },
);

const searchTerm = defineModel<string>(
	"searchTerm",
	{ default: "" },
);

const open = ref(false);
const inputRef = ref<HTMLElement | null>(null);

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
	const notfoundIndex = -1;
	const deleteQuantity = 1;

	const index = modelValue.value.findIndex((item) => getValue(item) === getValue(selectedItem));

	if (index === notfoundIndex) {
		modelValue.value = [...modelValue.value, selectedItem];
	} else {
		const newModelValue = [...modelValue.value];
		newModelValue.splice(index, deleteQuantity);
		modelValue.value = newModelValue;
	}
	open.value = false;
}

function preflight(event: Event) {
	if (props.max !== undefined && modelValue.length >= props.max) {
		event.stopImmediatePropagation();
		event.stopPropagation();
		event.preventDefault();
	}
}

defineExpose({
	focus() {
		inputRef.value?.click();
	},
	inputRef,
});
</script>

<template>
	<DSPopover v-model:open="open">
		<div
			@click.capture="preflight"
			role="combobox"
			:aria-expanded="open"
			:class="[
				'h-12 px-3 py-2 flex gap-2 items-center bg-background border rounded-lg',
				props.class,
				open ? 'ring-2 ring-primary' : '',
			]"
			ref="inputRef"
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

			<DSGhostButton
				square
				rounded
				icon="plus"
			/>
		</div>

		<template #content>
			<div class="-m-4">
				<DSCommand
					v-model:search-term="searchTerm"
				>
					<DSCommandInput
						class="h-9"
						:placeholder="placeholder"
						@focus="emit('focus')"
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
			</div>
		</template>
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
