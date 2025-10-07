<script lang="ts" module>
	export type EmitterEventMultiplierBoard =
		| { type: 'multiplierBoardShow' }
		| { type: 'multiplierBoardHide' }
		| { type: 'multiplierBoardInit' }
		| { type: 'multiplierBoardReset' }
		| { type: 'multiplierBoardAnimate' };
</script>

<script lang="ts">
	import _ from 'lodash';
	import { Tween } from 'svelte/motion';
	import { quartInOut } from 'svelte/easing';

	import { waitForResolve } from 'utils-shared/wait';
	import { waitForTimeout } from 'utils-shared/wait';
	import { Sprite } from 'pixi-svelte';

	import MultiplierBoardBase from './MultiplierBoardBase.svelte';
	import BoardContainer from './BoardContainer.svelte';
	import UnifiedMultiplierBomb from './UnifiedMultiplierBomb.svelte';
	import { getContext } from '../game/context';
	import type { RawSymbol, SymbolState } from '../game/types';
	import { getSymbolX, getSymbolY } from '../game/utils';

	const context = getContext();

	// Define the bomb type explicitly
	type BombType = {
		id: number;
		multiplierValue: number;
		x: number;
		y: number;
		isActive: boolean;
		backdropScale: number;
		showBackdrop: boolean;
		startTicking: boolean;
	};

	let show = $state(false);
	let unifiedBombs = $state<BombType[]>([]);
	let completedBombs = $state<number[]>([]);
	let currentAnimatingBombs = $state<number[]>([]);
	let animationSequenceRunning = $state(false);

	const createMultiplierSymbol = ({
		rawSymbol,
		reelIndex,
		symbolIndex,
		reelLength,
	}: {
		rawSymbol: RawSymbol;
		reelIndex: number;
		symbolIndex: number;
		reelLength: number;
	}) => {
		if (rawSymbol.name === 'M' && symbolIndex > 0 && symbolIndex < reelLength - 1) {
			const initX = getSymbolX(reelIndex);
			const initY = getSymbolY(symbolIndex - 1);
			const symbolX = new Tween(initX);
			const symbolY = new Tween(initY);
			const symbolState = 'win' as SymbolState;
			const oncomplete = () => {};

			const multiplierSymbol = $state({
				initX,
				initY,
				symbolX,
				symbolY,
				rawSymbol,
				symbolState,
				oncomplete,
			});

			return multiplierSymbol;
		}

		return undefined;
	};

	const initMultiplierBoard = () => {
		return context.stateGameDerived.boardRaw().map((rawSymbols, reelIndex) => {
			return rawSymbols.map((rawSymbol, symbolIndex) =>
				createMultiplierSymbol({
					rawSymbol,
					reelIndex,
					symbolIndex,
					reelLength: rawSymbols.length,
				}),
			);
		});
	};

	// Function to animate backdrop scale in 4 steps with proper typing
	const animateBackdrop = async (bomb: BombType): Promise<void> => {
		const frameCount = 15;
		const startScale = 0.5;
		const endScale = 2;
		const stepDuration = 50; // ms per frame for a faster animation

		// Generate 15 scale steps from 0.5 to 2
		const scaleSteps = Array.from({ length: frameCount }, (_, i) =>
			startScale + ((endScale - startScale) * i) / (frameCount - 1),
		);

		bomb.showBackdrop = true;

		for (const scale of scaleSteps) {
			bomb.backdropScale = scale;
			await waitForTimeout(stepDuration);
		}

		// Small pause before starting tick animation
		await waitForTimeout(100);
		bomb.startTicking = true;
	};

	context.eventEmitter.subscribeOnMount({
		multiplierBoardShow: () => {
			console.log('🎯 MultiplierBoard SHOW event received');
			show = true;
		},
		multiplierBoardHide: () => {
			console.log('🎯 MultiplierBoard HIDE event received');
			show = false;
		},
		multiplierBoardInit: () => {
			console.log('🎯 MultiplierBoard INIT event received');
			// Scan for M symbols and create unified bombs
			const bombs: BombType[] = [];
			let bombId = 0;

			context.stateGameDerived.boardRaw().forEach((rawSymbols, reelIndex) => {
				rawSymbols.forEach((rawSymbol, symbolIndex) => {
					if (rawSymbol.name === 'M' && symbolIndex > 0 && symbolIndex < rawSymbols.length - 1) {
						// Get the multiplier value from the symbol
						const multiplierValue = rawSymbol.multiplier || 2;
						
						bombs.push({
							id: bombId++,
							multiplierValue,
							x: getSymbolX(reelIndex),
							y: getSymbolY(symbolIndex - 1),
							isActive: false,
							backdropScale: 0.2,
							showBackdrop: false,
							startTicking: false,
						});
					}
				});
			});

			unifiedBombs = bombs;
			console.log(`🎯 Initialized ${bombs.length} unified bombs:`, bombs);
			
			// Keep the original multiplier board for compatibility
			context.stateGame.multiplierBoard = initMultiplierBoard();
		},
		multiplierBoardReset: () => {
			context.stateGame.multiplierBoard = [];
			unifiedBombs = [];
			completedBombs = [];
			currentAnimatingBombs = [];
			animationSequenceRunning = false;
		},
		multiplierBoardAnimate: async () => {
			// NEW: Use unified bomb animations instead of regular symbol animations
			if (unifiedBombs.length === 0) {
				console.log('⚠️ No unified bombs to animate');
				return;
			}

			console.log('🎬 Starting unified bomb animation sequence...', unifiedBombs);
			animationSequenceRunning = true;
			completedBombs = [];

			// Animate bombs one after the other (consecutive, not simultaneous)
			for (let i = 0; i < unifiedBombs.length; i++) {
				const bomb = unifiedBombs[i];
				console.log(`🎯 Animating bomb ${i + 1}/${unifiedBombs.length} (${bomb.multiplierValue}X) at position (${bomb.x}, ${bomb.y})`);
				
				// Start backdrop animation first
				bomb.isActive = true;
				currentAnimatingBombs = [bomb.id];
				
				// Animate backdrop in 4 steps, then start ticking
				await animateBackdrop(bomb);
				
				// Wait for this bomb to complete its full sequence
				await waitForBombCompletion(bomb.id);
				console.log(`✅ Bomb ${i + 1} animation completed`);
				
				// Brief pause between bombs
				await waitForTimeout(300);
			}

			console.log('🎉 All unified bomb animations completed!');
			animationSequenceRunning = false;
		},
	});

	// Helper function to wait for a specific bomb to complete
	const waitForBombCompletion = (bombId: number): Promise<void> => {
		return new Promise((resolve) => {
			const checkCompletion = () => {
				if (completedBombs.includes(bombId)) {
					resolve();
				} else {
					setTimeout(checkCompletion, 50);
				}
			};
			checkCompletion();
		});
	};

	// Handle bomb completion callbacks
	const handleBombComplete = (bombId: number) => {
		console.log(`✅ Bomb ${bombId} completed its sequence`);
		completedBombs = [...completedBombs, bombId];
		currentAnimatingBombs = currentAnimatingBombs.filter(id => id !== bombId);
	};
</script>

{#if show}
	<BoardContainer>
		<!-- OLD MultiplierBoardBase disabled - using unified bomb system -->
		<!-- <MultiplierBoardBase /> -->
		
		<!-- Render all unified bombs -->
		{#each unifiedBombs as bomb (bomb.id)}
			{#if bomb.isActive}
				<!-- Backdrop sprite that scales up in 4 steps -->
				{#if bomb.showBackdrop}
					<Sprite 
						key="multitick"
						x={bomb.x}
						y={bomb.y}
						anchor={{ x: 0.5, y: 0.5 }}
						width={300 * bomb.backdropScale}
						height={300 * bomb.backdropScale}
					/>
				{/if}
				
				<!-- Multiplier bomb animation on top -->
				{#if bomb.startTicking}
					<UnifiedMultiplierBomb 
						x={bomb.x}
						y={bomb.y}
						multiplierValue={bomb.multiplierValue}
						autoStart={true}
						onComplete={() => handleBombComplete(bomb.id)}
					/>
				{/if}
			{/if}
		{/each}
	</BoardContainer>
{/if}
