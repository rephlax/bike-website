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

    .button-container {
      display: flex;
      justify-content: center;
      gap: 1rem;
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
      transition: translate 180ms, opacity 180ms;
      opacity: 0.8;
    }

    .submit-btn {
      background-color: var(--background-color);
      color: var(--primary-color);
      padding: 10px 20px;
      background-repeat: no-repeat;
      background-position: right 20px center;
      box-shadow: 0 3px 6px var(--box-shadow-color);
    }

    .close-btn {
      background-color: var(--background-color);
      color: var(--primary-color);
      padding: 10px 20px;
      box-shadow: 0 4px 8px var (--box-shadow-color);
    }

    .btn:hover {
      opacity: 1;
    }

    .btn:active {
      translate: 1px 1px;
    }

    .form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .form-container label, 
    .form-container input {
      display: inline-block;
      margin: 0.5rem 0;
    }

    .form-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
      max-width: 300px;
      margin: 0.5rem 0;
    }

    @media (max-width: 37.5rem) {
      .modal-container {
        width: 90%;
        padding: 1rem;
      }
      .selection-form select {
        font-size: 1rem;
      }
      .btn {
        font-size: 1rem;
      }
      .button-container {
        flex-direction: column;
        margin-top: 20px;
      }
    }

    h2 {
      text-align: center;
      width: 100%;
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
            <input type="text" id="make" name="make" required minlength="2" pattern="[A-Za-z0-9\s]+" title="Make should be alphanumeric.">
          </div>
          <div class="form-row">
            <label for="model">Model:</label>
            <input type="text" id="model" name="model" required minlength="2" pattern="[A-Za-z0-9\s]+" title="Model should be alphanumeric.">
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
      const loadingSpinner = this.shadowRoot.querySelector('.loading-spinner');
      const loadingText = this.shadowRoot.querySelector('.loading-text');
      loadingSpinner.style.display = 'block';
      loadingText.style.display = 'block';
  
      fetch(`/.netlify/functions/getBikeData?make=${makeInput.value}&model=${modelInput.value}`)
        .then(response => response.json())
        .then(data => {
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
            selectionScreen.setAttribute('aria-hidden', 'false');
            this.setAttribute('aria-hidden', 'true');
            this.style.display = 'none';
            makeInput.value = '';
            modelInput.value = '';
          }
        })
        .catch(error => {
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
    this.setAttribute('aria-hidden', 'true');
  }
}

customElements.define('search-form', SearchForm);