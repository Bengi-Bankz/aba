<script lang="ts" module>
	export type EmitterEventBoardFrame =
		| { type: 'boardFrameGlowShow' }
		| { type: 'boardFrameGlowHide' };
</script>

<script lang="ts">
	import { Graphics, SpineProvider, SpineTrack } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { SYMBOL_SIZE, BOARD_DIMENSIONS } from '../game/constants';

	const context = getContext();
	const SPINE_SCALE = { width: 0.59, height: 0.62 };
	const POSITION_ADJUSTMENT = 1.01;
	
	// Neon frame styling constants
	const NEON_GREEN = 0x1BFD9C;
	const NEON_GREEN_GLOW = 0x82ffc9;
	const BLACK_BACKGROUND = 0x000000;
	const GRID_LINE_WIDTH = 2;
	const BORDER_WIDTH = 4;
	const CORNER_RADIUS = 12;
	const INNER_GLOW_ALPHA = 0.8;
	const OUTER_GLOW_ALPHA = 0.4;

	type AnimationName = 'reelhouse_glow_start' | 'reelhouse_glow_idle' | 'reelhouse_glow_exit';

	let animationName = $state<AnimationName | undefined>(undefined);
	let loop = $state(false);
	let showGlow = $state(false);

	context.eventEmitter.subscribeOnMount({
		boardFrameGlowShow: () => {
			animationName = 'reelhouse_glow_start';
			loop = false;
			showGlow = true;
		},
		boardFrameGlowHide: () => {
			if (animationName) animationName = 'reelhouse_glow_exit';
		},
	});

	// Function to draw the neon board frame with grid
	function drawNeonFrame(graphics: any) {
		const layout = context.stateGameDerived.boardLayout();
		const centerX = 0;
		const centerY = 0;
		
		// Use actual board dimensions from constants
		const BOARD_COLS = BOARD_DIMENSIONS.x; // 6
		const BOARD_ROWS = BOARD_DIMENSIONS.y; // 5
		const BOARD_WIDTH = SYMBOL_SIZE * BOARD_COLS; // 600px
		const BOARD_HEIGHT = SYMBOL_SIZE * BOARD_ROWS; // 500px
		
		graphics.clear();
		
		// Draw outer glow (only when glowing)
		if (showGlow) {
			graphics.roundRect(
				centerX - BOARD_WIDTH / 2 - 10,
				centerY - BOARD_HEIGHT / 2 - 10,
				BOARD_WIDTH + 20,
				BOARD_HEIGHT + 20,
				CORNER_RADIUS + 8
			);
			graphics.fill({ color: NEON_GREEN_GLOW, alpha: OUTER_GLOW_ALPHA * 0.3 });
		}
		
		// Draw black background
		graphics.roundRect(
			centerX - BOARD_WIDTH / 2,
			centerY - BOARD_HEIGHT / 2,
			BOARD_WIDTH,
			BOARD_HEIGHT,
			CORNER_RADIUS
		);
		graphics.fill({ color: BLACK_BACKGROUND, alpha: 0.9 });
		
		// Draw main border
		graphics.roundRect(
			centerX - BOARD_WIDTH / 2,
			centerY - BOARD_HEIGHT / 2,
			BOARD_WIDTH,
			BOARD_HEIGHT,
			CORNER_RADIUS
		);
		graphics.stroke({ 
			width: BORDER_WIDTH, 
			color: showGlow ? NEON_GREEN_GLOW : NEON_GREEN, 
			alpha: showGlow ? 1.0 : 0.8 
		});
		
		// Draw grid lines
		const gridColor = showGlow ? NEON_GREEN_GLOW : NEON_GREEN;
		const gridAlpha = showGlow ? 0.8 : 0.6;
		
		// Vertical grid lines (between columns)
		for (let i = 1; i < BOARD_COLS; i++) {
			const x = centerX - BOARD_WIDTH / 2 + (i * SYMBOL_SIZE);
			graphics.moveTo(x, centerY - BOARD_HEIGHT / 2);
			graphics.lineTo(x, centerY + BOARD_HEIGHT / 2);
		}
		graphics.stroke({ width: GRID_LINE_WIDTH, color: gridColor, alpha: gridAlpha });
		
		// Horizontal grid lines (between rows)
		for (let i = 1; i < BOARD_ROWS; i++) {
			const y = centerY - BOARD_HEIGHT / 2 + (i * SYMBOL_SIZE);
			graphics.moveTo(centerX - BOARD_WIDTH / 2, y);
			graphics.lineTo(centerX + BOARD_WIDTH / 2, y);
		}
		graphics.stroke({ width: GRID_LINE_WIDTH, color: gridColor, alpha: gridAlpha });
		
		// Draw inner glow border (when glowing)
		if (showGlow) {
			graphics.roundRect(
				centerX - BOARD_WIDTH / 2 + 2,
				centerY - BOARD_HEIGHT / 2 + 2,
				BOARD_WIDTH - 4,
				BOARD_HEIGHT - 4,
				CORNER_RADIUS - 2
			);
			graphics.stroke({ 
				width: 2, 
				color: NEON_GREEN_GLOW, 
				alpha: INNER_GLOW_ALPHA 
			});
		}
	}
</script>

{#if animationName}
	<SpineProvider
		zIndex={-1}
		key="reelhouse"
		x={context.stateGameDerived.boardLayout().x * POSITION_ADJUSTMENT}
		y={context.stateGameDerived.boardLayout().y * POSITION_ADJUSTMENT}
		width={context.stateGameDerived.boardLayout().width * SPINE_SCALE.width}
		height={context.stateGameDerived.boardLayout().height * SPINE_SCALE.height}
	>
		<SpineTrack
			trackIndex={0}
			{animationName}
			{loop}
			listener={{
				complete: (entry) => {
					if (entry.animation) {
						if (entry.animation.name === 'reelhouse_glow_start') {
							animationName = 'reelhouse_glow_idle';
							loop = true;
						}

						if (entry.animation.name === 'reelhouse_glow_exit') {
							animationName = undefined;
							loop = false;
							showGlow = false;
						}
					}
				},
			}}
		/>
	</SpineProvider>
{/if}

<!-- Neon board frame drawn with Graphics -->
<Graphics
	x={context.stateGameDerived.boardLayout().x * POSITION_ADJUSTMENT}
	y={context.stateGameDerived.boardLayout().y * POSITION_ADJUSTMENT}
	draw={drawNeonFrame}
/>
