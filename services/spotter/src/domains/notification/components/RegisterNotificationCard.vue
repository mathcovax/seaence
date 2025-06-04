<script setup lang="ts">

import type { RegisterNotification } from "@/lib/horizon/types/notification";

interface Props {
	registerNotification: RegisterNotification;
}

defineProps<Props>();

</script>

<template>
	<DSCard class="w-full">
		<div class="p-4 flex items-center gap-3">
			<div class="bg-blue-100 p-2 rounded-full">
				<DSIcon
					name="account"
					class="text-blue-seaence h-5 w-5"
				/>
			</div>

			<div class="flex-1">
				<p class="font-medium">
					<span class="text-blue-seaence">{{ registerNotification.user.username }}</span>
					{{ $t("notification.register.content") }}
				</p>

				<p class="text-sm text-gray-500">
					{{ new Date(registerNotification.createdAt).toLocaleDateString() }}
				</p>
			</div>

			<DSBadge
				v-if="!registerNotification.processed"
				variant="outline"
				class="bg-blue-50"
			>
				{{ $t("notification.status") }}
			</DSBadge>
		</div>
	</DSCard>
</template>
