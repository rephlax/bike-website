import { LitElement, html, css } from 'lit';

class SelectionScreen extends LitElement {
  static get properties() {
    return {
      bikeData: { type: Array }
    };
  }

  static get styles() {
    return css`
      :host {
        display: none;
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
        background: white;
        padding: 1.5rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .selection-form button {
        padding: 0.75rem;
        border: none;
        background-color: black;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        transition: color 180ms, background-color 180ms;
      }
      .selection-form button:hover {
        background-color: white;
        color: black;
      }

      @media (max-width: 37.5rem) {
        .modal-container {
          width: 90%;
          padding: 1rem;
        }
        .selection-form select {
          font-size: 1rem;
        }
        .selection-form button {
          font-size: 1rem;
        }
      }
    `;
  }

  constructor() {
    super();
    this.bikeData = [];
  }

  render() {
    return html`
      <div class="modal-backdrop" role="presentation"></div>
      <div class="modal-container" role="dialog" aria-labelledby="selection-screen-title">
        <h2 id="selection-screen-title">Select a Bike</h2>
        <form class="selection-form" @submit=${this._handleSubmit}>
          <label for="bike-select">Choose a bike:</label>
          <select id="bike-select" required aria-required="true">
            ${this.bikeData.map((bike, index) => html`
              <option value="${index}">${bike.make} ${bike.model}</option>
            `)}
          </select>
          <button type="submit" class="btn">Submit</button>
        </form>
      </div>
    `;
  }

  _handleSubmit(event) {
    event.preventDefault();
    const select = this.shadowRoot.getElementById("bike-select");
    const selectedIndex = select.value;
    const selectedBike = this.bikeData[selectedIndex];
    const displayArea = document.querySelector('display-area');
    const navBar = document.querySelector('nav-bar');
    const previousSearches = document.querySelector('previous-searches');
    if (displayArea) {
      displayArea.bikeData = selectedBike;
      displayArea.style.display = 'block';
    }
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
        'gas': 'https://www.gasgas.com/',
        'hero': 'https://www.heromotocorp.com/',
        'ktm': 'https://www.ktm.com/',
        'italjet': 'https://www.italjet.com/',
        'royal enfield': 'https://www.royalenfield.com/',
        'zero': 'https://www.zeromotorcycles.com/',
        'indian': 'https://www.indianmotorcycle.com/'
      };
      const bikeMakeLowerCase = selectedBike.make.toLowerCase();
      navBar.manufacturerUrl = manufacturerUrls[bikeMakeLowerCase] || '';
      navBar.bikeSelected = true;
    }
    if (previousSearches) {
      previousSearches.addSearch(selectedBike);
    }
    this._closeForm();
  }

  _closeForm() {
    this.style.display = 'none';
  }
}

customElements.define('selection-screen', SelectionScreen);
