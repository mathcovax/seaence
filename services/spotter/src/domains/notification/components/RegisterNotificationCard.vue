<script setup lang="ts">

import type { RegisterNotification } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

interface Props {
	registerNotification: RegisterNotification;
}

defineProps<Props>();

</script>

<template>
	<DSCard>
		<div class="flex gap-3 items-center">
			<div class="p-2 bg-blue-seaence/20 rounded-full">
				<DSIcon
					name="account"
					class="text-blue-seaence"
				/>
			</div>

			<div class="flex-1">
				<p class="font-medium">
					{{ $t("notification.register.content") }}
				</p>

				<p class="text-sm text-muted-foreground">
					{{ new Date(registerNotification.createdAt).toLocaleDateString() }}
				</p>
			</div>

			<DSBadge
				v-if="!registerNotification.processed"
				variant="outline"
				class="self-start"
			>
				{{ $t("notification.status") }}
			</DSBadge>
		</div>
	</DSCard>
</template>
