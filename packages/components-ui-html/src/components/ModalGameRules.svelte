
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import BaseContent from './BaseContent.svelte';
	import BaseScrollable from './BaseScrollable.svelte';
	import img12 from '../../assets/12.png';
	import img13 from '../../assets/13.png';
	import img16 from '../../assets/16.png';
	import img17 from '../../assets/17.png';
	import img19 from '../../assets/19.png';

	type Props = {
		children: Snippet;
	};

	const props: Props = $props();
</script>

<style>
	:global(h2, h3, p, li) {
		font-family: 'DollarBill',;
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
	p,
	li {
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
	.button-list img {
		height: 40px;
		vertical-align: middle;
		margin-right: 8px;
	}
	.modal-rules-scroll {
		max-height: 70vh;
		overflow-y: auto;
		padding: 24px 16px;
		box-sizing: border-box;
		margin: 48px auto 24px auto;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 16px;
		width: 100%;
		max-width: 600px;
		display: block;
		scrollbar-width: none; /* Firefox */
	}
	.modal-rules-scroll::-webkit-scrollbar {
		display: none; /* Chrome, Safari */
	}

	@media (max-width: 700px) {
		.modal-rules-scroll {
			max-height: 80vh;
			margin: 16px 0;
			padding: 16px 8px;
			border-radius: 8px;
		}
		.button-list img {
			height: 66px;
			margin-right: 6px;
		}
	}
</style>

{#if stateModal.modal?.name === 'gameRules'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<BaseContent maxWidth="100%">
			<BaseScrollable type="column">
				<div class="modal-rules-scroll">
					<h2>DEAF PRESIDENTS</h2>
					<h2> Game Information</h2>

					<section>
						<h3>Theoretical RTP (Return to Player)</h3>
						<p>
							The RTP (Return to Player) represents the expected average return
							over long-term play. All outcomes are determined by chance, so
							individual sessions may vary.
						</p>
						<p><b>RTP Base Game:</b> 97%</p>
						<p><b>RTP Bonus Mode:</b> 97%</p>
					</section>

					<section>
						<h3>Bonus Features</h3>
						<p>The bonus round is triggered by scatter symbols:</p>
						<ul>
							<li>4 Scatters → 8 Did Not Inhale Spins</li>
							<li>5 Scatters → 10 Honest Abe Spins</li>
							<li>6 Scatters → 12 Osama Killer Spins</li>
						</ul>
						<p>
							Players can also purchase direct entry into the bonus feature
							for <b>200×</b>.
						</p>
					</section>

					<section>
						<h3>Maximum Win</h3>
						<p>
							The maximum possible win is capped at <b>5,000× </b>.
						</p>
						<p><b>Max Win Base Game:</b> 5,000×</p>
						<p><b>Max Win Bonus Mode:</b> 5,000×</p>
					</section>

					<section>
						<h3>Game Controls</h3>
						<ul class="button-list">
							<li>
								<img src={img17} alt="Spin" />
								<b>Spin</b> – Plays a single round at the chosen stake.
							</li>
							<li>
								<img src={img12} alt="Autoplay" />
								<b>Autoplay</b> – Plays multiple rounds automatically.
							</li>
							<li>
								<img src={img19} alt="Turbo" />
								<b>Turbo</b> – Speeds up animations for faster play.
							</li>
							<li>
								<img src={img13} alt="Bonus Buy" />
								<b>Bonus</b> – Instantly enters the bonus feature for 200×.
							</li>
							<li>
								<img src={img16} alt="Menu" />
								<b>Menu</b> – Opens sound settings, help, and game history.
							</li>
						</ul>
					</section>

					<section>
						<h3>Important Notice</h3>
						<ul>
							<li>Malfunctions void all results.</li>
							<li>
								A stable internet connection is required. If disconnected, reload the game
								to continue incomplete rounds.
							</li>
							<li>
								Theoretical values (such as RTP) are averages and do not guarantee
								individual outcomes.
							</li>
						</ul>
					</section>

					<div
						style="margin-top: 24px; text-align: right; font-size: 0.95rem; color: #888;"
					>
						Only Spins Studios
					</div>

					{@render props.children()}
				</div>
			</BaseScrollable>
		</BaseContent>
	</Popup>
{/if}
