<script lang="ts" module>
	import { Rectangle, type RectangleProps } from 'pixi-svelte';

	export type Props = RectangleProps & {
		variant?: 'dark' | 'light' | 'accent' | 'bonus-active';
		state?: 'normal' | 'hover' | 'pressed' | 'disabled';
		showShadow?: boolean;
		showBorder?: boolean;
	};
</script>

<script lang="ts">
	import {
		DARK_BUTTON_PRIMARY,
		DARK_BUTTON_HOVER,
		LIGHT_BUTTON_PRIMARY,
		LIGHT_BUTTON_HOVER,
		ACCENT_PRIMARY,
		ACCENT_SECONDARY,
		BONUS_ACTIVE_PRIMARY,
		BONUS_ACTIVE_SECONDARY,
		DISABLED_PRIMARY,
		BORDER_DARK,
		BORDER_LIGHT,
		BORDER_ACCENT,
		BORDER_BONUS_ACTIVE,
	} from 'constants-shared/colors';

	const {
		variant = 'dark',
		state = 'normal',
		showShadow = true,
		showBorder = true,
		backgroundColor,
		borderColor,
		borderWidth,
		...props
	}: Props = $props();

	// Calculate background color based on variant and state
	const computedBackgroundColor = $derived(() => {
		if (backgroundColor !== undefined) return backgroundColor;

		if (state === 'disabled') return DISABLED_PRIMARY;

		switch (variant) {
			case 'light':
				return state === 'hover' ? LIGHT_BUTTON_HOVER : LIGHT_BUTTON_PRIMARY;
			case 'accent':
				return state === 'hover' ? ACCENT_SECONDARY : ACCENT_PRIMARY;
			case 'bonus-active':
				return state === 'hover' ? BONUS_ACTIVE_SECONDARY : BONUS_ACTIVE_PRIMARY;
			case 'dark':
			default:
				return state === 'hover' ? DARK_BUTTON_HOVER : DARK_BUTTON_PRIMARY;
		}
	});


    // Force a constant 4px white border
    const computedBorderColor = $derived(() => '#fff');
    const computedBorderWidth = $derived(() => 4);
</script>

<Rectangle
	borderRadius={18}
	backgroundColor={computedBackgroundColor()}
	borderColor={computedBorderColor()}
	borderWidth={computedBorderWidth()}
	{...props}
/>

<!-- ADD YOUR DESIGN -->

<!-- <script lang="ts" module>
	import { Sprite, type SpriteProps } from 'pixi-svelte';
	import type { sharedAssetsPixi } from 'constants-shared/assets';

	export type Props = SpriteProps & {
		key: keyof typeof sharedAssetsPixi;
	};
</script>

<script lang="ts">
	const props: Props = $props();
</script>

<Sprite {...props} /> -->
