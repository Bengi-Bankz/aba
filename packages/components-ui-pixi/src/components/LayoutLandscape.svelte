<script lang="ts">
	import { stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle, anchorToPivot } from 'pixi-svelte';

	import { LANDSCAPE_BASE_SIZE, LANDSCAPE_BACKGROUND_WIDTH_LIST } from '../constants';
	import type { LayoutUiProps } from '../types';
	import { getContext } from '../context';

	const props: LayoutUiProps = $props();
	const context = getContext();
</script>

<Container x={20}>
	{@render props.gameName()}
</Container>

<Container x={context.stateLayoutDerived.canvasSizes().width - 20}>
	{@render props.logo()}
</Container>

<MainContainer standard alignVertical="bottom">
	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
		y={context.stateLayoutDerived.mainLayoutStandard().height - LANDSCAPE_BASE_SIZE - 40}
		pivot={anchorToPivot({
			anchor: { x: 0.5, y: 0 },
			sizes: {
				height: LANDSCAPE_BASE_SIZE,
				width: LANDSCAPE_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0),
			},
		})}
	>
		<Container y={LANDSCAPE_BASE_SIZE * 0.5 - 90} x={85 + 20} scale={0.8}>
			{@render props.buttonMenu({ anchor: 0.5 })}
		</Container>

		<Container y={LANDSCAPE_BASE_SIZE * 0.1 - 200} x={1670 + 20} scale={0.7}>
			{@render props.buttonBuyBonus({ anchor: 0.5 })}
		</Container>

		<Container y={LANDSCAPE_BASE_SIZE * -4.6} x={220} scale={0.8}>
			{@render props.amountBalance({ stacked: true })}
		</Container>

		<Container y={LANDSCAPE_BASE_SIZE * -5} x={910} scale={0.6}>
			{@render props.amountWin({ stacked: true })}
		</Container>

		<Container y={LANDSCAPE_BASE_SIZE * 0.5} x={900} scale={0.75}>
			{@render props.amountBet({ stacked: true })}
		</Container>

		<Container  y={LANDSCAPE_BASE_SIZE * 0.7} x={750} scale={0.35}>
			{@render props.buttonDecrease({ anchor: 0.5 })}
		</Container>

		<Container  y={LANDSCAPE_BASE_SIZE * 0.7} x={1050} scale={0.35}>
			{@render props.buttonIncrease({ anchor: 0.5 })}
		</Container>
	</Container>

	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width - 60}
		y={context.stateLayoutDerived.mainLayoutStandard().height * 0.5}
		pivot={anchorToPivot({
			anchor: { x: 1, y: 0.5 },
			sizes: {
				height: LANDSCAPE_BASE_SIZE,
				width: LANDSCAPE_BASE_SIZE,
			},
		})}
	>
		<Container x={LANDSCAPE_BASE_SIZE * -1} y={LANDSCAPE_BASE_SIZE * -1.5 + 140} scale={0.5}>
			{@render props.buttonAutoSpin({ anchor: 0.5 })}
		</Container>

		<Container x={LANDSCAPE_BASE_SIZE * 1 - 110} y={LANDSCAPE_BASE_SIZE * 0.5} scale={0.8}>
			{@render props.buttonBet({ anchor: 0.5 })}
		</Container>

		<Container x={LANDSCAPE_BASE_SIZE * -.3} y={LANDSCAPE_BASE_SIZE * -1.5 + 140} scale={0.5}>
			{@render props.buttonTurbo({ anchor: 0.5 })}
		</Container>
	</Container>
</MainContainer>

{#if stateUi.menuOpen}
	<Rectangle
		eventMode="static"
		cursor="pointer"
		alpha={0.5}
		anchor={0.5}
		backgroundColor={BLACK}
		width={context.stateLayoutDerived.canvasSizes().width}
		height={context.stateLayoutDerived.canvasSizes().height}
		x={context.stateLayoutDerived.canvasSizes().width * 0.5}
		y={context.stateLayoutDerived.canvasSizes().height * 0.5}
		onpointerup={() => (stateUi.menuOpen = false)}
	/>

	<MainContainer standard alignVertical="bottom">
		<Container
			x={165}
			y={context.stateLayoutDerived.mainLayoutStandard().height - LANDSCAPE_BASE_SIZE - 130}
		>
			<Container scale={0.8} y={LANDSCAPE_BASE_SIZE * 0.5 - 150 - 170 * 3}>
				{@render props.buttonPayTable({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={LANDSCAPE_BASE_SIZE * 0.5 - 150 - 170 * 2}>
				{@render props.buttonGameRules({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={LANDSCAPE_BASE_SIZE * 0.5 - 150 - 170 * 1}>
				{@render props.buttonSettings({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={LANDSCAPE_BASE_SIZE * 0.5 - 150}>
				{@render props.buttonSoundSwitch({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={LANDSCAPE_BASE_SIZE * 0.5}>
				{@render props.buttonMenuClose({ anchor: 0.5 })}
			</Container>
		</Container>
	</MainContainer>
{/if}
