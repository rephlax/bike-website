import { LitElement, html, css } from "lit";

class DisplayArea extends LitElement {
	constructor() {
		super();
		this.bikeData = {};
	}

	static get properties() {
		return {
			bikeData: { type: Object },
		};
	}

	updated(changedProperties) {
		if (changedProperties.has("bikeData") && this.bikeData.make) {
			const brandLower = this.bikeData.make?.toLowerCase() || "";
			this.classList.forEach((cls) => {
				if (cls !== "hydrated") {
					this.classList.remove(cls);
				}
			});
			if (brandLower) {
				this.classList.add(brandLower);
			}
		}

		if (changedProperties.has("bikeData")) {
			this.dispatchEvent(
				new CustomEvent("bike-data-changed", {
					detail: { bike: this.bikeData },
					bubbles: true,
					composed: true,
				})
			);
		}
	}

	static get styles() {
		return css`
			:host {
				display: block;
				padding: 32px;
				border-radius: 16px;
				background-color: #ffffff;
				margin: 32px auto;
				max-width: 1200px;
				font-weight: 400;
				line-height: 1.6;
				font-size: 1rem;
				box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
			}

			::selection {
				background-color: var(--primary-color, #2d3142);
				color: var(--secondary-color, #ffffff);
			}

			::-moz-selection {
				background-color: var(--primary-color, #2d3142);
				color: var(--secondary-color, #ffffff);
			}

			.container {
				display: grid;
				grid-template-rows: auto 1fr;
				gap: 32px;
			}

			.brand-header {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 40px;
				padding-bottom: 24px;
				position: relative;
			}

			.brand-header::after {
				content: "";
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 100px;
				height: 3px;
				background-color: #f0f0f0;
				border-radius: 2px;
			}

			.brand-header h2 {
				margin: 0;
				font-size: 2.5rem;
				font-weight: 700;
				color: #333;
				text-align: center;
			}

			.brand-logo {
				width: 72px;
				height: 72px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				background-color: #ffffff;
				box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
				padding: 16px;
				margin-right: 20px;
				box-sizing: border-box;
			}

			.brand-logo svg {
				width: 100%;
				height: 100%;
			}

			/* Brand-specific logo colors */
			.brand-logo.honda svg {
				fill: #cc0000;
			}
			.brand-logo.kawasaki svg {
				fill: #28a745;
			}
			.brand-logo.yamaha svg {
				fill: #2a48a1;
			}
			.brand-logo.ducati svg {
				fill: #cc0000;
			}
			.brand-logo.bmw svg {
				fill: #0d8db3;
			}
			.brand-logo.suzuki svg {
				fill: #1e45a0;
			}

			.specs {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
				gap: 24px;
			}

			@keyframes fadeIn {
				from {
					opacity: 0;
					transform: translateY(15px);
				}
				to {
					opacity: 1;
					transform: translateY(0);
				}
			}

			.spec {
				display: flex;
				flex-direction: column;
				font-size: 1rem;
				padding: 28px;
				border-radius: 12px;
				background-color: #ffffff;
				box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03),
					0 1px 5px rgba(0, 0, 0, 0.05);
				transition: transform 0.3s ease, box-shadow 0.3s ease;
				overflow: hidden;
				animation: fadeIn 0.5s ease forwards;
				animation-delay: calc(var(--index) * 0.1s);
				opacity: 0;
				position: relative;
			}

			.spec:hover {
				transform: translateY(-3px);
				box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07),
					0 1px 5px rgba(0, 0, 0, 0.05);
			}

			/* Brand-specific accent colors */
			.spec::before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				height: 4px;
				background-color: #f0f0f0;
			}

			:host(.honda) .spec::before {
				background-color: #cc0000;
			}
			:host(.kawasaki) .spec::before {
				background-color: #28a745;
			}
			:host(.yamaha) .spec::before {
				background-color: #2a48a1;
			}
			:host(.ducati) .spec::before {
				background-color: #cc0000;
			}
			:host(.bmw) .spec::before {
				background-color: #0d8db3;
			}
			:host(.suzuki) .spec::before {
				background-color: #1e45a0;
			}

			.spec-title {
				margin: 0 0 24px 0;
				font-size: 1.5rem;
				font-weight: 600;
				color: #333;
				position: relative;
				padding-bottom: 12px;
			}

			.spec-title::after {
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				width: 40px;
				height: 2px;
				background-color: #ddd;
			}

			.spec-content {
				display: grid;
				grid-template-columns: 1fr 1.5fr;
				gap: 12px;
				align-items: baseline;
			}

			dl {
				margin: 0;
			}

			dt,
			dd {
				margin: 0;
				padding: 8px 0;
				text-align: left;
			}

			dt {
				font-weight: 600;
				color: #666;
				font-size: 0.95rem;
			}

			dd {
				margin-left: 0;
				color: #333;
			}

			/* Empty state styling */
			.empty-state {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 5rem 2rem;
				background: #ffffff;
				border-radius: 12px;
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
				text-align: center;
			}

			.motorcycle-icon {
				width: 96px;
				height: 96px;
				fill: #ddd;
				margin-bottom: 2rem;
			}

			.init-text {
				font-size: 1.4rem;
				color: #666;
				margin-bottom: 2.5rem;
				max-width: 500px;
			}

			.search-prompt-btn {
				display: inline-flex;
				align-items: center;
				gap: 0.5rem;
				padding: 0.9rem 1.8rem;
				background-color: #333;
				color: #ffffff;
				border: none;
				border-radius: 8px;
				font-weight: 500;
				cursor: pointer;
				transition: all 0.3s ease;
				font-size: 1rem;
			}

			.search-prompt-btn:hover {
				background-color: #555;
				transform: translateY(-2px);
			}

			.search-prompt-btn svg {
				fill: currentColor;
			}

			@media (max-width: 768px) {
				:host {
					padding: 20px;
					margin: 16px;
				}

				.specs {
					grid-template-columns: 1fr;
				}

				.brand-header h2 {
					font-size: 1.8rem;
				}

				.brand-logo {
					width: 56px;
					height: 56px;
				}

				.spec {
					padding: 20px;
				}
			}
		`;
	}

