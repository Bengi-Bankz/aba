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
    // Make the button larger and round
    const BUTTON_SIZE = UI_BASE_SIZE * 1;
    const sizes = { width: BUTTON_SIZE, height: BUTTON_SIZE };

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
        <Button
            {...props}
            {sizes}
            {onpress}
            {disabled}
            class="bet-round-btn"
        >
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
                        showBorder={false}
                        showShadow={false}
                    />
{#if ['spin_default', 'spin_disabled'].includes(key)}
    <Text
        anchor={0.5}
        y={BUTTON_SIZE * 0.13}
        text="Spin"
        style={{
            align: 'center',
            fontFamily: 'bungeeSpice', // or your preferred font
            fontSize: BUTTON_SIZE * 0.4,
            fill: textColor(),
            dropShadow: true,
        }}
    />
{:else if key === 'bonus-active'}
    <Text
        anchor={0.5}
        y={BUTTON_SIZE * 0.13}
        text="Bonus"
        style={{
            align: 'center',
            fontFamily: 'bungeeSpice', // or your preferred font
            fontSize: BUTTON_SIZE * 0.4,
            fill: textColor(),
            dropShadow: true,
        }}
    />
{:else}
    <Text
        anchor={0.5}
        y={BUTTON_SIZE * 0.13}
        text="Stop"
        style={{
            align: 'center',
            fontFamily: 'bungeeSpice', // or your preferred font
            fontSize: BUTTON_SIZE * 0.4,
            fill: textColor(),
            dropShadow: true,
        }}
    />
{/if}
                </Container>
            {/snippet}
        </Button>
    {/snippet}
</ButtonBetProvider>

<style>
:global(.bet-round-btn) {
    border-radius: 50% !important;
    width: unset !important;
    height: unset !important;
    box-shadow: 0 4px 24px 0 rgba(0,0,0,0.25), 0 1.5px 6px 0 rgba(0,0,0,0.18);
    background: linear-gradient(135deg, #ffb347 0%, #ffcc33 100%);
    transition: box-shadow 0.18s, transform 0.12s, background 0.18s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 !important;
}
:global(.bet-round-btn:hover:not(:disabled)) {
    box-shadow: 0 8px 32px 0 rgba(0,0,0,0.32), 0 2px 8px 0 rgba(0,0,0,0.22);
    background: linear-gradient(135deg, #ffd700 0%, #ffe066 100%);
    transform: scale(1.06);
}
:global(.bet-round-btn:active:not(:disabled)) {
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.18);
    background: linear-gradient(135deg, #ffb347 0%, #ffcc33 100%);
    transform: scale(0.96);
}
</style>
