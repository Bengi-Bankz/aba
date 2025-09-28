<script lang="ts">
	import type { Snippet } from 'svelte';

	import { BitmapText, Container, Sprite, Graphics, type Sizes } from 'pixi-svelte';

	import { SYMBOL_SIZE } from '../game/constants';

	type Props = {
		children: Snippet<[{ frameSizes: Sizes }]>;
	};

	const props: Props = $props();
	const TITLE_KEY = 'Frame_TumbleWin.png';
	const TITLE_RATIO = 532 / 143;
	const TITLE_HEIGHT = SYMBOL_SIZE * 0.28;
	const TITLE_SIZES = {
		width: TITLE_HEIGHT * TITLE_RATIO,
		height: TITLE_HEIGHT,
	};

	const PANEL_KEY = 'Frame_Tumble.png';
	const PANEL_RATIO = 1442 / 374;
	const PANEL_HEIGHT = SYMBOL_SIZE * 0.8;
	const PANEL_SIZES = {
		width: PANEL_HEIGHT * PANEL_RATIO,
		height: PANEL_HEIGHT,
	};

	// Background styling constants (matching BoardFrame)
	const NEON_GREEN = 0x1BFD9C;
	const BLACK_BACKGROUND = 0x000000;
	const BORDER_WIDTH = 3;
	const CORNER_RADIUS = 8;

	// Function to draw the neon background for main panel
	function drawMainBackground(graphics: any) {
		graphics.clear();
		
		// Draw black background
		graphics.roundRect(
			-PANEL_SIZES.width / 2,
			-PANEL_SIZES.height / 2,
			PANEL_SIZES.width,
			PANEL_SIZES.height,
			CORNER_RADIUS
		);
		graphics.fill({ color: BLACK_BACKGROUND, alpha: 0.9 });
		
		// Draw neon border
		graphics.roundRect(
			-PANEL_SIZES.width / 2,
			-PANEL_SIZES.height / 2,
			PANEL_SIZES.width,
			PANEL_SIZES.height,
			CORNER_RADIUS
		);
		graphics.stroke({ 
			width: BORDER_WIDTH, 
			color: NEON_GREEN, 
			alpha: 0.8 
		});
	}

	// Function to draw the neon background for title
	function drawTitleBackground(graphics: any) {
		graphics.clear();
		
		// Draw black background
		graphics.roundRect(
			-TITLE_SIZES.width / 2,
			-TITLE_SIZES.height / 2,
			TITLE_SIZES.width,
			TITLE_SIZES.height,
			CORNER_RADIUS / 2
		);
		graphics.fill({ color: BLACK_BACKGROUND, alpha: 0.9 });
		
		// Draw neon border
		graphics.roundRect(
			-TITLE_SIZES.width / 2,
			-TITLE_SIZES.height / 2,
			TITLE_SIZES.width,
			TITLE_SIZES.height,
			CORNER_RADIUS / 2
		);
		graphics.stroke({ 
			width: BORDER_WIDTH - 1, 
			color: NEON_GREEN, 
			alpha: 0.8 
		});
	}
</script>

<!-- Main panel background -->
<Graphics draw={drawMainBackground} />

<Container y={-TITLE_HEIGHT * 1.2}>
	<!-- Title background -->
	<Graphics draw={drawTitleBackground} />
	<BitmapText
		anchor={0.5}
		y={-TITLE_HEIGHT * 0.025}
		text="TUMBLE WIN"
		style={{ fontFamily: 'gold', fontSize: TITLE_HEIGHT * 0.45 }}
	/>
</Container>

{@render props.children({ frameSizes: PANEL_SIZES })}
