<script lang="ts">
	import { Button, type ButtonProps } from 'components-pixi';
	import UiSprite from './UiSprite.svelte';
	import type { Snippet } from 'svelte';
	import { WHITE, BLACK, DISABLED_SECONDARY } from 'constants-shared/colors';
	import { UI_BASE_FONT_SIZE } from '../constants';

	type Props = Omit<ButtonProps, 'children'> & {
		sizes: { width: number; height: number };
		active?: boolean;
		children?: Snippet;
		variant?: 'dark' | 'light' | 'accent';
	};

	const {
		active,
		variant = 'accent',
		children: childrenFromParent,
		disabled,
		...buttonProps
	}: Props = $props();

	const textColor = $derived(() => {
		if (disabled) return DISABLED_SECONDARY;
		switch (variant) {
			case 'light': return BLACK;
			case 'dark':
			case 'accent':
			default: return WHITE;
		}
	});
</script>

<Button {...buttonProps} disabled={disabled}>
	{#snippet children({ center, hovered, pressed })}
		<UiSprite
			{...center}
			anchor={0.5}
			width={buttonProps.sizes.width}
			height={buttonProps.sizes.height}
			{variant}
			state={disabled ? 'disabled' : pressed ? 'pressed' : hovered ? 'hover' : 'normal'}
			showBorder={true}
			showShadow={true}
			{...active
				? {
						borderWidth: 4,
						borderColor: variant === 'light' ? BLACK : WHITE,
					}
				: {}}
		/>

		{@render childrenFromParent?.()}
	{/snippet}
</Button>
