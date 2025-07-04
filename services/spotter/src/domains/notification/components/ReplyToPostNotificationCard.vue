<script setup lang="ts">
import { useUserInformation } from "@/domains/user/composables/useUserInformation";
import type { ReplyToPostNotification } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

interface Props {
	replyToPostNotification: ReplyToPostNotification;
}

const props = defineProps<Props>();
const router = useRouter();
const { lastSeeNotifications } = useUserInformation();

const currentLastSeeNotifications = lastSeeNotifications.value;

function onClick() {
	void router.push(
		postPage.createTo({
			params: {
				postId: props.replyToPostNotification.postId,
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
			<div class="p-2 bg-blue-seaence/20 rounded-full">
				<DSIcon
					name="messageOutline"
					class="text-blue-seaence"
				/>
			</div>

			<div class="flex-1 space-y-2">
				<p class="font-medium">
					<span class="text-blue-seaence">{{ replyToPostNotification.usernameOfReplyPost }}</span>
					{{ $t("notification.replyToPost.repliedToYourPostMessage") }}
				</p>

				<blockquote class="border-l-4 border-blue-seaence/30 pl-4 py-2 bg-blue-seaence/5 rounded-r-md">
					<p class="text-sm text-muted-foreground italic line-clamp-2">
						"{{ replyToPostNotification.summaryOfReplyPost }}"
					</p>
				</blockquote>

				<p class="text-sm text-muted-foreground/60">
					{{ new Date(replyToPostNotification.createdAt).toLocaleDateString() }}
				</p>
			</div>

			<DSBadge
				v-if="Date.parse(replyToPostNotification.createdAt) > currentLastSeeNotifications"
				variant="outline"
				class="self-start"
			>
				{{ $t("notification.status") }}
			</DSBadge>
		</div>
	</DSCard>
</template>
