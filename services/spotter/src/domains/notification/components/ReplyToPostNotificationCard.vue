<script setup lang="ts">

import type { ReplyToPostNotification } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

interface Props {
	replyToPostNotification: ReplyToPostNotification;
}

defineProps<Props>();

const emit = defineEmits<{ click: [] }>();

function onClick() {
	emit("click");
}

</script>

<template>
	<DSCard
		class="w-full hover:bg-gray-50 cursor-pointer"
		@click="onClick()"
	>
		<div class="p-4 flex items-center gap-3">
			<div class="bg-green-100 p-2 rounded-full">
				<DSIcon
					name="messageOutline"
					class="text-green-600 h-5 w-5"
				/>
			</div>

			<div class="flex-1">
				<p class="font-medium">
					<span class="text-blue-seaence">{{ replyToPostNotification.usernameOfReplyPost }}</span>
					{{ $t("notification.replyToPost.repliedToYourPostMessage") }}
				</p>

				<p class="text-sm text-gray-600 line-clamp-2 mt-1">
					"{{ replyToPostNotification.summaryOfReplyPost }}"
				</p>

				<p class="text-sm text-gray-500 mt-1">
					{{ new Date(replyToPostNotification.createdAt).toLocaleDateString() }}
				</p>
			</div>

			<DSBadge
				v-if="!replyToPostNotification.processed"
				variant="outline"
				class="bg-green-50"
			>
				{{ $t("notification.status") }}
			</DSBadge>
		</div>
	</DSCard>
</template>
