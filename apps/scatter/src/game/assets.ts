export default {
	loader: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/loader/loader.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/loader/loader.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	pressToContinueText: {
		type: 'sprites',
		src: new URL('../../assets/sprites/pressToContinueText/MM_pressanywhere.json', import.meta.url)
			.href,
		preload: true,
	},
	h1: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsanimate/h1.webp.json', import.meta.url).href,
		preload: true,
	},
	h2: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsanimate/h2.webp.json', import.meta.url).href,
		preload: true,
	},
	h3: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsanimate/h3.webp.json', import.meta.url).href,
		preload: true,
	},
	h4: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsanimate/h4.webp.json', import.meta.url).href,
		preload: true,
	},
	presidentsAnimate: {
		type: 'sprites',
		src: new URL('../../assets/sprites/presidentsanimate.json', import.meta.url).href,
		preload: true,
	},
	H2: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h2.json', import.meta.url).href,
			scale: 2,
		},
	},
	H3: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h3.json', import.meta.url).href,
			scale: 2,
		},
	},
	H4: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h4.json', import.meta.url).href,
			scale: 2,
		},
	},
	H5: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h5.json', import.meta.url).href,
			scale: 2,
		},
	},
	L1: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l1.json', import.meta.url).href,
			scale: 2,
		},
	},
	L2: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l2.json', import.meta.url).href,
			scale: 2,
		},
	},
	L3: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l3.json', import.meta.url).href,
			scale: 2,
		},
	},
	L4: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l4.json', import.meta.url).href,
			scale: 2,
		},
	},
	M: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols2/symbols2.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols2/M.json', import.meta.url).href,
			scale: 2,
		},
	},
	S: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols2/symbols2.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols2/S.json', import.meta.url).href,
			scale: 2,
		},
	},
	explosion: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols3/symbols3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols3/explosion.json', import.meta.url).href,
			scale: 2,
		},
	},
	W: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols3/symbols3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols3/W.json', import.meta.url).href,
			scale: 2,
		},
	},
	reelsFrame: {
		type: 'sprites',
		src: new URL('../../assets/sprites/reelsFrame/reels_frame.json', import.meta.url).href,
	},
	payFrame: {
		type: 'sprite',
		src: new URL('../../assets/sprites/payFrame/payFrame.png', import.meta.url).href,
	},
	anticipation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/anticipation/anticipation.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/anticipation/anticipation.json', import.meta.url).href,
			scale: 2,
		},
	},
	goldFont: {
		type: 'font',
		src: new URL('../../assets/fonts/goldFont/mm_gold.xml', import.meta.url).href,
	},
	DollarBill: {
		type: 'font',
		src: new URL('../../assets/fonts/DollarBill/DollarBill.xml', import.meta.url).href,
	},
	silverFont: {
		type: 'font',
		src: new URL('../../assets/fonts/silverFont/mm_silver.xml', import.meta.url).href,
	},
	purpleFont: {
		type: 'font',
		src: new URL('../../assets/fonts/purpleFont/mm_purple.xml', import.meta.url).href,
	},
	bigwin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/bigwin/big_wins.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/bigwin/mm_bigwin.json', import.meta.url).href,
			scale: 2,
		},
	},
	globalMultiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/globalMultiplier/multiframe.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/globalMultiplier/multiframe.json', import.meta.url)
				.href,
			scale: 2,
		},
	},
	fsIntro: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsIntroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsOutroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_total_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	foregroundAnimation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/foregroundAnimation/mm_bg.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/foregroundAnimation/mm_bg.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	foregroundFeatureAnimation: {
		type: 'spine',
		src: {
			atlas: new URL(
				'../../assets/spines/foregroundFeatureAnimation/mm_bg_feature.atlas',
				import.meta.url,
			).href,
			skeleton: new URL(
				'../../assets/spines/foregroundFeatureAnimation/mm_bg_feature.json',
				import.meta.url,
			).href,
			scale: 2,
		},
		preload: true,
	},
	tumble_multiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_multiplier.json', import.meta.url)
				.href,
			scale: 2,
		},
	},
	tumble_win: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_win.json', import.meta.url).href,
			scale: 2,
		},
	},
	reelhouse: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/reelhouse/reelhouse_glow.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/reelhouse/reelhouse_glow.json', import.meta.url).href,
			scale: 2,
		},
	},
	progressBar: {
		type: 'sprites',
		src: new URL('../../assets/sprites/progressBar/progressBar.json', import.meta.url).href,
		preload: true,
	},
	freeSpins: {
		type: 'sprites',
		src: new URL('../../assets/sprites/freeSpins/freeSpins.json', import.meta.url).href,
	},
	winSmall: {
		type: 'sprites',
		src: new URL('../../assets/sprites/winSmall/MM_Localisation_winsmall.json', import.meta.url)
			.href,
	},
	clusterWin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/clusterWin/clusterpay.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/clusterWin/clusterpay.json', import.meta.url).href,
			scale: 2,
		},
	},
	transition: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/transition/transition.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/transition/transition.json', import.meta.url).href,
			scale: 2,
		},
	},
	symbolsStatic: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsStatic/symbolsStatic.json', import.meta.url).href,
	},
	coins: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/coin/SD2_Coin.json', import.meta.url).href,
	},
	sound: {
		type: 'audio',
		src: new URL('../../assets/audio/sounds.json', import.meta.url).href,
		preload: true,
	},
	blackfont: {
		type: 'sprite',
		src: new URL('../../assets/fonts/blackfont/spin.png', import.meta.url).href,
		preload: true,
	},
	bluefont: {
		type: 'sprite',
		src: new URL('../../assets/fonts/bluefont/stop.png', import.meta.url).href,
		preload: true,
	},
	multitick: {
		type: 'sprite',
		src: new URL('../../assets/sprites/multi-tick/multitick.png', import.meta.url).href,
		preload: true,
	},
	playbehind: {
		type: 'sprite',
		src: new URL('../../assets/fonts/playbehind/playbehind.png', import.meta.url).href,
		preload: true,
	},
	stopbehind: {
		type: 'sprite',
		src: new URL('../../assets/fonts/stopbehind/stopbehind.png', import.meta.url).href,
		preload: true,
	},
	auto: {
		type: 'sprite',
		src: new URL('../../assets/fonts/auto/auto.png', import.meta.url).href,
		preload: true,
	},
	turboon: {
		type: 'sprite',
		src: new URL('../../assets/fonts/turboon/turboon.png', import.meta.url).href,
		preload: true,
	},
	beehive: {
		type: 'sprite',
		src: new URL('../../assets/fonts/beehive/beehive.png', import.meta.url).href,
		preload: true,
	},
	gamelogo: {
		type: 'sprite',
		src: new URL('../../static/assets/fonts/gamelogo/gamelogo.png', import.meta.url).href,
		preload: true,
	},

	increase: {
		type: 'sprite',
		src: new URL('../../assets/fonts/increase/increase.png', import.meta.url).href,
		preload: true,
	},
	decrease: {
		type: 'sprite',
		src: new URL('../../assets/fonts/decrease/decrease.png', import.meta.url).href,
		preload: true,
	},
	menu: {
		type: 'sprite',
		src: new URL('../../assets/fonts/menu/menu.png', import.meta.url).href,
		preload: true,
	},
	turbooff: {
		type: 'sprite',
		src: new URL('../../assets/fonts/turbooff/turbooff.png', import.meta.url).href,
		preload: true,
	},

	globalMultiplierBackground: {
		type: 'sprite',
		src: new URL('../../static/assets/spines/globalMultiplier/multiframe2.webp', import.meta.url)
			.href,
		preload: true,
	},
	trump: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/trump/spritesheet.json', import.meta.url).href,
	},
	anticipation2: {
		type: 'sprite',
		src: new URL('../../assets/sprites/anticipation/anticipation2.png', import.meta.url).href,
	},
	anticipationScroll: {
		type: 'sprite',
		src: new URL('../../assets/fonts/scroll/scroll.png', import.meta.url).href,
	},
	h1Animate: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsanimate/h1.webp.json', import.meta.url).href,
		preload: true,
	},
	h2Animate: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsanimate/h2.webp.json', import.meta.url).href,
		preload: true,
	},
	h3Animate: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsanimate/h3.webp.json', import.meta.url).href,
		preload: true,
	},
	h4Animate: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsanimate/h4.webp.json', import.meta.url).href,
		preload: true,
	},
} as const;
