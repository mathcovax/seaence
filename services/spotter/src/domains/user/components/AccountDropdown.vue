<script setup lang="ts">
import NotificationIcon from "@/domains/notification/components/NotificationIcon.vue";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";

const { disconect } = useUserInformation();

// TODO: Replace with real sate
const isNewNotification = ref(true);
</script>

<template>
	<DSDropdownMenu>
		<DSDropdownMenuTrigger>
			<div class="relative">
				<NotificationIcon
					v-if="isNewNotification"
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
			<DSDropdownMenuItem>
				<RouterLink
					:to="profilePage"
					class="w-full"
				>
					{{ $t("layout.base.header.accountDropdown.profile") }}
				</RouterLink>
			</DSDropdownMenuItem>

			<DSDropdownMenuItem>
				<div class="w-full flex items-center">
					<RouterLink
						:to="notificationListPage"
						class="w-full"
					>
						{{ $t("layout.base.header.accountDropdown.notification") }}
					</RouterLink>

					<NotificationIcon
						v-if="isNewNotification"
					/>
				</div>
			</DSDropdownMenuItem>

			<DSDropdownMenuItem>
				<RouterLink :to="documentFolderPage.createTo()">
					{{ $t("layout.base.header.accountDropdown.documentFolder") }}
				</RouterLink>
			</DSDropdownMenuItem>

			<DSDropdownMenuSeparator />

			<DSDropdownMenuItem @click="disconect">
				<span class="w-full cursor-pointer">{{ $t("layout.base.header.accountDropdown.disconnect") }}</span>
			</DSDropdownMenuItem>
		</DSDropdownMenuContent>
	</DSDropdownMenu>
</template>
