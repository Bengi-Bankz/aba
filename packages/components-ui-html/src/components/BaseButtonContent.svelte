
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ACCENT_PRIMARY } from 'constants-shared/colors';

	type Props = {
		children: Snippet;
	};

	const props: Props = $props();
</script>


<div class="base-button-content" style={`color: #${ACCENT_PRIMARY.toString(16)}; font-family: 'BungeeSpice', cursive;`}> 
	{@render props.children()}
</div>

<style lang="scss">
	.base-button-content {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
