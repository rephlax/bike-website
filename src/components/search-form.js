import { LitElement, html, css } from 'lit';

class SearchForm extends LitElement {
  static styles = css`
    :host {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--background-color);
      padding: 1rem;
      box-shadow: 0 2px 10px var(--box-shadow-color);
      color: var(--primary-color);
      z-index: 1000;
      font-weight: 300;
      line-height: 1.9;
      font-size: 1.406rem;
      max-width: 90%; /* Ensure the modal doesn't exceed 90% of the viewport width */
      overflow: hidden; /* Prevent content overflow */
    }

    .loading-spinner {
      margin-top: 50px;
      border: 16px solid var(--secondary-color);
      border-top: 16px solid var(--primary-color);
      border-radius: 50%;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
      display: none;
    }

    .spinner-grid {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-text {
      margin-top: 20px;
      font-size: 1.2rem;
      display: none;
    }

    .button-container {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 20px;
    }

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
      transition: transform 180ms, opacity 180ms;
      opacity: 0.8;
      padding: 10px 20px;
      border-radius: 4px;
    }

    .submit-btn {
      background-color: var(--background-color);
      color: var(--primary-color);
      box-shadow: 0 3px 6px var(--box-shadow-color);
    }

    .close-btn {
      background-color: var(--background-color);
      color: var(--primary-color);
      box-shadow: 0 4px 8px var(--box-shadow-color);
    }

    .btn:hover {
      opacity: 1;
    }

    .btn:active {
      transform: translate(1px, 1px);
    }

    .form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      width: 100%; /* Ensure form container takes full width */
    }

    .form-row {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 300px;
      gap: 0.5rem;
      box-sizing: border-box;
    }

    label, input {
      width: 100%;
      font-size: 0.875rem;
    }

    input {
      padding: 0.5rem;
      border: 1px solid var(--secondary-color);
      border-radius: 4px;
      font-size: 0.875rem;
      box-sizing: border-box;
    }

    @media (max-width: 600px) {
      :host {
        width: 90%;
        padding: 1rem;
      }
      .btn {
        font-size: 1rem;
      }
      .button-container {
        flex-direction: column;
      }
      .form-row {
        max-width: 100%; /* Ensure form rows don't exceed 100% width on small screens */
      }
    }

    h2 {
      text-align: center;
      width: 100%;
      margin-bottom: 1rem;
    }
  `;

  render() {
    return html`
      <div id="search-form" role="dialog" aria-labelledby="search-form-title" aria-describedby="search-form-description" aria-hidden="true">
        <form @submit=${this._handleSubmit} class="form-container">
          <h2 id="search-form-title">Search</h2>
          <p id="search-form-description">Enter the make and model of the bike you want to search for.</p>
          <div class="form-row">
            <label for="make">Make:</label>
            <input type="text" id="make" name="make" required minlength="2" pattern="[A-Za-z0-9\\s]+" title="Make should be alphanumeric.">
          </div>
          <div class="form-row">
            <label for="model">Model:</label>
            <input type="text" id="model" name="model" required minlength="2" pattern="[A-Za-z0-9\\s]+" title="Model should be alphanumeric.">
          </div>
          <div class="button-container">
            <button type="submit" class="btn submit-btn">Submit</button>
            <button type="button" class="btn close-btn" @click=${this._closeForm}>Close</button>
          </div>
        </form>
        <div class="spinner-grid">
          <div class="loading-spinner"></div>
          <div class="loading-text">Loading...</div>
        </div>
      </div>
    `;
  }

  _validateInput(input) {
    if (!input.validity.valid) {
      if (input.validity.valueMissing) {
        input.setCustomValidity('This field is required.');
      } else if (input.validity.patternMismatch) {
        input.setCustomValidity('Please enter a valid value.');
      } else if (input.validity.tooShort) {
        input.setCustomValidity('The value is too short.');
      }
    } else {
      input.setCustomValidity('');
    }
  }

  _handleSubmit(event) {
    event.preventDefault();
    const makeInput = this.shadowRoot.getElementById('make');
    const modelInput = this.shadowRoot.getElementById('model');

    this._validateInput(makeInput);
    this._validateInput(modelInput);

    if (makeInput.validity.valid && modelInput.validity.valid) {
      this._showLoadingSpinner(true);

      fetch(`/.netlify/functions/getBikeData?make=${makeInput.value}&model=${modelInput.value}`)
        .then(response => response.json())
        .then(data => {
          this._showLoadingSpinner(false);

          if (data.length === 0) {
            alert('No bikes found. Please try a different search.');
          } else {
            this._showSelectionScreen(data);
            makeInput.value = '';
            modelInput.value = '';
          }
        })
        .catch(error => {
          this._showLoadingSpinner(false);
          console.error('Error fetching data:', error);
        });
    }
  }

  _showLoadingSpinner(show) {
    const loadingSpinner = this.shadowRoot.querySelector('.loading-spinner');
    const loadingText = this.shadowRoot.querySelector('.loading-text');
    loadingSpinner.style.display = show ? 'block' : 'none';
    loadingText.style.display = show ? 'block' : 'none';
  }

  _showSelectionScreen(data) {
    const selectionScreen = document.querySelector('selection-screen');
    if (selectionScreen) {
      selectionScreen.bikeData = data;
      selectionScreen.style.display = 'block';
      selectionScreen.setAttribute('aria-hidden', 'false');
    }
    this._closeForm();
  }

  _closeForm() {
    this.style.display = 'none';
    this.setAttribute('aria-hidden', 'true');
  }
}

customElements.define('search-form', SearchForm);