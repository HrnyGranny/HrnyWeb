<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
	<footer class="home__footer">
		<span>© {{ currentYear }} HrnyGranny</span>
		<span>Built with Vue</span>
	</footer>
</template>

<style scoped>
.home__footer {
	display: flex;
	justify-content: space-between;
	gap: 20px;
	width: min(calc(100% - 40px), 1000px);
	margin: 0 auto;
	padding: 28px 0;
	color: #a79f83;
	border-top: 2px dashed rgba(251, 245, 221, 0.25);
	font-family: "Silkscreen", monospace;
	font-size: 10px;
	text-transform: uppercase;
}

@media (max-width: 600px) {
	.home__footer {
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
}
</style>
