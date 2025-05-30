<script setup lang="ts">
import { postPage } from "@/domains/post/router";

interface Props {
	isProcessing: boolean;
	showRejectForm: boolean;
	rejectReason: string;
	actionType: "warning" | "block";
	rejectReasons: string[];
}

interface Emits {
	approve: [];
	reject: [];
	confirmReject: [];
	cancelReject: [];
	"update:rejectReason": [value: string];
	"update:actionType": [value: "warning" | "block"];
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const { t } = useI18n();
const { $pt } = postPage.use();

function handleApprove() {
	emit("approve");
}

function handleReject() {
	emit("reject");
}

function handleConfirmReject() {
	emit("confirmReject");
}

function handleCancelReject() {
	emit("cancelReject");
}

function updateRejectReason(value: unknown) {
	if (typeof value === "string") {
		emit("update:rejectReason", value);
	}
}

function updateActionType(value: string) {
	if (value === "warning" || value === "block") {
		emit("update:actionType", value);
	}
}
</script>

<template>
	<div class="p-6 border-t bg-gray-50 border-border">
		<div
			v-if="!showRejectForm"
			class="flex gap-4 items-center"
		>
			<DSButtonPrimary
				@click="handleApprove"
				:disabled="isProcessing"
				class="flex gap-2 items-center"
			>
				<DSIcon
					name="check"
					size="small"
				/>
				{{ t("cta.approuve") }}
			</DSButtonPrimary>

			<DSButtonDestructive
				@click="handleReject"
				:disabled="isProcessing"
				class="flex gap-2 items-center"
			>
				<DSIcon
					name="close"
					size="small"
				/>
				{{ t("cta.reject") }}
			</DSButtonDestructive>

			<div
				v-if="isProcessing"
				class="flex gap-2 items-center text-muted-foreground"
			>
				<div class="size-4 border-b-2 border-blue-seaence rounded-full animate-spin" />

				<span>{{ $pt("isProssessing") }}</span>
			</div>
		</div>

		<div
			v-else
			class="space-y-4"
		>
			<h3 class="text-lg font-medium">
				{{ $pt("rejectModal.title") }}
			</h3>

			<div class="space-y-3">
				<DSLabel class="block text-sm font-medium">
					{{ $pt("rejectModal.reason.title") }}
				</DSLabel>

				<DSSelect
					:model-value="rejectReason"
					@update:model-value="updateRejectReason"
					:items="rejectReasons"
					:placeholder="$pt('rejectModal.reason.placeholder')"
					:label="(item) => item"
					class="w-full"
				/>
			</div>

			<div class="space-y-3">
				<DSLabel class="block text-sm font-medium">
					{{ $pt("rejectModal.action.title") }}
				</DSLabel>

				<RadioGroup
					:model-value="actionType"
					@update:model-value="updateActionType"
					class="space-y-2"
				>
					<div class="flex items-center space-x-2">
						<RadioGroupItem
							value="warning"
							id="warning"
						/>

						<DSLabel
							for="warning"
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							{{ $pt("rejectModal.action.type.warning") }}
						</DSLabel>
					</div>

					<div class="flex items-center space-x-2">
						<RadioGroupItem
							value="block"
							id="block"
						/>

						<DSLabel
							for="block"
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							{{ $pt("rejectModal.action.type.block") }}
						</DSLabel>
					</div>
				</RadioGroup>
			</div>

			<div class="pt-4 flex gap-3 items-center">
				<DSButtonDestructive
					@click="handleConfirmReject"
					:disabled="!rejectReason || isProcessing"
					class="flex items-center gap-2"
				>
					<DSIcon
						name="send"
						size="small"
					/>
					{{ $pt("rejectModal.confirm") }}
				</DSButtonDestructive>

				<DSButtonOutline
					@click="handleCancelReject"
					:disabled="isProcessing"
				>
					{{ t("cta.cancel") }}
				</DSButtonOutline>
			</div>
		</div>
	</div>
</template>
