<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue"

import profileImage from "@/assets/img/HrnyGranny.png"
import Button from "@/components/ui/Button.vue"
import Toggle from "@/components/ui/Toggle.vue"

const isScrolled = ref(false)

const handleScroll = () => {
	isScrolled.value = window.scrollY > 180
}

const openGitHub = () => {
	window.open(
		"https://github.com/HrnyGranny",
		"_blank",
		"noopener,noreferrer",
	)
}

const isDarkMode = ref(false)

const applyTheme = (isDark) => {
	document.documentElement.dataset.theme = isDark ? "dark" : "light"
}

watch(isDarkMode, (isDark) => {
	applyTheme(isDark)
	localStorage.setItem("theme", isDark ? "dark" : "light")
})

onMounted(() => {
	handleScroll()
	window.addEventListener("scroll", handleScroll, { passive: true })

	isDarkMode.value = localStorage.getItem("theme") === "dark"
	applyTheme(isDarkMode.value)
})

onBeforeUnmount(() => {
	window.removeEventListener("scroll", handleScroll)
})
</script>

<template>
	<nav
		class="home__navbar"
		:class="{ 'home__navbar--visible': isScrolled }"
		aria-label="Main navigation"
	>
		<a class="home__brand" href="#home">
			<img
				class="home__brand-icon"
				:src="profileImage"
				alt="HrnyGranny logo"
			/>

			<span>HrnyGranny</span>
		</a>

		<div class="home__links">
			<a href="#projects">
				Projects
			</a>

			<a href="#about">
				About Me
			</a>
		</div>

		<div class="home__actions">
			<Toggle
				v-model="isDarkMode"
				class="home__theme-toggle"
			/>

			<div class="home__github-button">
				<Button
					aria-label="Open GitHub profile"
					@click="openGitHub"
				>
					<svg
						class="home__github-icon"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							fill="currentColor"
							d="M12 2C6.48 2 2 6.58 2 12.22c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.34 1.12 2.91.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 6.96c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.23 10.23 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z"
						/>
					</svg>
				</Button>
			</div>
		</div>
	</nav>
</template>

<style scoped>
.home__navbar {
	position: fixed;
	z-index: 50;
	top: 16px;
	left: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: min(calc(100% - 32px), 1000px);
	padding: 10px 14px;
	background-color: color-mix(in srgb, var(--ui-surface) 96%, transparent);
	border: 2px solid var(--ui-ink);
	opacity: 0;
	pointer-events: none;
	transform: translate(-50%, -24px);
	box-shadow:
		0 -4px rgba(0, 0, 0, 0.25) inset,
		0 4px rgba(255, 255, 255, 0.65) inset,
		0 6px 0 rgba(0, 0, 0, 0.3);
	transition:
		opacity 220ms ease,
		transform 220ms ease;
}

.home__navbar--visible {
	opacity: 1;
	pointer-events: auto;
	transform: translate(-50%, 0);
}

.home__brand {
	display: flex;
	align-items: center;
	gap: 10px;
	color: var(--ui-ink);
	font-family: var(--ui-font-display);
	font-size: 11px;
	text-decoration: none;
}

.home__brand-icon {
	width: 34px;
	height: 34px;
	object-fit: contain;
}

.home__links {
	position: absolute;
	left: 50%;
	display: flex;
	align-items: center;
	gap: 18px;
	transform: translateX(-50%);
}

.home__links a {
	color: var(--ui-muted);
	font-family: var(--ui-font-label);
	font-size: 11px;
	text-decoration: none;
	text-transform: uppercase;
}

.home__links a:hover {
	color: var(--ui-primary);
}

.home__actions {
	display: flex;
	align-items: center;
	flex-shrink: 0;
	gap: 12px;
}

.home__github-button :deep(.ui-btn) {
	min-height: 40px;
	padding: 10px 14px;
	font-size: 10px;
}

.home__github-icon {
	display: block;
	width: 18px;
	height: 18px;
}

@media (max-width: 600px) {
	.home__navbar {
		top: 8px;
		width: calc(100% - 16px);
	}

	.home__brand span {
		display: none;
	}

	.home__actions {
		gap: 8px;
	}

	.home__links {
		position: static;
		gap: 8px;
		margin: 0 auto;
		transform: none;
	}

	.home__links a {
		font-size: 9px;
	}

	.home__github-button :deep(.ui-btn) {
		padding: 9px 10px;
		font-size: 9px;
	}

}

@media (prefers-reduced-motion: reduce) {
	.home__navbar {
		transition: none;
	}
}
</style>
