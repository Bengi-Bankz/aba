<script lang="ts">
	import { Container, Text } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';
	import { OnHotkey } from 'components-shared';
	import { stateBet, stateBetDerived } from 'state-shared';

	import UiSprite from './UiSprite.svelte';
	import ButtonBetProvider from './ButtonBetProvider.svelte';
	import { UI_BASE_FONT_SIZE, UI_BASE_SIZE } from '../constants';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { WHITE, DISABLED_SECONDARY } from 'constants-shared/colors';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const disabled = $derived(!stateBetDerived.isBetCostAvailable());
	const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };

	// Check if bonus mode is active (any mode other than 'BASE')
	const isBonusActive = $derived(() => {
		return stateBet.activeBetModeKey !== 'BASE';
	});

	// Calculate text color based on state
	const textColor = $derived(() => {
		return disabled ? DISABLED_SECONDARY : WHITE;
	});

	// Calculate button variant based on bonus state
	const buttonVariant = $derived(() => {
		return isBonusActive() ? 'bonus-active' : 'accent';
	});
</script>

<ButtonBetProvider>
	{#snippet children({ key, onpress })}
		<OnHotkey hotkey="Space" {disabled} {onpress} />
		<Button {...props} {sizes} {onpress} {disabled}>
			{#snippet children({ center, hovered, pressed })}
				<Container {...center}>
					<UiSprite
						key="bet"
						width={sizes.width}
						height={sizes.height}
						anchor={0.5}
						variant={buttonVariant()}
						state={disabled || ['spin_disabled', 'stop_disabled'].includes(key) 
							? 'disabled' 
							: pressed 
								? 'pressed' 
								: hovered 
									? 'hover' 
									: 'normal'}
						showBorder={true}
						showShadow={true}
					/>
					<Text
						anchor={0.5}
						text={['spin_default', 'spin_disabled'].includes(key)
							? (isBonusActive() ? i18nDerived.bonusBet() : i18nDerived.bet())
							: i18nDerived.stop()}
						style={{
							align: 'center',
							wordWrap: true,
							wordWrapWidth: sizes.width - 20,
							fontFamily: 'Roboto, proxima-nova',
							fontWeight: '600',
							fontSize: UI_BASE_FONT_SIZE * 0.9,
							fill: textColor(),
						}}
					/>
				</Container>
			{/snippet}
		</Button>
	{/snippet}
</ButtonBetProvider>
