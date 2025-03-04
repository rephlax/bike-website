import { LitElement, html, css } from "lit";

class SelectionScreen extends LitElement {
	static get properties() {
		return {
			bikeData: { type: Array },
			visible: { type: Boolean, reflect: true },
			selectedIndex: { type: Number },
		};
	}

	constructor() {
		super();
		this.bikeData = [];
		this.visible = false;
		this.selectedIndex = undefined;
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
				box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
				z-index: 1000;
				width: 90%;
				max-width: 600px;
				border-radius: 12px;
				animation: slideIn 0.4s ease forwards;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				max-height: 90vh;
			}

			.header {
				padding: 1.5rem 2rem;
				background: var(--primary-color);
				color: var(--secondary-color);
				position: relative;
				flex-shrink: 0;
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

			.content {
				padding: 1.5rem 2rem 2rem;
				overflow-y: auto;
				flex-grow: 1;
			}

			.results-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 1rem;
			}

			.results-count {
				font-size: 0.95rem;
				color: var(--text-secondary, #4f5d75);
				margin: 0;
			}

			.filter-info {
				font-size: 0.9rem;
				color: var(--text-tertiary, #7a8099);
				font-style: italic;
			}

			.bikes-list {
				border: 1px solid rgba(0, 0, 0, 0.1);
				border-radius: 8px;
				margin-bottom: 1.5rem;
				overflow: hidden;
			}

			.bike-option {
				display: flex;
				align-items: center;
				padding: 1rem;
				border-bottom: 1px solid rgba(0, 0, 0, 0.1);
				cursor: pointer;
				transition: all 0.2s ease;
				position: relative;
				background-color: var(--surface-color, #ffffff);
			}

			.bike-option:last-child {
				border-bottom: none;
			}

			.bike-option:hover {
				background-color: rgba(var(--primary-color-rgb, 45, 49, 66), 0.05);
			}

			.bike-option.selected {
				background-color: rgba(var(--primary-color-rgb, 45, 49, 66), 0.1);
			}

			.bike-option.selected::before {
				content: "";
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				width: 4px;
				background-color: var(--primary-color, #2d3142);
			}

			.bike-info {
				flex-grow: 1;
			}

			.bike-make-model {
				font-weight: 500;
				font-size: 1.1rem;
				margin-bottom: 0.25rem;
				color: var(--text-primary, #2d3142);
			}

			.bike-specs {
				display: flex;
				flex-wrap: wrap;
				gap: 0.75rem;
				font-size: 0.85rem;
				color: var(--text-secondary, #4f5d75);
			}

			.bike-spec {
				display: flex;
				align-items: center;
			}

			.bike-spec svg {
				width: 16px;
				height: 16px;
				margin-right: 0.25rem;
				fill: var(--text-tertiary, #7a8099);
			}

			.select-indicator {
				flex-shrink: 0;
				width: 24px;
				height: 24px;
				border: 2px solid rgba(var(--primary-color-rgb, 45, 49, 66), 0.3);
				border-radius: 50%;
				margin-left: 1rem;
				position: relative;
				transition: border-color 0.2s;
			}

			.bike-option:hover .select-indicator {
				border-color: rgba(var(--primary-color-rgb, 45, 49, 66), 0.5);
			}

			.bike-option.selected .select-indicator {
				border-color: var(--primary-color, #2d3142);
				background-color: var(--primary-color, #2d3142);
			}

			.bike-option.selected .select-indicator::after {
				content: "";
				position: absolute;
				top: 6px;
				left: 6px;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background-color: white;
			}

			.no-results {
				text-align: center;
				padding: 2rem;
				color: var(--text-secondary, #4f5d75);
				font-style: italic;
			}

			.button-container {
				display: flex;
				justify-content: flex-end;
				gap: 1rem;
				margin-top: 0.5rem;
				flex-shrink: 0;
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

			.btn:disabled {
				opacity: 0.5;
				cursor: not-allowed;
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
				background-color: var(--primary-color, #2d3142);
				color: white;
			}

			.submit-btn:not(:disabled):hover {
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

			@media (max-width: 600px) {
				.modal-container {
					width: 95%;
					max-height: 80vh;
				}

				.header {
					padding: 1.25rem 1.5rem;
				}

				.content {
					padding: 1rem 1.5rem 1.5rem;
				}

				.bike-option {
					padding: 0.75rem;
				}

				.bike-make-model {
					font-size: 1rem;
				}

				.bike-specs {
					flex-direction: column;
					gap: 0.25rem;
				}

				.button-container {
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: space-between;
				}

				.btn {
					flex: 1;
					min-width: 120px;
					padding: 0.7rem 1rem;
					font-size: 0.9rem;
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
				<div class="content">
					<div class="results-info">
						<span class="results-count">
							${bikes.length} model${bikes.length !== 1 ? "s" : ""} found
						</span>
						<span class="filter-info">
							Select a model below to view specifications
						</span>
					</div>

					${bikes.length > 0
						? html`
								<div
									class="bikes-list"
									role="listbox"
									aria-label="Available motorcycle models"
								>
									${bikes.map(
										(bike, index) => html`
											<div
												class="bike-option ${this.selectedIndex === index
													? "selected"
													: ""}"
												@click=${() => this._selectBike(index)}
												role="option"
												aria-selected="${this.selectedIndex === index}"
												tabindex="0"
												@keydown=${(e) =>
													this._handleKeyboardSelection(e, index)}
											>
												<div class="bike-info">
													<div class="bike-make-model">
														${bike.make} ${bike.model}
													</div>
													<div class="bike-specs">
														${bike.displacement
															? html`
																	<span class="bike-spec">
																		<svg viewBox="0 0 24 24">
																			<path
																				d="M7,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V4A2,2 0 0,1 7,2M7,4V20H17V4H7M9,6H15V8H9V6M9,10H15V18H9V10M10,11V17H14V11H10Z"
																			/>
																		</svg>
																		${bike.displacement}
																	</span>
															  `
															: ""}
														${bike.engine
															? html`
																	<span class="bike-spec">
																		<svg viewBox="0 0 24 24">
																			<path
																				d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M8.5,8.5L10.5,6.5L16,12L10.5,17.5L8.5,15.5L12,12L8.5,8.5M13.5,6.5L15.5,8.5L12,12L15.5,15.5L13.5,17.5L8,12L13.5,6.5Z"
																			/>
																		</svg>
																		${bike.engine}
																	</span>
															  `
															: ""}
														${bike.power
															? html`
																	<span class="bike-spec">
																		<svg viewBox="0 0 24 24">
																			<path
																				d="M14,8.5A1.5,1.5 0 0,0 12.5,10A1.5,1.5 0 0,0 14,11.5A1.5,1.5 0 0,0 15.5,10A1.5,1.5 0 0,0 14,8.5M14,12.5A1.5,1.5 0 0,0 12.5,14A1.5,1.5 0 0,0 14,15.5A1.5,1.5 0 0,0 15.5,14A1.5,1.5 0 0,0 14,12.5M10,17A1,1 0 0,0 9,18A1,1 0 0,0 10,19A1,1 0 0,0 11,18A1,1 0 0,0 10,17M10,8.5A1.5,1.5 0 0,0 8.5,10A1.5,1.5 0 0,0 10,11.5A1.5,1.5 0 0,0 11.5,10A1.5,1.5 0 0,0 10,8.5M14,20.5A0.5,0.5 0 0,0 13.5,21A0.5,0.5 0 0,0 14,21.5A0.5,0.5 0 0,0 14.5,21A0.5,0.5 0 0,0 14,20.5M14,17A1,1 0 0,0 13,18A1,1 0 0,0 14,19A1,1 0 0,0 15,18A1,1 0 0,0 14,17M21,13.5A0.5,0.5 0 0,0 20.5,14A0.5,0.5 0 0,0 21,14.5A0.5,0.5 0 0,0 21.5,14A0.5,0.5 0 0,0 21,13.5M18,5A1,1 0 0,0 17,6A1,1 0 0,0 18,7A1,1 0 0,0 19,6A1,1 0 0,0 18,5M18,9A1,1 0 0,0 17,10A1,1 0 0,0 18,11A1,1 0 0,0 19,10A1,1 0 0,0 18,9M18,17A1,1 0 0,0 17,18A1,1 0 0,0 18,19A1,1 0 0,0 19,18A1,1 0 0,0 18,17M18,13.5A0.5,0.5 0 0,0 17.5,14A0.5,0.5 0 0,0 18,14.5A0.5,0.5 0 0,0 18.5,14A0.5,0.5 0 0,0 18,13.5M10,12.5A1.5,1.5 0 0,0 8.5,14A1.5,1.5 0 0,0 10,15.5A1.5,1.5 0 0,0 11.5,14A1.5,1.5 0 0,0 10,12.5M10,7A1,1 0 0,0 11,6A1,1 0 0,0 10,5A1,1 0 0,0 9,6A1,1 0 0,0 10,7M10,3.5A0.5,0.5 0 0,0 10.5,3A0.5,0.5 0 0,0 10,2.5A0.5,0.5 0 0,0 9.5,3A0.5,0.5 0 0,0 10,3.5M10,20.5A0.5,0.5 0 0,0 9.5,21A0.5,0.5 0 0,0 10,21.5A0.5,0.5 0 0,0 10.5,21A0.5,0.5 0 0,0 10,20.5M3,13.5A0.5,0.5 0 0,0 2.5,14A0.5,0.5 0 0,0 3,14.5A0.5,0.5 0 0,0 3.5,14A0.5,0.5 0 0,0 3,13.5M14,3.5A0.5,0.5 0 0,0 14.5,3A0.5,0.5 0 0,0 14,2.5A0.5,0.5 0 0,0 13.5,3A0.5,0.5 0 0,0 14,3.5M14,7A1,1 0 0,0 15,6A1,1 0 0,0 14,5A1,1 0 0,0 13,6A1,1 0 0,0 14,7M3,9A1,1 0 0,0 2,10A1,1 0 0,0 3,11A1,1 0 0,0 4,10A1,1 0 0,0 3,9M3,5A1,1 0 0,0 2,6A1,1 0 0,0 3,7A1,1 0 0,0 4,6A1,1 0 0,0 3,5M3,17A1,1 0 0,0 2,18A1,1 0 0,0 3,19A1,1 0 0,0 4,18A1,1 0 0,0 3,17M6,13.5A0.5,0.5 0 0,0 5.5,14A0.5,0.5 0 0,0 6,14.5A0.5,0.5 0 0,0 6.5,14A0.5,0.5 0 0,0 6,13.5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M6,9A1,1 0 0,0 5,10A1,1 0 0,0 6,11A1,1 0 0,0 7,10A1,1 0 0,0 6,9M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5Z"
																			/>
																		</svg>
																		${bike.power}
																	</span>
															  `
															: ""}
													</div>
												</div>
												<div class="select-indicator"></div>
											</div>
										`
									)}
								</div>
						  `
						: html`
								<div class="no-results">
									No motorcycles found matching your search criteria.
								</div>
						  `}

					<div class="button-container">
						<button
							type="button"
							class="btn close-btn"
							@click=${this._closeForm}
						>
							Cancel
						</button>
						<button
							type="button"
							class="btn submit-btn"
							@click=${this._handleSelection}
							?disabled=${this.selectedIndex === undefined}
						>
							View Specifications
						</button>
					</div>
				</div>
			</div>
		`;
	}

	updated(changedProps) {
		if (changedProps.has("bikeData") && this.bikeData.length > 0) {
			this.visible = true;
			this.style.display = "block";
			this.selectedIndex = undefined; // Reset selection when new data arrives
		}
	}

	_selectBike(index) {
		this.selectedIndex = index;
	}

	_handleKeyboardSelection(event, index) {
		// Handle keyboard events for accessibility
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			this._selectBike(index);
		}
	}

	_handleSelection() {
		if (this.selectedIndex !== undefined) {
			const selectedBike = this.bikeData[this.selectedIndex];
			this._updateDisplayArea(selectedBike);
			this._updateNavBar(selectedBike);
			this._updatePreviousSearches(selectedBike);
			this._closeForm();
		}
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
