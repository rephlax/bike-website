import { LitElement, html, css } from "lit";

class SelectionScreen extends LitElement {
	static get properties() {
		return {
			bikeData: { type: Array },
			visible: { type: Boolean, reflect: true },
		};
	}

	constructor() {
		super();
		this.bikeData = [];
		this.visible = false;
	}

	static get styles() {
		return css`
			:host {
				display: none;
				font-weight: 300;
				line-height: 1.9;
			}

			:host([visible]) {
				display: block;
			}

			::selection {
				background-color: var(--primary-color);
				color: var(--secondary-color);
			}

			::-moz-selection {
				background-color: var(--primary-color);
				color: var(--secondary-color);
			}

			.modal-backdrop {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.6);
				backdrop-filter: blur(4px);
				z-index: 999;
				animation: fadeIn 0.3s ease forwards;
			}

			@keyframes fadeIn {
				from {
					opacity: 0;
				}
				to {
					opacity: 1;
				}
			}

			@keyframes slideIn {
				from {
					transform: translate(-50%, -60%);
					opacity: 0;
				}
				to {
					transform: translate(-50%, -50%);
					opacity: 1;
				}
			}

			.modal-container {
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background: var(--surface-color, #fff);
				padding: 2rem;
				box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
				z-index: 1000;
				width: 90%;
				max-width: 500px;
				border-radius: 12px;
				animation: slideIn 0.4s ease forwards;
				overflow: hidden;
			}

			.header {
				margin: -2rem -2rem 1.5rem -2rem;
				padding: 1.5rem 2rem;
				background: var(--primary-color);
				color: var(--secondary-color);
				position: relative;
			}

			.header::after {
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 6px;
				background: linear-gradient(
					to right,
					var(--accent-color, var(--primary-color)),
					transparent
				);
			}

			#selection-screen-title {
				margin: 0;
				font-size: 1.5rem;
				font-weight: 600;
				line-height: 1.3;
			}

			.selection-form {
				display: flex;
				flex-direction: column;
				gap: 1.5rem;
			}

			label {
				font-weight: 500;
				margin-bottom: -1rem;
				color: var(--text-secondary, #4f5d75);
			}

			.select-wrapper {
				position: relative;
				margin-bottom: 1rem;
			}

			.select-wrapper::after {
				content: "▼";
				font-size: 0.8rem;
				position: absolute;
				right: 1rem;
				top: 50%;
				transform: translateY(-50%);
				color: var(--text-tertiary, #7a8099);
				pointer-events: none;
			}

			.selection-form select {
				width: 100%;
				padding: 0.8rem 1rem;
				border: 2px solid rgba(0, 0, 0, 0.1);
				border-radius: 8px;
				font-size: 1rem;
				background: var(--surface-color, #fff);
				color: var(--text-primary, #2d3142);
				appearance: none;
				cursor: pointer;
				transition: border-color 0.3s, box-shadow 0.3s;
			}

			.selection-form select:hover {
				border-color: rgba(0, 0, 0, 0.2);
			}

			.selection-form select:focus {
				outline: none;
				border-color: var(--primary-color);
				box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb, 45, 49, 66), 0.2);
			}

			.btn {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				padding: 0.75rem 1.5rem;
				border-radius: 8px;
				font-weight: 500;
				font-size: 0.95rem;
				letter-spacing: 0.025em;
				text-transform: uppercase;
				transition: all 0.3s ease;
				cursor: pointer;
				position: relative;
				overflow: hidden;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				border: none;
			}

			.btn::after {
				content: "";
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				pointer-events: none;
				background-image: radial-gradient(
					circle,
					rgba(255, 255, 255, 0.3) 10%,
					transparent 10.01%
				);
				background-repeat: no-repeat;
				background-position: 50%;
				transform: scale(10, 10);
				opacity: 0;
				transition: transform 0.5s, opacity 1s;
			}

			.btn:active::after {
				transform: scale(0, 0);
				opacity: 0.3;
				transition: 0s;
			}

			.submit-btn {
				background-color: var(--primary-color);
				color: white;
			}

			.submit-btn:hover {
				background-color: var(--accent-color, var(--primary-color));
				transform: translateY(-2px);
				box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
			}

			.close-btn {
				background-color: transparent;
				color: var(--text-primary, #2d3142);
				border: 1px solid rgba(0, 0, 0, 0.2);
			}

			.close-btn:hover {
				background-color: rgba(0, 0, 0, 0.05);
				transform: translateY(-2px);
			}

			.button-container {
				display: flex;
				justify-content: flex-end;
				gap: 1rem;
				margin-top: 0.5rem;
			}

			.bike-count {
				display: inline-block;
				margin-top: 0.5rem;
				font-size: 0.9rem;
				color: var(--text-tertiary, #7a8099);
				font-style: italic;
			}

			@media (max-width: 600px) {
				.modal-container {
					width: 95%;
					padding: 1.5rem;
				}

				.header {
					margin: -1.5rem -1.5rem 1.5rem -1.5rem;
					padding: 1.25rem 1.5rem;
				}

				.button-container {
					flex-direction: row;
					flex-wrap: wrap;
				}

				.btn {
					flex: 1;
					min-width: 120px;
				}
			}
		`;
	}

