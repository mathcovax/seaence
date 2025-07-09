<script setup lang="ts">
import NotificationHint from "@/domains/notification/components/NotificationHint.vue";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";

const { disconect, hasNewNotifications } = useUserInformation();

</script>

<template>
	<DSDropdownMenu>
		<DSDropdownMenuTrigger>
			<div class="relative">
				<NotificationHint
					v-if="hasNewNotifications"
					class="absolute right-0"
				/>

				<DSOutlineButton
					square
					rounded
				>
					<DSIcon name="account" />
				</DSOutlineButton>
			</div>
		</DSDropdownMenuTrigger>

		<DSDropdownMenuContent align="end">
			<DSDropdownMenuItem as-child>
				<RouterLink
					:to="profilePage"
					class="w-full"
				>
					{{ $t("layout.base.header.accountDropdown.profile") }}
				</RouterLink>
			</DSDropdownMenuItem>

			<DSDropdownMenuItem as-child>
				<div class="w-full flex items-center">
					<RouterLink
						:to="notificationListPage"
						class="w-full"
					>
						{{ $t("layout.base.header.accountDropdown.notification") }}
					</RouterLink>

					<NotificationHint
						v-if="hasNewNotifications"
					/>
				</div>
			</DSDropdownMenuItem>

			<DSDropdownMenuItem as-child>
				<RouterLink :to="documentFolderPage.createTo()">
					{{ $t("layout.base.header.accountDropdown.documentFolder") }}
				</RouterLink>
			</DSDropdownMenuItem>

			<DSDropdownMenuSeparator />

			<DSDropdownMenuItem @click="disconect">
				{{ $t("layout.base.header.accountDropdown.disconnect") }}
			</DSDropdownMenuItem>
		</DSDropdownMenuContent>
	</DSDropdownMenu>
</template>
