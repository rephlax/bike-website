import { LitElement, html, css } from 'lit';

class SearchForm extends LitElement {
  static styles = css`
    /* Add your form styles here */
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
    }

    .loading-spinner {
      border: 16px solid var(--secondary-color);
      border-top: 16px solid var(--primary-color);
      border-radius: 50%;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
      display: none; /* Initially hidden */
    }

    .spinner-grid {
      display: flex;
      justify-content: center;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-text {
      display: none; /* Initially hidden */
    }
  `;

  static properties = {
    apiKey: {type: String}
  };

  constructor(){
    super();
    this.apiKey = `A9yM8BGGGL2GMzfEs62D4w==JWYSxzxgbHm3hiVd`;
  }

  render() {
    return html`
      <div id="search-form">
        <form @submit=${this._handleSubmit}>
          <label for="make">Make:</label>
          <input type="text" id="make" name="make" required minlength="2" pattern="[A-Za-z0-9/s]+" title="Make should be alphanumeric.">
          <label for="model">Model:</label>
          <input type="text" id="model" name="model" required minlength="2" pattern="[A-Za-z0-9/s]+" title="Model should be alphanumeric.">
          <button type="submit">Submit</button>
          <button type="button" @click=${this._closeForm}>Close</button>
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
        // Show loading indicator
        const loadingSpinner = this.shadowRoot.querySelector('.loading-spinner');
        const loadingText = this.shadowRoot.querySelector('.loading-text');
        loadingSpinner.style.display = 'block';
        loadingText.style.display = 'block';

        fetch(`https://api.api-ninjas.com/v1/motorcycles?make=${makeInput.value}&model=${modelInput.value}`, {
            headers: { 'X-Api-Key': this.apiKey }
        })
        .then(response => response.json())
        .then(data => {
            // Hide loading indicator
            loadingSpinner.style.display = 'none';
            loadingText.style.display = 'none';

            if (data.length === 0) {
                // No results found
                alert('No bikes found. Please try a different search.');
            } else {
                // Process data and show selection screen
                const selectionScreen = document.querySelector('selection-screen');
                selectionScreen.bikeData = data;
                selectionScreen.style.display = 'block';
                this.style.display = 'none';
            }
        })
        .catch(error => {
            // Hide loading indicator
            loadingSpinner.style.display = 'none';
            loadingText.style.display = 'none';
            console.error('Error fetching data:', error);
        });
    } else {
        // Handle invalid inputs
        console.log('Invalid input values');
    }
}

  _closeForm() {
    this.style.display = 'none';
  }
}

customElements.define('search-form', SearchForm);