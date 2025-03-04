import { LitElement, html, css } from "lit";

class NavBar extends LitElement {
	static get properties() {
		return {
			manufacturerUrl: { type: String },
			bikeSelected: { type: Boolean },
		};
	}

	constructor() {
		super();
		this.manufacturerUrl = "";
		this.bikeSelected = false;
	}

	static get styles() {
		return css`
			:host {
				display: block;
				width: 100%;
				position: sticky;
				top: 0;
				background-color: var(--background-color);
				color: var(--primary-color);
				padding: 10px 0;
				box-shadow: 0 4px 8px var(--box-shadow-color);
				z-index: 1000;
			}

			::selection {
				background-color: var(--primary-color);
				color: var(--secondary-color);
			}

			::-moz-selection {
				background-color: var(--primary-color);
				color: var(--secondary-color);
			}

			.navbar {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 16px 24px;
				backdrop-filter: blur(10px);
				background-color: rgba(255, 255, 255, 0.8);
				border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			}

			.navbar svg {
				width: 30px;
				height: 30px;
				fill: var(--primary-color);
			}

			.navbar button {
				background: none;
				border: none;
				color: var(--primary-color);
				cursor: pointer;
				font-size: 16px;
				margin-left: 20px;
				transition: color 0.3s, transform 0.3s;
			}

			.navbar button:disabled {
				color: gray;
				cursor: not-allowed;
			}

			.navbar button:hover:not(:disabled) {
				color: var(--secondary-color);
				transform: translateY(-2px);
			}

			.navbar a {
				color: var(--primary-color);
				text-decoration: none;
			}

			@media (max-width: 600px) {
				.navbar {
					flex-direction: column;
					gap: 10px;
				}

				.navbar button {
					font-size: 14px;
					margin-left: 0;
				}
			}
		`;
	}

	render() {
		return html`
			<nav class="navbar" aria-label="Main Navigation">
				<div>
					<a href="#" aria-label="Home">
						<svg viewBox="0 0 64 64" aria-hidden="true">
							<path
								d="M32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0zm0 60C16.561 60 4 47.439 4 32S16.561 4 32 4s28 12.561 28 28-12.561 28-28 28z"
							/>
							<path
								d="M32 14c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18zm0 32c-7.732 0-14-6.268-14-14s6.268-14 14-14 14 6.268 14 14-6.268 14-14 14z"
							/>
							<path
								d="M32 22c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zm0 16c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"
							/>
						</svg>
					</a>
				</div>
				<div>
					<slot name="search-button"></slot>
					<button
						?disabled=${!this.bikeSelected}
						@click=${this._goToManufacturer}
						aria-label="Go to Manufacturer Website"
					>
						Manufacturer
					</button>
				</div>
			</nav>
		`;
	}

	_goToManufacturer() {
		if (this.manufacturerUrl) {
			window.open(this.manufacturerUrl, "_blank");
		}
	}

	_updateManufacturerUrl(bikeMake) {
		const manufacturerUrls = {
			kawasaki: "https://www.kawasaki.com/",
			honda: "https://powersports.honda.com/",
			yamaha: "https://www.yamahamotorsports.com/",
			ducati: "https://www.ducati.com/",
			bmw: "https://www.bmwmotorcycles.com/",
			"harley-davidson": "https://www.harley-davidson.com/",
			suzuki: "https://www.suzukicycles.com/",
			aprilia: "https://www.aprilia.com/",
			triumph: "https://www.triumphmotorcycles.com/",
			bajaj: "https://www.bajajauto.com/",
			cleveland: "https://www.clevelandcyclewerks.com/",
			"gas gas": "https://www.gasgas.com/",
			hero: "https://www.heromotocorp.com/",
			ktm: "https://www.ktm.com/",
			italjet: "https://www.italjet.com/",
			enfield: "https://www.royalenfield.com/",
			zero: "https://www.zeromotorcycles.com/",
			indian: "https://www.indianmotorcycle.com/",
		};
		this.manufacturerUrl = manufacturerUrls[bikeMake.toLowerCase()] || "";
	}

	connectedCallback() {
		super.connectedCallback();
		window.addEventListener(
			"bike-data-changed",
			this._onBikeDataChanged.bind(this)
		);
	}

	disconnectedCallback() {
		window.removeEventListener(
			"bike-data-changed",
			this._onBikeDataChanged.bind(this)
		);
		super.disconnectedCallback();
	}

	_onBikeDataChanged(event) {
		const bike = event.detail.bike;
		if (bike && bike.make) {
			this.bikeSelected = true;
			this._updateManufacturerUrl(bike.make);
		} else {
			this.bikeSelected = false;
			this.manufacturerUrl = "";
		}
	}
}

customElements.define("nav-bar", NavBar);
