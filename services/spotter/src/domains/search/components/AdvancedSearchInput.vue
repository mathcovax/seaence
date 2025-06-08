<script setup lang="ts">
import type { OperatorContent } from "@vendors/types-advanced-query";
import TheScratch from "./scratch/TheScratch.vue";
import type { BakedDocumentLanguage } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { bakedDocumentLanguageEnum } from "@/lib/horizon/types/bakedDocument";

const modelValue = defineModel<
	OperatorContent | null
>(
	{ required: true },
);
const modelLanguage = defineModel<BakedDocumentLanguage>(
	"language",
	{
		required: true,
	},
);

const emit = defineEmits<{ submit: [] }>();

const scratchRef = ref<InstanceType<typeof TheScratch> | null>(null);

function checkFields(disabledHint = false) {
	return !!scratchRef.value?.checkFields(disabledHint);
}

defineExpose({
	checkFields,
});

function onSubmit() {
	if (checkFields()) {
		emit("submit");
	}
}
</script>

<template>
	<form
		class="flex flex-col gap-4"
		@submit.prevent="onSubmit"
	>
		<div class="flex gap-4">
			<DSPrimaryButton type="submit">
				{{ $t("cta.search") }}
			</DSPrimaryButton>

			<DSSelect
				v-model="modelLanguage"
				:label="item => item"
				:items="bakedDocumentLanguageEnum.toTuple()"
				class="w-23"
				@click="$event.stopPropagation()"
			/>
		</div>

		<TheScratch
			ref="scratchRef"
			class="w-full p-0 lg:p-2 bg-slate-50 border rounded-md border-dashed border-slate-300"
			v-model="modelValue"
		/>
	</form>
</template>
