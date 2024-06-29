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
        margin-bottom: 16px;
      }
      .searches {
        display: flex;
        gap: 16px;
      }
      .card {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 16px;
        background: white;
        color: black;
        cursor: pointer;
        flex: 1;
      }
      .card:hover {
        background: #f9f9f9;
      }
    `;
  }

  render() {
    return html`
      <div class="searches">
        ${this.searches.map(
          (search, index) => html`
            <div class="card" @click=${() => this._selectSearch(index)}>
              <h3>${search.make} ${search.model}</h3>
              <p>${search.date}</p>
            </div>
          `
        )}
      </div>
    `;
  }

  addSearch(search) {
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
}

customElements.define('previous-searches', PreviousSearches);