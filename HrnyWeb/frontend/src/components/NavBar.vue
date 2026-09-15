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
		"https://github.com/TU-USUARIO",
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
				About
			</a>
		</div>

		<div class="home__actions">
			<Toggle
				v-model="isDarkMode"
				class="home__theme-toggle"
			/>

			<div class="home__github-button">
				<Button @click="openGitHub">
					GitHub
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
	font-family: "Press Start 2P", monospace;
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
	font-family: "Silkscreen", monospace;
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
