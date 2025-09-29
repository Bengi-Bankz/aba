<script lang="ts">
	import { Sprite } from 'pixi-svelte';
	import { SYMBOL_SIZE } from '../game/constants';

	type Props = {
		x?: number;
		y?: number;
		symbolInfo: { sizeRatios: { width: number; height: number } };
		alpha?: number;
	};

	const {
		x = 0,
		y = 0,
		symbolInfo,
		alpha = 1,
	}: Props = $props();

	// Just render the first frame of H1 character animation (frame 14)
	const staticFrameKey = 'h1CharAnimate14';
</script>

<Sprite
	key={staticFrameKey}
	x={x}
	y={y}
	anchor={0.5}
	width={SYMBOL_SIZE * symbolInfo.sizeRatios.width}
	height={SYMBOL_SIZE * symbolInfo.sizeRatios.height}
	{alpha}
/>