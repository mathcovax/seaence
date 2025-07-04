<script setup lang="ts">
import type { AnswerBanNotification } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";

interface Props {
	answerBanNotification: AnswerBanNotification;
}

const props = defineProps<Props>();
const router = useRouter();
const { lastSeeNotifications } = useUserInformation();

const currentLastSeeNotifications = lastSeeNotifications.value;

function onClick() {
	void router.push(
		postPage.createTo({
			params: {
				postId: props.answerBanNotification.postId,
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
			<div class="p-2 bg-destructive/20 rounded-full">
				<DSIcon
					name="commentRemove"
					class="text-destructive"
				/>
			</div>

			<div class="flex-1 space-y-2">
				<p class="font-medium text-destructive">
					{{ $t("notification.answer.ban") }}
				</p>

				<blockquote class="border-l-4 border-destructive/30 pl-4 py-2 bg-destructive/5 rounded-r-md">
					<p class="text-sm text-muted-foreground italic">
						{{ answerBanNotification.reason }}
					</p>
				</blockquote>

				<p class="text-sm text-muted-foreground/60">
					{{ new Date(answerBanNotification.createdAt).toLocaleDateString() }}
				</p>
			</div>

			<DSBadge
				v-if="Date.parse(answerBanNotification.createdAt) > currentLastSeeNotifications"
				variant="outline"
				class="self-start"
			>
				{{ $t("notification.status") }}
			</DSBadge>
		</div>
	</DSCard>
</template>
