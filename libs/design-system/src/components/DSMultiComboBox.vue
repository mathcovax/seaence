<script setup lang="ts" generic="GenericItem extends object">
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

function removeTag(removedItem: GenericItem) {
	console.log(removedItem);

	modelValue.value = modelValue.value.filter((item) => item !== removedItem);
}

function onSelect(selectedItem: GenericItem) {
	if (modelValue.value.find((item) => item === selectedItem)) {
		return;
	}
	modelValue.value = [...modelValue.value, selectedItem];
	open.value = false;
}

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

</script>

<template>
	<DSPopover v-model:open="open">
		<DSPopoverTrigger as-child>
			<DSButton
				variant="outline"
				role="combobox"
				:aria-expanded="open"
				:class="`${props.class} !px-2 !py-0 flex gap-2`"
			>
				<div class="w-full justify-start flex overflow-y-hidden overflow-x-auto gap-2 py-2">
					<DSClosingTag
						v-for="(item, index) of modelValue"
						:key="getKey(item) ?? index"
						@close="removeTag(item)"
						@click="$event.stopPropagation()"
					>
						{{ getLabel(item) }}
					</DSClosingTag>
				</div>

				<DSIcon name="plus" />
			</DSButton>
		</DSPopoverTrigger>

		<DSPopoverContent class="p-0">
			<DSCommand
				v-model="searchTerm"
			>
				<DSCommandInput
					class="h-9"
					:placeholder="placeholder"
				/>

				<DSCommandEmpty>{{ emptyLabel }}</DSCommandEmpty>

				<DSCommandList>
					<DSCommandGroup>
						<DSCommandItem
							v-for="(item, index) in items"
							:key="getKey(item) ?? index"
							:value="item"
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
::-webkit-scrollbar {
	height: 0px;
}
</style>
