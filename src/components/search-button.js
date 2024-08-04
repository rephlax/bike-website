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
      padding: 12px 24px;
      border-radius: 4px; /* Optional: adds slightly rounded corners */
    }
    .search-btn {
      background-color: var(--background-color);
      color: var(--primary-color);
      padding: 12px 24px;
      background-image: url(src/assets/favicons/icons8-search.svg);
      background-repeat: no-repeat;
      background-position: right 20px center;
      box-shadow: 0 4px 8px var(--box-shadow-color);
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
      <button
        class="search-btn btn"
        @click=${this._openSearchForm}
        aria-label="Search"
      >
        Search
      </button>
    `;
  }

  _openSearchForm() {
    const searchForm = document.querySelector('search-form');
    if (searchForm) {
      searchForm.style.display = 'block';
      searchForm.setAttribute('aria-hidden', 'false');
      // Move focus to the first input in the search form
      const firstInput = searchForm.shadowRoot.getElementById('make');
      if (firstInput) {
        firstInput.focus();
      }
    }
  }
}

customElements.define('search-button', SearchButton);