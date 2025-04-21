<script setup lang="ts">
import { type ComparatorText, textFieldEnum } from "@vendors/scratch-type";
import DraggableComparator from "./DraggableComparator.vue";

const emit = defineEmits<{ remove: [] }>();
const model = defineModel<ComparatorText>({ required: true });
</script>

<template>
	<DraggableComparator
		class="flex flex-col gap-1 bg-secondary p-1 rounded-l-sm"
		:comparator="model"
		@deplace="emit('remove')"
	>
		<div class="flex justify-between">
			<p>{{ $t('scratch.comparator.text.label') }}</p>

			<DSIcon
				name="close"
				@click="emit('remove')"
			/>
		</div>

		<div class="flex gap-1">
			<DSSelect
				class="w-1/2"
				:items="textFieldEnum.toTuple()"
				:placeholder="$t('scratch.comparator.text.selectPlaceholder')"
				v-model="model.field"
			/>

			<DSInput
				class="w-1/2"
				v-model="model.value"
			/>
		</div>
	</DraggableComparator>
</template>
