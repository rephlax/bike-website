import { LitElement, html, css } from 'lit';

class SelectionScreen extends LitElement {
  static get properties() {
    return {
      bikeData: { type: Array }
    };
  }

  constructor() {
    super();
    this.bikeData = []; // Initialize bikeData as an array
  }

  static get styles() {
    return css`
      :host {
        display: none;
        font-weight: 300;
        line-height: 1.9;
      }

      ::selection {
        background-color: var(--primary-color);
        color: var(--secondary-color);
      }
  
      ::-moz-selection {
        background-color: var(--primary-color);
        color: var(--secondary-color);
      }

      .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
      }

      .modal-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--background-color);
        padding: 1.5rem;
        box-shadow: 0 4px 8px var(--box-shadow-color);
        z-index: 1000;
        width: 80%;
        max-width: 500px;
        border-radius: 8px;
      }

      .selection-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .selection-form select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--secondary-color);
        border-radius: 4px;
        font-size: 1rem;
      }

      #selection-screen-title{
        color: var(--primary-color);
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
        background-image: url(src/assets/favicons/icons8-search.svg);
        background-repeat: no-repeat;
        background-position: right 20px center;
        box-shadow: 0 3px 6px var(--box-shadow-color);
      }

      .close-btn {
        background-color: var(--background-color);
        color: var(--primary-color);
        box-shadow: 0 3px 6px var(--box-shadow-color);
      }

      .btn:hover {
        opacity: 1;
      }

      .btn:active {
        transform: translate(1px, 1px);
      }

      .button-container {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
      }

      @media (max-width: 600px) {
        .modal-container {
          width: 90%;
          padding: 1rem;
        }
        .selection-form select, .btn {
          font-size: 1rem;
        }
        .button-container {
          flex-direction: column;
        }
      }
    `;
  }

  render() {
    console.log('Rendering SelectionScreen with bikeData:', this.bikeData);
    const bikes = Array.isArray(this.bikeData) ? this.bikeData : [];

    return html`
      <div class="modal-backdrop" @click=${this._closeForm} role="presentation"></div>
      <div class="modal-container" role="dialog" aria-labelledby="selection-screen-title">
        <h2 id="selection-screen-title">Select a Bike</h2>
        <form class="selection-form" @submit=${this._handleSubmit}>
          <label for="bike-select">Choose a bike:</label>
          <select id="bike-select" required aria-required="true">
            ${bikes.map((bike, index) => html`
              <option value="${index}">${bike.make} ${bike.model}</option>
            `)}
          </select>
          <div class="button-container">
            <button type="submit" class="btn submit-btn">Submit</button>
            <button type="button" class="btn close-btn" @click=${this._closeForm}>Close</button>
          </div>
        </form>
      </div>
    `;
  }

  _handleSubmit(event) {
    event.preventDefault();
    const select = this.shadowRoot.getElementById("bike-select");
    const selectedIndex = select.value;
    const selectedBike = this.bikeData[selectedIndex];

    if (selectedBike) {
      this._updateDisplayArea(selectedBike);
      this._updateNavBar(selectedBike);
      this._updatePreviousSearches(selectedBike);
    }

    this._closeForm();
  }

  _updateDisplayArea(selectedBike) {
    const displayArea = document.querySelector('display-area');
    if (displayArea) {
      displayArea.bikeData = selectedBike;
      displayArea.style.display = 'block';
    }
  }

  _updateNavBar(selectedBike) {
    const navBar = document.querySelector('nav-bar');
    if (navBar) {
      const manufacturerUrls = {
        'kawasaki': 'https://www.kawasaki.com/',
        'honda': 'https://powersports.honda.com/',
        'yamaha': 'https://www.yamahamotorsports.com/',
        'ducati': 'https://www.ducati.com/',
        'bmw': 'https://www.bmwmotorcycles.com/',
        'harley-davidson': 'https://www.harley-davidson.com/',
        'suzuki': 'https://www.suzukicycles.com/',
        'aprilia': 'https://www.aprilia.com/',
        'triumph': 'https://www.triumphmotorcycles.com/',
        'bajaj': 'https://www.bajajauto.com/',
        'cleveland': 'https://www.clevelandcyclewerks.com/',
        'gas gas': 'https://www.gasgas.com/',
        'hero': 'https://www.heromotocorp.com/',
        'ktm': 'https://www.ktm.com/',
        'italjet': 'https://www.italjet.com/',
        'enfield': 'https://www.royalenfield.com/',
        'zero': 'https://www.zeromotorcycles.com/',
        'indian': 'https://www.indianmotorcycle.com/'
      };
      const bikeMakeLowerCase = selectedBike.make.toLowerCase();
      navBar.manufacturerUrl = manufacturerUrls[bikeMakeLowerCase] || '';
      navBar.bikeSelected = true;
    }
  }

  _updatePreviousSearches(selectedBike) {
    const previousSearches = document.querySelector('previous-searches');
    if (previousSearches) {
      previousSearches._addSearch(selectedBike);
    }
  }

  _closeForm() {
    this.style.display = 'none';
  }
}

customElements.define('selection-screen', SelectionScreen);