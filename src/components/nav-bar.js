import { LitElement, html, css } from 'lit';

class NavBar extends LitElement {
  static get properties() {
    return {
      manufacturerUrl: { type: String },
      bikeSelected: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.manufacturerUrl = '';
    this.bikeSelected = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        background-color: #333;
        color: white;
        padding: 10px 0;
      }
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
      }
      .navbar svg {
        width: 30px;
        height: 30px;
        fill: white;
      }
      .navbar button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 16px;
        margin-left: 20px;
      }
      .navbar button:disabled {
        color: gray;
        cursor: not-allowed;
      }
      .navbar a {
        color: white;
        text-decoration: none;
      }
      @media (max-width: 37.5rem) {
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
      <div class="navbar">
        <svg viewBox="0 0 64 64">
          <path d="M32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0zm0 60C16.561 60 4 47.439 4 32S16.561 4 32 4s28 12.561 28 28-12.561 28-28 28z"/>
          <path d="M32 14c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18zm0 32c-7.732 0-14-6.268-14-14s6.268-14 14-14 14 6.268 14 14-6.268 14-14 14z"/>
          <path d="M32 22c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zm0 16c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"/>
        </svg>
        <slot name="search-button"></slot>
        <button ?disabled=${!this.bikeSelected} @click=${this._goToManufacturer}>Manufacturer</button>
      </div>
    `;
  }

  _goToManufacturer() {
    if (this.manufacturerUrl) {
      window.open(this.manufacturerUrl, '_blank');
    }
  }
}

customElements.define('nav-bar', NavBar);
