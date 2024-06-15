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
      background: white;
      padding: 1em;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 1000;
    }

    .loading-spinner {
      border: 16px solid #f3f3f3;
      border-top: 16px solid #3498db;
      border-radius: 50%;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
      display: none; /* Initially hidden */
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
    this.apiKey = `YOUR API KEY`;
  }

  render() {
    return html `
    <div id="search-form">
      <form @submit=${this._handleSubmit}>
        <label for="make">Make:</label>
        <input type="text" id="make" name="make" required>
        <label for="model">Model:</label>
        <input type="text" id="model" name="model" required>
        <button type="submit">Submit</button>
        <button type="button" @click=${this._closeForm}>Close</button>
      </form>
      <div class="loading-spinner" ></div
      <div class="loading text >Loading...</div>
    </div>
    `
  };

  _handleSubmit(event){
    event.preventDefault();
    const make = this.shadowRoot.getElementById(`make`).value;
    const model = this.shadowRoot.getElementById(`model`).value;


    const loadingSpinner = this.shadowRoot.querySelector(".loading-spinner");
    const loadingText = this.shadowRoot.querySelector(".loading-text");
    loadingSpinner.style.display = "block";
    loadingText.style.display = "block";

  fetch(`https://api.api-ninjas.com/v1/motorcycles?make=${make}&model=${model}`, {
      headers: { 'X-Api-Key': this.apiKey }
  })
  .then(response => response.json())
  .then(data => {
    loadingSpinner.style.display = "none";
    loadingText.style.display = "none";

    const selectionScreen = document.querySelector(`selection-screen`);
    selectionScreen.bikeData = data;
    selectionScreen.style.display = block;
    this.style.display = none;
  })
  .catch(error => {
    loadingSpinner.style.display = "none";
    loadingText.style.display = "none";
    console.error(`Error fetching data`, error);
  });
  }

  _closeForm() {
    this.style.display = none;
  }
}

  customElements.define('search-form', SearchForm);