	render() {
		return html`
			<div
				class="container"
				role="region"
				aria-labelledby="bike-specifications-title"
			>
				${this.bikeData.make
					? html`
							<div class="brand-header">
								<div class="brand-logo ${this.bikeData.make?.toLowerCase()}">
									${this._renderBrandIcon(this.bikeData.make)}
								</div>
								<h2>${this.bikeData.make} ${this.bikeData.model}</h2>
							</div>

							<div class="specs">
								${this._renderSpecSection(
									"Engine",
									this._renderSpecs([
										{ label: "Type", value: this.bikeData.engine },
										{
											label: "Displacement",
											value: this.bikeData.displacement,
										},
										{
											label: "Bore x stroke",
											value: this.bikeData.bore_stroke,
										},
										{
											label: "Compression ratio",
											value: this.bikeData.compression,
										},
										{
											label: "Valves",
											value: this.bikeData.valves_per_cylinder,
										},
										{ label: "Fuel system", value: this.bikeData.fuel_system },
										{ label: "Ignition", value: this.bikeData.ignition },
										{ label: "Lubrication", value: this.bikeData.lubrication },
									]),
									0
								)}
								${this._renderSpecSection(
									"Brakes & Suspension",
									this._renderSpecs([
										{
											label: "Front brakes",
											value: this.bikeData.front_brakes,
										},
										{ label: "Rear brakes", value: this.bikeData.rear_brakes },
										{
											label: "Front suspension",
											value: this.bikeData.front_suspension,
										},
										{
											label: "Rear suspension",
											value: this.bikeData.rear_suspension,
										},
									]),
									1
								)}
								${this._renderSpecSection(
									"Performance and Transmission",
									this._renderSpecs([
										{ label: "Power", value: this.bikeData.power },
										{ label: "Torque", value: this.bikeData.torque },
										{
											label: "Transmission",
											value: this.bikeData.transmission,
										},
										{ label: "Clutch", value: this.bikeData.clutch },
										{ label: "Gearbox", value: this.bikeData.gearbox },
									]),
									2
								)}
								${this._renderSpecSection(
									"Frame and Dimensions",
									this._renderSpecs([
										{ label: "Frame", value: this.bikeData.frame },
										{
											label: "Front wheel travel",
											value: this.bikeData.front_wheel_travel,
										},
										{
											label: "Rear wheel travel",
											value: this.bikeData.rear_wheel_travel,
										},
										{ label: "Front tyre", value: this.bikeData.front_tire },
										{ label: "Rear tyre", value: this.bikeData.rear_tire },
										{ label: "Seat height", value: this.bikeData.seat_height },
										{
											label: "Total height",
											value: this.bikeData.total_height,
										},
										{
											label: "Total length",
											value: this.bikeData.total_length,
										},
										{
											label: "Ground clearance",
											value: this.bikeData.ground_clearance,
										},
										{
											label: "Fuel capacity",
											value: this.bikeData.fuel_capacity,
										},
										{
											label: "Total weight",
											value: this.bikeData.total_weight,
										},
									]),
									3
								)}
							</div>
					  `
					: html`
							<div class="title" id="bike-specifications-title">
								Motorcycle Specifications
							</div>

							<div class="empty-state">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="#ddd"
									stroke="#ddd"
									stroke-linecap="round"
									stroke-linejoin="round"
									width="96"
									height="96"
									stroke-width="2"
								>
									<path d="M5 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
									<path d="M19 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
									<path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4"></path>
									<path d="M13 6h2l1.5 3l2 4"></path>
								</svg>
								<p class="init-text">
									Search for a motorcycle to view detailed specifications
								</p>
								<button
									class="search-prompt-btn"
									@click=${this._openSearchForm}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										viewBox="0 0 24 24"
									>
										<path
											d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
										/>
									</svg>
									Start Searching
								</button>
							</div>
					  `}
			</div>
		`;
	}

