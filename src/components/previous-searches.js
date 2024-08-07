import { LitElement, html, css } from 'lit';

class CardGrid extends LitElement {
  constructor() {
    super();
    this.cards = [];
  }

  static get properties() {
    return {
      cards: { type: Array }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
        margin: 0 auto;
      }

      .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }

      .card {
        background-color: var(--secondary-color);
        border: 1px solid var(--primary-color);
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 4px 8px var(--box-shadow-color);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .card-content {
        flex-grow: 1;
      }

      .card-footer {
        margin-top: 16px;
        text-align: right;
      }

      @media (max-width: 1024px) {
        .grid-container {
          grid-template-columns: 1fr 1fr;
        }
      }

      @media (max-width: 600px) {
        .grid-container {
          grid-template-columns: 1fr;
        }
      }
    `;
  }

  render() {
    return html`
      <div class="grid-container">
        ${this.cards.map(card => html`
          <div class="card">
            <div class="card-content">
              <h2>${card.title}</h2>
              <p>${card.description}</p>
            </div>
            <div class="card-footer">
              <button @click="${() => this._handleCardAction(card)}">Action</button>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  _handleCardAction(card) {
    this.dispatchEvent(new CustomEvent('card-action', {
      detail: { card },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('card-grid', CardGrid);