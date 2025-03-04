import { LitElement, html, css } from "lit";

class SearchButton extends LitElement {
	static styles = css`
		:host {
			display: inline-block;
		}

		.btn {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			padding: 0.75rem 1.25rem;
			border: none;
			border-radius: 8px;
			font-weight: 500;
			font-size: 0.95rem;
			letter-spacing: 0.025em;
			text-transform: uppercase;
			transition: all 0.3s ease;
			cursor: pointer;
			background-color: var(--primary-color, #2d3142);
			color: var(--secondary-color, white);
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
			position: relative;
			overflow: hidden;
			outline: none;
		}

		.btn:hover {
			transform: translateY(-2px);
			box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
		}

		.btn:active {
			transform: translateY(0);
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

		.btn:focus-visible {
			outline: 2px solid var(--accent-color, #ff9f1c);
			outline-offset: 2px;
		}

		svg {
			width: 18px;
			height: 18px;
			fill: currentColor;
			transition: transform 0.3s ease;
		}

		.btn:hover svg {
			transform: scale(1.1);
		}

		@keyframes pulse {
			0% {
				box-shadow: 0 0 0 0 rgba(var(--primary-color-rgb, 45, 49, 66), 0.4);
			}
			70% {
				box-shadow: 0 0 0 10px rgba(var(--primary-color-rgb, 45, 49, 66), 0);
			}
			100% {
				box-shadow: 0 0 0 0 rgba(var(--primary-color-rgb, 45, 49, 66), 0);
			}
		}

		.btn.pulse {
			animation: pulse 1.5s infinite;
		}
	`;

	constructor() {
		super();
		this.pulseAnimation = false;
	}

	firstUpdated() {
		// Add pulse animation after a delay to draw attention to the search button
		setTimeout(() => {
			const btn = this.shadowRoot.querySelector(".btn");
			btn.classList.add("pulse");

			setTimeout(() => {
				btn.classList.remove("pulse");
			}, 4500); // 3 x 1.5s animation
		}, 1000);
	}

	render() {
		return html`
			<button
				class="btn"
				@click=${this._openSearchForm}
				aria-label="Search for motorcycle specifications"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					aria-hidden="true"
					focusable="false"
				>
					<path
						d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
					/>
				</svg>
				<span>Search</span>
			</button>
		`;
	}

	_openSearchForm() {
		const searchForm = document.querySelector("search-form");
		if (searchForm) {
			searchForm.style.display = "block";
			searchForm.visible = true;
			searchForm.setAttribute("aria-hidden", "false");

			// Move focus to the first input in the search form
			setTimeout(() => {
				const firstInput = searchForm.shadowRoot.getElementById("make");
				if (firstInput) {
					firstInput.focus();
				}
			}, 300);
		}
	}
}

customElements.define("search-button", SearchButton);
