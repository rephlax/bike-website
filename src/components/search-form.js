import { LitElement, html, css } from "lit";

class SearchForm extends LitElement {
	static get properties() {
		return {
			visible: { type: Boolean, reflect: true },
		};
	}

	constructor() {
		super();
		this.visible = false;
	}

	static styles = css`
		:host {
			display: none;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: var(--surface-color, #ffffff);
			color: var(--text-primary, #2d3142);
			z-index: 1000;
			border-radius: 12px;
			box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
			overflow: hidden;
			opacity: 0;
			max-width: 500px;
			width: 90%;
			transition: transform 0.3s ease, opacity 0.3s ease;
		}

		:host([visible]) {
			display: block;
			opacity: 1;
			animation: modalAppear 0.4s forwards;
		}

		@keyframes modalAppear {
			0% {
				transform: translate(-50%, -50%) scale(0.95);
				opacity: 0;
			}
			100% {
				transform: translate(-50%, -50%) scale(1);
				opacity: 1;
			}
		}

		.backdrop {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(4px);
			z-index: -1;
		}

		@keyframes fadeIn {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}

		.header {
			padding: 1.5rem 2rem;
			background: var(--primary-color, #000000);
			color: var(--secondary-color, #ffffff);
			position: relative;
		}

		.header::after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 4px;
			background: linear-gradient(
				to right,
				rgba(255, 255, 255, 0.3),
				transparent
			);
		}

		#search-form-title {
			margin: 0;
			font-size: 1.5rem;
			font-weight: 600;
			line-height: 1.3;
		}

		.content {
			padding: 1.5rem 2rem;
			max-height: 60vh;
			overflow-y: auto;
			background: #ffffff;
			color: #000000;
		}

		#search-form-description {
			margin-top: 0;
			margin-bottom: 1.5rem;
			font-size: 0.95rem;
			color: #4f5d75;
			line-height: 1.5;
			width: 100%;
		}

		.form-container {
			display: flex;
			flex-direction: column;
			width: 100%;
			animation: slideUp 0.5s ease;
			background: #ffffff;
		}

		@keyframes slideUp {
			0% {
				transform: translateY(20px);
				opacity: 0;
			}
			100% {
				transform: translateY(0);
				opacity: 1;
			}
		}

		.form-row {
			margin-bottom: 1.5rem;
			width: 100%;
		}

		label {
			display: block;
			margin-bottom: 0.5rem;
			font-weight: 500;
			font-size: 0.95rem;
			color: #4f5d75;
		}

		.input-wrapper {
			position: relative;
			background: #ffffff;
		}

		.input-wrapper svg {
			position: absolute;
			left: 1rem;
			top: 50%;
			transform: translateY(-50%);
			width: 1.25rem;
			height: 1.25rem;
			fill: #7a8099;
		}

		input {
			box-sizing: border-box;
			max-width: 100%;
			width: 100%;
			padding: 0.85rem 1rem 0.85rem 2.75rem;
			border: 2px solid rgba(0, 0, 0, 0.1);
			border-radius: 8px;
			font-size: 1rem;
			background: #ffffff;
			color: #000000;
			transition: border-color 0.3s, box-shadow 0.3s;
		}

		input:hover {
			border-color: rgba(0, 0, 0, 0.2);
		}

		input:focus {
			outline: none;
			border-color: #000000;
			box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
		}

		.popular-searches {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			margin-bottom: 1.5rem;
		}

		.popular-searches span {
			font-size: 0.85rem;
			color: #777;
			margin-right: 0.5rem;
		}

		.popular-search-tag {
			display: inline-block;
			padding: 0.35rem 0.75rem;
			border-radius: 16px;
			background-color: #f5f5f5;
			color: #333;
			font-size: 0.85rem;
			cursor: pointer;
			transition: all 0.2s ease;
		}

		.popular-search-tag:hover {
			background-color: #e0e0e0;
		}

		.button-container {
			display: flex;
			justify-content: flex-end;
			gap: 1rem;
			margin-top: 0.5rem;
		}

		.btn {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: 0.75rem 1.5rem;
			border: none;
			border-radius: 8px;
			font-weight: 500;
			font-size: 0.95rem;
			letter-spacing: 0.025em;
			text-transform: uppercase;
			transition: all 0.3s ease;
			cursor: pointer;
			position: relative;
			overflow: hidden;
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
			background-color: #000000;
			color: white;
			box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
		}

		.submit-btn:hover {
			background-color: #333333;
			transform: translateY(-2px);
			box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
		}

		.close-btn {
			background-color: transparent;
			color: #2d3142;
			border: 1px solid rgba(0, 0, 0, 0.2);
		}

		.close-btn:hover {
			background-color: rgba(0, 0, 0, 0.05);
			transform: translateY(-2px);
		}

		.loading-container {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(255, 255, 255, 0.95);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			opacity: 0;
			visibility: hidden;
			transition: opacity 0.3s;
			z-index: 10;
			backdrop-filter: blur(2px);
			border-radius: 12px;
		}

		.loading-container.active {
			opacity: 1;
			visibility: visible;
		}

		.loading-spinner {
			width: 40px;
			height: 40px;
			border: 3px solid rgba(0, 0, 0, 0.1);
			border-radius: 50%;
			border-top-color: #000000;
			animation: spin 1s linear infinite;
		}

		.loading-text {
			margin-top: 1rem;
			font-size: 0.95rem;
			font-weight: 500;
			color: #2d3142;
		}

		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}

		@media (max-width: 600px) {
			.header {
				padding: 1.25rem 1.5rem;
			}

			.content {
				padding: 1.5rem;
			}

			.button-container {
				flex-direction: row;
				flex-wrap: wrap;
			}

			.btn {
				flex: 1;
				min-width: 120px;
				font-size: 0.85rem;
				padding: 0.7rem 1rem;
			}
		}
	`;

