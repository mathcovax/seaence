<script setup lang="ts">
const discordInvitLink = "https://discord.gg/hErxVKfU9q";
</script>

<template>
	<footer class="bg-background">
		<div class="container py-8">
			<nav>
				<ul class="text-sm flex gap-2 md:gap-4">
					<li>
						<RouterLink
							:to="cguPage"
							class="hover:text-primary"
						>
							{{ $t("layout.base.footer.nav.conditions") }}
						</RouterLink>
					</li>

					<li>
						<a
							:href="discordInvitLink"
							target="_blank"
							class="hover:text-primary"
						>
							{{ $t("layout.base.footer.nav.discord") }}
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</footer>
</template>
