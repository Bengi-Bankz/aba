<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	import { stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { FadeContainer } from 'components-pixi';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle } from 'pixi-svelte';
	import { waitForResolve } from 'utils-shared/wait';

	import LabelFreeSpinCounter from './LabelFreeSpinCounter.svelte';
	import type { LayoutUiProps } from '../types';
	import { getContext } from '../context';

	const props: LayoutUiProps = $props();
	const context = getContext();

	
</script>

<Container x={20}>
	{@render props.gameName()}
</Container>




<MainContainer standard alignVertical="bottom">
	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 440}
		y={context.stateLayoutDerived.mainLayoutStandard().height - 400}
	>
		{@render props.buttonMenu({ anchor: 0.5 })}
	</Container>

	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 440}
		y={context.stateLayoutDerived.mainLayoutStandard().height - 400}
	>
		{@render props.buttonBuyBonus({ anchor: 0.5 })}
	</Container>

	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
		y={context.stateLayoutDerived.mainLayoutStandard().height - 400}
	>
		{@render props.buttonBet({ anchor: 0.5 })}
	</Container>

	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 180}
		y={context.stateLayoutDerived.mainLayoutStandard().height - 400}
	>
		{@render props.buttonAutoSpin({ anchor: 0.5 })}
	</Container>

	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 180}
		y={context.stateLayoutDerived.mainLayoutStandard().height - 400}
	>
		{@render props.buttonTurbo({ anchor: 0.5 })}
	</Container>

	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
		y={context.stateLayoutDerived.mainLayoutStandard().height - 270}
	>
		{@render props.amountBalance({ stacked: true })}
	</Container>

	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
		y={context.stateLayoutDerived.mainLayoutStandard().height - 1800}
	>
		{@render props.amountWin({ stacked: true })}
	</Container>
</MainContainer>

<MainContainer standard alignVertical="bottom">
	{#if stateUi.freeSpinCounterShow}
		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 130}
		>
			<LabelFreeSpinCounter stacked />
		</Container>
	{:else}
		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 130}
		>
			{@render props.amountBet({ stacked: true })}
		</Container>

		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 390}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 85}
		>
			{@render props.buttonDecrease({ anchor: 0.5 })}
		</Container>

		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 390}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 85}
		>
			{@render props.buttonIncrease({ anchor: 0.5 })}
		</Container>
	{/if}

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
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 440}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 400}
		>
			<Container y={-190 - 210 * 3}>
				{@render props.buttonPayTable({ anchor: 0.5 })}
			</Container>

			<Container y={-190 - 210 * 2}>
				{@render props.buttonGameRules({ anchor: 0.5 })}
			</Container>

			<Container y={-190 - 210 * 1}>
				{@render props.buttonSettings({ anchor: 0.5 })}
			</Container>

			<Container y={-190}>
				{@render props.buttonSoundSwitch({ anchor: 0.5 })}
			</Container>

			<Container>
				{@render props.buttonMenuClose({ anchor: 0.5 })}
			</Container>
		</Container>
	</MainContainer>
{/if}
