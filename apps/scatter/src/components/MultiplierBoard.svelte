<script lang="ts" module>
	export type EmitterEventMultiplierBoard =
		| { type: 'multiplierBoardShow' }
		| { type: 'multiplierBoardHide' }
		| { type: 'multiplierBoardInit' }
		| { type: 'multiplierBoardReset' }
		| { type: 'multiplierBoardAnimate' }
		| { type: 'multiplierBoardMove' };
</script>

<script lang="ts">
	import _ from 'lodash';
	import { Tween } from 'svelte/motion';
	import { quartInOut } from 'svelte/easing';

	import { waitForResolve } from 'utils-shared/wait';
	import { waitForTimeout } from 'utils-shared/wait';

	import MultiplierBoardBase from './MultiplierBoardBase.svelte';
	import BoardContainer from './BoardContainer.svelte';
	import UnifiedMultiplierBomb from './UnifiedMultiplierBomb.svelte';
	import { getContext } from '../game/context';
	import type { RawSymbol, SymbolState } from '../game/types';
	import { getSymbolX, getSymbolY } from '../game/utils';

	const context = getContext();

	let show = $state(false);
	let unifiedBombs = $state<Array<{
		id: number;
		multiplierValue: number;
		x: number;
		y: number;
		isActive: boolean;
	}>>([]);
	let completedBombs = $state<number[]>([]);
	let currentAnimatingBombs = $state<number[]>([]);
	let animationSequenceRunning = $state(false);

	const boardCenter = $derived(() => ({
		x: context.stateGameDerived.boardLayout().width * 0.5,
		y: context.stateGameDerived.boardLayout().height * 0.5,
	}));

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
			const bombs: typeof unifiedBombs = [];
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
				
				// Scale bomb to 2x as requested
				bomb.isActive = true;
				currentAnimatingBombs = [bomb.id];
				
				// Wait for this bomb to complete its full sequence
				await waitForBombCompletion(bomb.id);
				console.log(`✅ Bomb ${i + 1} animation completed`);
				
				// Brief pause between bombs
				await waitForTimeout(300);
			}

			console.log('🎉 All unified bomb animations completed!');
			animationSequenceRunning = false;
		},
		multiplierBoardMove: async () => {
			// Move all bombs to center (this happens after animation)
			console.log('🎯 Moving unified bombs to center...');
			
			unifiedBombs = unifiedBombs.map(bomb => ({
				...bomb,
				x: boardCenter().x,
				y: boardCenter().y,
			}));
			
			// Small delay to allow visual positioning
			await waitForTimeout(500);
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
				<UnifiedMultiplierBomb 
					x={bomb.x}
					y={bomb.y}
					multiplierValue={bomb.multiplierValue}
					autoStart={true}
					onComplete={() => handleBombComplete(bomb.id)}
				/>
			{/if}
		{/each}
	</BoardContainer>
{/if}