	render() {
		return html`
			<div class="backdrop" @click=${this._closeForm}></div>
			<div class="header">
				<h2 id="search-form-title">Find Your Motorcycle</h2>
			</div>
			<div class="content">
				<form @submit=${this._handleSubmit} class="form-container">
					<p id="search-form-description">
						Enter the manufacturer and model to search for specifications.
					</p>
					<div class="form-row">
						<label for="make">Manufacturer:</label>
						<div class="input-wrapper">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									d="M12 4C9.24 4 7 6.24 7 9c0 2.85 2.92 7.21 5 9.88 2.12-2.69 5-7 5-9.88 0-2.76-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
								/>
							</svg>
							<input
								type="text"
								id="make"
								name="make"
								required
								minlength="2"
								pattern="[A-Za-z0-9\\s]+"
								title="Manufacturer name should be alphanumeric."
								placeholder="e.g. Honda, Kawasaki, Yamaha"
							/>
						</div>
					</div>
					<div class="popular-searches">
						<span>Popular:</span>
						<div
							class="popular-search-tag"
							@click=${() => this._fillManufacturer("Honda")}
						>
							Honda
						</div>
						<div
							class="popular-search-tag"
							@click=${() => this._fillManufacturer("Kawasaki")}
						>
							Kawasaki
						</div>
						<div
							class="popular-search-tag"
							@click=${() => this._fillManufacturer("Yamaha")}
						>
							Yamaha
						</div>
						<div
							class="popular-search-tag"
							@click=${() => this._fillManufacturer("Suzuki")}
						>
							Suzuki
						</div>
					</div>
					<div class="form-row">
						<label for="model">Model:</label>
						<div class="input-wrapper">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									d="M12 6c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 4 2 8.48 2 14s4.48 10 10 10 10-4.48 10-10S17.52 4 12 4zm0 3c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7z"
								/>
							</svg>
							<input
								type="text"
								id="model"
								name="model"
								required
								minlength="2"
								pattern="[A-Za-z0-9\\s]+"
								title="Model name should be alphanumeric."
								placeholder="e.g. CBR600RR, Ninja 650, YZF-R6"
							/>
						</div>
					</div>
					<div class="button-container">
						<button
							type="button"
							class="btn close-btn"
							@click=${this._closeForm}
						>
							Cancel
						</button>
						<button type="submit" class="btn submit-btn">Search</button>
					</div>
				</form>
			</div>
			<div class="loading-container">
				<div class="loading-spinner"></div>
				<div class="loading-text">Searching for motorcycles...</div>
			</div>
		`;
	}

	_fillManufacturer(make) {
		const makeInput = this.shadowRoot.getElementById("make");
		if (makeInput) {
			makeInput.value = make;
			// Focus the model input after filling the manufacturer
			const modelInput = this.shadowRoot.getElementById("model");
			if (modelInput) modelInput.focus();
		}
	}

	updated() {
		if (this.style.display === "block") {
			this.visible = true;
			this.setAttribute("aria-hidden", "false");
		} else if (this.style.display === "none") {
			this.visible = false;
			this.setAttribute("aria-hidden", "true");
		}
	}

	_validateInput(input) {
		if (!input.validity.valid) {
			if (input.validity.valueMissing) {
				input.setCustomValidity("This field is required.");
			} else if (input.validity.patternMismatch) {
				input.setCustomValidity("Please enter a valid value.");
			} else if (input.validity.tooShort) {
				input.setCustomValidity("The value is too short.");
			}
		} else {
			input.setCustomValidity("");
		}
	}

	_handleSubmit(event) {
		event.preventDefault();
		const makeInput = this.shadowRoot.getElementById("make");
		const modelInput = this.shadowRoot.getElementById("model");

		this._validateInput(makeInput);
		this._validateInput(modelInput);

		if (makeInput.validity.valid && modelInput.validity.valid) {
			this._showLoadingSpinner(true);

			fetch(
				`/.netlify/functions/getBikeData?make=${makeInput.value}&model=${modelInput.value}`
			)
				.then((response) => response.json())
				.then((data) => {
					this._showLoadingSpinner(false);

					if (data.length === 0) {
						alert("No motorcycles found. Please try a different search.");
					} else {
						this._showSelectionScreen(data);
						makeInput.value = "";
						modelInput.value = "";
					}
				})
				.catch((error) => {
					this._showLoadingSpinner(false);
					console.error("Error fetching data:", error);
					alert("An error occurred during the search. Please try again.");
				});
		}
	}

	_showLoadingSpinner(show) {
		const loadingContainer =
			this.shadowRoot.querySelector(".loading-container");
		if (show) {
			loadingContainer.classList.add("active");
		} else {
			loadingContainer.classList.remove("active");
		}
	}

	_showSelectionScreen(data) {
		const selectionScreen = document.querySelector("selection-screen");
		if (selectionScreen) {
			selectionScreen.bikeData = data;
			selectionScreen.visible = true;
		}
		this._closeForm();
	}

	_closeForm() {
		this.style.display = "none";
		this.visible = false;
		this.setAttribute("aria-hidden", "true");
	}
}

customElements.define("search-form", SearchForm);