	_renderSpecSection(title, specs, index) {
		return html`
			<div class="spec" style="--index: ${index}">
				<h3 class="spec-title">${title}</h3>
				<div class="spec-content">${specs}</div>
			</div>
		`;
	}

	_renderSpec(label, value) {
		return value
			? html`
					<dt>${label}</dt>
					<dd>${value}</dd>
			  `
			: "";
	}

	_renderSpecs(specsArray) {
		return specsArray.map((spec) => this._renderSpec(spec.label, spec.value));
	}

	_renderBrandIcon(brand) {
		const brandLower = brand?.toLowerCase() || "";

		// Return specific SVG icons for common motorcycle brands
		if (brandLower === "honda") {
			return html`<svg viewBox="0 0 24 24">
				<path
					d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"
				/>
			</svg>`;
		} else if (brandLower === "kawasaki") {
			return html`<svg viewBox="0 0 24 24">
				<path
					d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M19.31,15.94L16.33,13H13.75L10.77,15.94H8.17L11.5,12.66L8.17,9.36H10.77L13.75,12.36H16.33L19.31,9.36H21.96L18.5,12.64L21.96,15.94H19.31Z"
				/>
			</svg>`;
		} else if (brandLower === "yamaha") {
			return html`<svg viewBox="0 0 24 24">
				<path
					d="M19.04,4.82L17.35,4.5L12.04,13.75L6.73,4.5L5.04,4.82L12.04,16.86L19.04,4.82M20.47,2L17.93,2L15.97,2L12.04,9.33L8.1,2L6.16,2L3.58,2L2,2.18L3.8,5.5H5.04L2,14.99L4.4,19.34L3.58,22L4.64,22L7.47,16L12.04,23.92L16.61,16L19.43,22L20.5,22L19.68,19.34L22.08,14.99L19.04,5.5H20.28L22.08,2.18L20.47,2Z"
				/>
			</svg>`;
		} else if (brandLower === "ducati") {
			return html`<svg viewBox="0 0 24 24">
				<path
					d="M12,3C16.97,3 21,7.03 21,12V13.5H18V12A6,6 0 0,0 12,6A6,6 0 0,0 6,12C6,14.97 8.16,17.43 11,17.92V15H13V19.92C16.95,19.4 20,16.08 20,12H23A11,11 0 0,1 12,23A11,11 0 0,1 1,12A11,11 0 0,1 12,1"
				/>
			</svg>`;
		} else if (brandLower === "bmw") {
			return html`<svg viewBox="0 0 24 24">
				<path
					d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M9,8H11V10H9V8M13,8H15V10H13V8M13,14H15V16H13V14M9,14H11V16H9V14Z"
				/>
			</svg>`;
		} else if (brandLower === "harley-davidson") {
			return html`<svg viewBox="0 0 24 24">
				<path
					d="M15.4,19L16.7,15.3C16.9,14.8 16.7,14.2 16.2,14C15.7,13.8 15.1,14 14.9,14.5L13.6,18.2L10.6,14L12.7,12.2L11.8,10.4L14,9.2L13,7.5L10.5,8.8L9.6,7L6.1,9.3L7,11.1L8.3,10.3L9.2,12.1L6.6,14.3L7.5,16.1L8.3,15.8L9.1,18.1L11.5,16.7L12.3,18.4L15.4,19M22,12A10,10 0 0,0 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12Z"
				/>
			</svg>`;
		} else if (brandLower === "suzuki") {
			return html`<svg viewBox="0 0 24 24">
				<path
					d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M7,10L12,15L17,10H7Z"
				/>
			</svg>`;
		}

		// Default motorcycle icon for other brands
		return html`<svg viewBox="0 0 24 24">
			<path
				d="M17.5,3C18.9,3 20,4.1 20,5.5C20,6.9 18.9,8 17.5,8C16.1,8 15,6.9 15,5.5C15,4.1 16.1,3 17.5,3M22,10H23V16H22V10M11.5,6C12.9,6 14,7.1 14,8.5C14,9.9 12.9,11 11.5,11C10.1,11 9,9.9 9,8.5C9,7.1 10.1,6 11.5,6M8,10H9.5L13.5,14H13V21H11V14H4L8,10M10,5.5C10,4.1 11.1,3 12.5,3C13.9,3 15,4.1 15,5.5C15,6.9 13.9,8 12.5,8C11.1,8 10,6.9 10,5.5M1,10H2V16H1V10Z"
			/>
		</svg>`;
	}

	_openSearchForm() {
		const searchForm = document.querySelector("search-form");
		if (searchForm) {
			searchForm.style.display = "block";
			searchForm.visible = true;
			searchForm.setAttribute("aria-hidden", "false");

			// Move focus to the first input after a short delay for the animation
			setTimeout(() => {
				const firstInput = searchForm.shadowRoot.getElementById("make");
				if (firstInput) {
					firstInput.focus();
				}
			}, 300);
		}
	}

	clearSpecs() {
		this.bikeData = {};
	}

	connectedCallback() {
		super.connectedCallback();
		window.addEventListener("open-search-form", this.clearSpecs.bind(this));
		window.addEventListener(
			"search-selected",
			this._handleSearchSelected.bind(this)
		);
	}

	disconnectedCallback() {
		window.removeEventListener("open-search-form", this.clearSpecs.bind(this));
		window.removeEventListener(
			"search-selected",
			this._handleSearchSelected.bind(this)
		);
		super.disconnectedCallback();
	}

	_handleSearchSelected(event) {
		this.bikeData = event.detail.search;
		this.style.display = "block";
	}
}

customElements.define("display-area", DisplayArea);
