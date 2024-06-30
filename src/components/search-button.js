import { LitElement, html, css } from 'lit';

class SearchButton extends LitElement {
  static styles = css`
    .btn {
      all: unset;
      outline: revert;
      box-sizing: border-box;
      display: inline-block;
      cursor: pointer;
      font-size: 0.88rem;
      line-height: 1.5;
      letter-spacing: 2px;
      font-weight: 600;
      text-transform: uppercase;
      transition: translate 180ms, opacity 180ms;
      opacity: 0.8;
    }
    .search-btn {
      background-color: var(--background-color);
      color: var(--primary-color);
      padding: 12px 24px 12px 24px;
      background-image: url(src/assets/favicons/icons8-search.svg);
      background-repeat: no-repeat;
      background-position: right 20px center;
      border-color: var(--secondary-color);
    }
    .btn:hover {
      opacity: 1;
  }
  
  .btn:active {
      translate: 1px 1px;
  }
  `;

  render() {
    return html`
      <button class="search-btn btn" @click=${this._openSearchForm}>Search</button>
    `;
  }

  _openSearchForm() {
    const searchForm = document.querySelector('search-form');
    searchForm.style.display = 'block';
  }
}

customElements.define('search-button', SearchButton);