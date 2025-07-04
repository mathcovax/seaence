<script setup lang="ts">
import type { PostBanNotification } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";

interface Props {
	postBanNotification: PostBanNotification;
}

const props = defineProps<Props>();
const router = useRouter();
const { lastSeeNotifications } = useUserInformation();

const currentLastSeeNotifications = lastSeeNotifications.value;

function onClick() {
	void router.push(
		postPage.createTo({
			params: {
				postId: props.postBanNotification.postId,
			},
		}),
	);
}
</script>

<template>
	<DSCard
		@click="onClick()"
		class="hover:cursor-pointer hover:shadow-md"
	>
		<div class="flex gap-3 items-center">
			<div class="p-2 bg-destructive/20 rounded-full">
				<DSIcon
					name="closeCircle"
					class="text-destructive"
				/>
			</div>

			<div class="flex-1 space-y-2">
				<p class="font-medium text-destructive">
					{{ $t("notification.post.ban") }}
				</p>

				<blockquote class="border-l-4 border-destructive/30 pl-4 py-2 bg-destructive/5 rounded-r-md">
					<p class="text-sm text-muted-foreground italic">
						{{ postBanNotification.reason }}
					</p>
				</blockquote>

				<p class="text-sm text-muted-foreground/60">
					{{ new Date(postBanNotification.createdAt).toLocaleDateString() }}
				</p>
			</div>

			<DSBadge
				v-if="Date.parse(postBanNotification.createdAt) > currentLastSeeNotifications"
				variant="outline"
				class="self-start"
			>
				{{ $t("notification.status") }}
			</DSBadge>
		</div>
	</DSCard>
</template>
