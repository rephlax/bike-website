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
      main {
        padding-top: 60px; /* Adjust the value to match the height of your navbar */
      }  
      .searches {
        display: flex;
        gap: 16px;
      }
      .card {
        border-radius: 4px;
        padding: 16px;
        background: var(--background-color);
        color: var(--primary-color);
        cursor: pointer;
        flex: 1;
        box-shadow: 0 4px 8px var(--box-shadow-color),
                    inset 0 4px 8px var(--box-shadow-color);
      }
      .card:hover {
        background: var(--secondary-color);
      }
      .card:focus {
        outline: 2px solid var(--primary-color);
        background: var(--secondary-color);
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
              <h3>${search.make} ${search.model}</h3>
              <p>${search.date}</p>
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
    this.searches = [...this.searches, { ...search, date: new Date().toLocaleString() }];
  }

  _selectSearch(index) {
    const selectedSearch = this.searches[index];
    const event = new CustomEvent('search-selected', {
      detail: { search: selectedSearch },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _handleKeyDown(event, index) {
    if (event.key === 'Enter' || event.key === ' ') {
      this._selectSearch(index);
    }
  }
}

customElements.define('previous-searches', PreviousSearches);