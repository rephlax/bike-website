import { LitElement, html, css } from "lit";

class PreviousSearches extends LitElement {
	static get properties() {
		return { searches: { type: Array } };
	}

	constructor() {
		super();
		this.searches = [];
	}

	static get styles() {
		return css`
			:host {
				display: block;
				margin-bottom: 50px;
				font-weight: 300;
				line-height: 1.9;
				font-size: 1.406rem;
			}

			::selection {
				background-color: var(--primary-color);
				color: var(--secondary-color);
			}

			::-moz-selection {
				background-color: var(--primary-color);
				color: var(--secondary-color);
			}

			.searches {
				display: flex;
				gap: 16px;
				overflow-x: auto;
				padding: 16px;
			}

			.card {
				position: relative;
				border-radius: var(--border-radius);
				padding: 20px;
				background: var(--surface-color);
				color: var(--text-primary);
				cursor: pointer;
				min-width: 200px;
				box-shadow: var(--box-shadow);
				transition: all 0.3s ease;
				overflow: hidden;
			}

			.card::after {
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 3px;
				background: linear-gradient(
					to right,
					var(--primary-color),
					var(--accent-color)
				);
				transform: scaleX(0);
				transform-origin: left;
				transition: transform 0.3s ease;
			}

			.card:hover {
				background: var(--secondary-color);
				transform: translateY(-2px);
			}

			.card:hover::after {
				transform: scaleX(1);
			}

			.card:focus {
				outline: 2px solid var(--primary-color);
				background: var(--secondary-color);
			}

			.card h3 {
				margin: 0 0 8px;
				font-size: 1.2rem;
			}

			.card p {
				margin: 0;
				font-size: 0.875rem;
				color: var(--text-secondary-color);
			}

			.card-container {
				display: flex;
				align-items: center;
			}
		`;
	}

	render() {
		return html`
			<div class="searches" role="list">
				${this.searches.map(
					(search, index) => html`
						<div
							class="card"
							@click=${() => this._selectSearch(index)}
							tabindex="0"
							role="listitem"
							@keydown=${(e) => this._handleKeyDown(e, index)}
							aria-label="Previous search for ${search.make} ${search.model} on ${search.date}"
						>
							<div class="card-container">
								<div>
									<h3>${search.make} ${search.model}</h3>
									<p>${search.date}</p>
								</div>
							</div>
						</div>
					`
				)}
			</div>
		`;
	}

	_addSearch(search) {
		if (this.searches.length >= 3) {
			this.searches = this.searches.slice(1);
		}
		this.searches = [
			...this.searches,
			{ ...search, date: new Date().toLocaleString() },
		];
	}

	_selectSearch(index) {
		const selectedSearch = this.searches[index];
		const event = new CustomEvent("search-selected", {
			detail: { search: selectedSearch },
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(event);
	}

	_handleKeyDown(event, index) {
		if (event.key === "Enter" || event.key === " ") {
			this._selectSearch(index);
		}
	}
}

customElements.define("previous-searches", PreviousSearches);