	render() {
		const bikes = Array.isArray(this.bikeData) ? this.bikeData : [];

		return html`
			<div
				class="modal-backdrop"
				@click=${this._closeForm}
				role="presentation"
			></div>
			<div
				class="modal-container"
				role="dialog"
				aria-labelledby="selection-screen-title"
			>
				<div class="header">
					<h2 id="selection-screen-title">Select Your Motorcycle</h2>
				</div>
				<form class="selection-form" @submit=${this._handleSubmit}>
					<div>
						<label for="bike-select">Choose from available models:</label>
						<div class="select-wrapper">
							<select id="bike-select" required aria-required="true">
								${bikes.map(
									(bike, index) => html`
										<option value="${index}">
											${bike.make} ${bike.model} (${bike.displacement || "N/A"})
										</option>
									`
								)}
							</select>
						</div>
						<span class="bike-count"
							>${bikes.length} model${bikes.length !== 1 ? "s" : ""} found</span
						>
					</div>
					<div class="button-container">
						<button
							type="button"
							class="btn close-btn"
							@click=${this._closeForm}
						>
							Cancel
						</button>
						<button type="submit" class="btn submit-btn">View Specs</button>
					</div>
				</form>
			</div>
		`;
	}

	updated(changedProps) {
		if (changedProps.has("bikeData") && this.bikeData.length > 0) {
			this.visible = true;
			this.style.display = "block";
		}
	}

	_handleSubmit(event) {
		event.preventDefault();
		const select = this.shadowRoot.getElementById("bike-select");
		const selectedIndex = select.value;
		const selectedBike = this.bikeData[selectedIndex];

		if (selectedBike) {
			this._updateDisplayArea(selectedBike);
			this._updateNavBar(selectedBike);
			this._updatePreviousSearches(selectedBike);
		}

		this._closeForm();
	}

	_updateDisplayArea(selectedBike) {
		const displayArea = document.querySelector("display-area");
		if (displayArea) {
			displayArea.bikeData = selectedBike;
			displayArea.style.display = "block";
		}
	}

	_updateNavBar(selectedBike) {
		const navBar = document.querySelector("nav-bar");
		if (navBar) {
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
			const bikeMakeLowerCase = selectedBike.make.toLowerCase();
			navBar.manufacturerUrl = manufacturerUrls[bikeMakeLowerCase] || "";
			navBar.bikeSelected = true;
		}
	}

	_updatePreviousSearches(selectedBike) {
		const previousSearches = document.querySelector("previous-searches");
		if (previousSearches) {
			previousSearches._addSearch(selectedBike);
		}
	}

	_closeForm() {
		this.visible = false;
		this.style.display = "none";
	}
}

customElements.define("selection-screen", SelectionScreen);
