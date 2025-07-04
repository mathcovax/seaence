<script setup lang="ts">
import type { AnswerWarningNotification } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";

interface Props {
	answerWarningNotification: AnswerWarningNotification;
}

const props = defineProps<Props>();
const router = useRouter();
const { lastSeeNotifications } = useUserInformation();

const currentLastSeeNotifications = lastSeeNotifications.value;

function onClick() {
	void router.push(
		postPage.createTo({
			params: {
				postId: props.answerWarningNotification.postId,
			},
		}),
	);
}
</script>

<template>
	<DSCard
		@click="onClick()"
		class="hover:cursor-pointer"
	>
		<div class="flex gap-3 items-center">
			<div class="p-2 bg-warning/20 rounded-full">
				<DSIcon
					name="commentAlert"
					class="text-warning"
				/>
			</div>

			<div class="flex-1 space-y-2">
				<p class="font-medium text-warning">
					{{ $t("notification.answer.warning") }}
				</p>

				<blockquote class="border-l-4 warning/30 pl-4 py-2 bg-warning/5 rounded-r-md">
					<p class="text-sm text-muted-foreground italic">
						{{ answerWarningNotification.reason }}
					</p>
				</blockquote>

				<p class="text-sm text-muted-foreground/60">
					{{ new Date(answerWarningNotification.createdAt).toLocaleDateString() }}
				</p>
			</div>

			<DSBadge
				v-if="Date.parse(answerWarningNotification.createdAt) > currentLastSeeNotifications"
				variant="outline"
				class="self-start"
			>
				{{ $t("notification.status") }}
			</DSBadge>
		</div>
	</DSCard>
</template>
