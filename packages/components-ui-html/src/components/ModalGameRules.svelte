<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import BaseContent from './BaseContent.svelte';
	import BaseScrollable from './BaseScrollable.svelte';

	type Props = {
		children: Snippet;
	};

	const props: Props = $props();
</script>

<style>
	:global(h2, h3, p, li) {
		font-family: 'BungeeSpice', cursive;
		color: #ececec;
	}
	h2 {
		font-size: 1.5rem;
		font-weight: 600;
	}
	h3 {
		font-size: 1.15rem;
		margin-top: 16px;
		font-weight: 500;
	}
	p, li {
		font-size: 0.95rem;
		line-height: 1.5;
	}
	ul {
		padding-left: 20px;
	}
	.button-list {
		margin: 12px 0;
		padding-left: 20px;
	}
	.button-list li {
		margin-bottom: 6px;
	}
	.modal-rules-scroll {
		max-height: 70vh;
		overflow-y: auto;
		padding: 24px 16px;
		box-sizing: border-box;
		margin: 48px auto 24px auto;
		background: rgba(20, 20, 20, 0.98);
		border-radius: 16px;
		width: 100%;
		max-width: 600px;
		display: block;
	}
	@media (max-width: 700px) {
		.modal-rules-scroll {
			max-height: 80vh;
			margin: 16px 0;
			padding: 16px 4px;
			border-radius: 8px;
		}
	}
</style>

{#if stateModal.modal?.name === 'gameRules'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<BaseContent maxWidth="100%">
			<BaseScrollable type="column">
				   <div class="modal-rules-scroll">
					<h2>Gladiator 5000X – Game Information</h2>

					<section>
						<h3>Theoretical RTP (Return to Player)</h3>
						<p>
							This game features a theoretical Return to Player (RTP) of <b>97%</b>.
							This value is calculated over extended play. Actual results may vary
							as all outcomes are determined by chance.
						</p>
					</section>

					<section>
						<h3>Bonus Feature</h3>
						<p>The bonus round is triggered by scatter symbols:</p>
						<ul>
							<li>4 Scatters = 8 Free Spins</li>
							<li>5 Scatters = 10 Free Spins</li>
							<li>6 Scatters = 12 Free Spins</li>
						</ul>
						<p>
							Players also have the option to purchase the bonus game directly
							for <b>200x</b> the base play amount.
						</p>
					</section>

					<section>
						<h3>Maximum Win</h3>
						<p>
							The maximum payout available in the game is capped at
							<b>5,000x</b> the base play amount.
						</p>
					</section>

					<section>
						<h3>Game Controls & Buttons</h3>
						<ul class="button-list">
							<li><b>Spin</b> – Starts a single round of play at the chosen stake.</li>
							<li><b>Autoplay</b> – Allows multiple rounds to play automatically without pressing spin each time.</li>
							<li><b>Turbo</b> – Speeds up the spin animations for faster gameplay.</li>
							<li><b>Bonus Buy</b> – Instantly purchases entry into the bonus feature for 200x the base play amount.</li>
							<li><b>Menu</b> – Opens additional options, including sound settings, help, and game history.</li>
						</ul>
					</section>

					<section>
						<h3>Important Notice</h3>
						<ul>
							<li>Malfunction voids all plays.</li>
							<li>A stable internet connection is required. In case of disconnection, reload the game to resume any incomplete rounds.</li>
							<li>Theoretical values (such as RTP) are averages over time and do not guarantee individual results.</li>
						</ul>
					</section>

					<div style="margin-top: 24px; text-align: right; font-size: 0.95rem; color: #888;">
						Only Spins Studios
					</div>

					{@render props.children()}
				</div>
			</BaseScrollable>
		</BaseContent>
	</Popup>
{/if}
