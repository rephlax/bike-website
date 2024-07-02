import { LitElement, html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

class DisplayArea extends LitElement {
  constructor() {
    super();
    this.bikeData = {};
  }

  static get properties() {
    return {
      bikeData: { type: Object }
    };
  }

  updated(changedProperties) {
    if (changedProperties.has('bikeData')) {
      this.dispatchEvent(new CustomEvent('bike-data-changed', {
        detail: { bike: this.bikeData },
        bubbles: true,
        composed: true
      }));
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
        border-radius: 8px;
        background-color: var(--background-color);
        margin: 0 50px; /* 50px margin on either side */
        font-weight: 400;
        line-height: 1.6;
        font-size: 1rem;
      }
      .container {
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 16px;
      }
      .title {
        font-size: 1.8rem;
        text-align: center;
        margin-bottom: 16px;
        color: var(--primary-color);
        font-weight: 600;
        line-height: 1.2;
      }
      .specs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        color: var(--primary-color);
      }
      .spec {
        display: flex;
        flex-direction: column;
        padding: 16px;
        border: 1px solid var(--primary-color);
        border-radius: 4px;
        background-color: var(--secondary-color);
        height: auto;
        color: var(--primary-color);
        box-shadow: 0 4px 8px var(--box-shadow-color),
                    inset 0 4px 8px var(--box-shadow-color);
      }
      .spec-title {
        margin: 0 0 8px;
        font-size: 1.5rem;
        text-align: center;
        font-weight: bold;
      }
      .spec-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        align-items: center;
      }
      dl {
        margin: 0;
      }
      dt, dd {
        margin: 0;
        padding: 4px 0;
        text-align: left;
      }
      dt {
        font-weight: bold;
      }
      dd {
        margin-left: 0;
      }
      .image-container {
        text-align: center;
        margin-bottom: 16px;
      }
      .image-container img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 8px var(--box-shadow-color);
      }
      @media (max-width: 37.5rem) {
        .specs {
          grid-template-columns: 1fr;
        }
        .title {
          font-size: 1.5rem;
        }
      }

      .container::after {
        content: '';
        display: block;
        height: 100px; /* 100px after the last specs box */
      }
    `;
  }

  render() {
    return html`
      <div class="container">
        <div class="title">Bike Specifications for: ${this.bikeData.make} ${this.bikeData.model}</div>
        ${this.bikeData.image
          ? html`
              <div class="image-container">
                <img src="${this.bikeData.image}" alt="${this.bikeData.make} ${this.bikeData.model}">
              </div>
            `
          : ''}
        ${this.bikeData.make
          ? html`
              <div class="specs">
                <div class="spec">
                  <h3 class="spec-title">Engine</h3>
                  <div class="spec-content">
                    <dl>
                      ${this._renderSpec('Type', this.bikeData.engine)}
                      ${this._renderSpec('Displacement', this.bikeData.displacement)}
                      ${this._renderSpec('Bore x stroke', this.bikeData.bore_stroke)}
                      ${this._renderSpec('Compression ratio', this.bikeData.compression)}
                    </dl>
                    <dl>
                      ${this._renderSpec('Valves', this.bikeData.valves_per_cylinder)}
                      ${this._renderSpec('Fuel system', this.bikeData.fuel_system)}
                      ${this._renderSpec('Ignition', this.bikeData.ignition)}
                      ${this._renderSpec('Lubrication', this.bikeData.lubrication)}
                    </dl>
                  </div>
                </div>
                <div class="spec">
                  <h3 class="spec-title">Brakes & Suspension</h3>
                  <div class="spec-content">
                    <dl>
                      ${this._renderSpec('Front brakes', this.bikeData.front_brakes)}
                      ${this._renderSpec('Rear brakes', this.bikeData.rear_brakes)}
                    </dl>
                    <dl>
                      ${this._renderSpec('Front suspension', this.bikeData.front_suspension)}
                      ${this._renderSpec('Rear suspension', this.bikeData.rear_suspension)}
                    </dl>
                  </div>
                </div>
                <div class="spec">
                  <h3 class="spec-title">Performance and Transmission</h3>
                  <div class="spec-content">
                    <dl>
                      ${this._renderSpec('Power', this.bikeData.power)}
                      ${this._renderSpec('Torque', this.bikeData.torque)}
                    </dl>
                    <dl>
                      ${this._renderSpec('Transmission', this.bikeData.transmission)}
                      ${this._renderSpec('Clutch', this.bikeData.clutch)}
                      ${this._renderSpec('Gearbox', this.bikeData.gearbox)}
                    </dl>
                  </div>
                </div>
                <div class="spec">
                  <h3 class="spec-title">Frame and Dimensions</h3>
                  <div class="spec-content">
                    <dl>
                      ${this._renderSpec('Frame', this.bikeData.frame)}
                      ${this._renderSpec('Front wheel travel', this.bikeData.front_wheel_travel)}
                      ${this._renderSpec('Rear wheel travel', this.bikeData.rear_wheel_travel)}
                      ${this._renderSpec('Front tyre', this.bikeData.front_tire)}
                    </dl>
                    <dl>
                      ${this._renderSpec('Rear tyre', this.bikeData.rear_tire)}
                      ${this._renderSpec('Seat height', this.bikeData.seat_height)}
                      ${this._renderSpec('Total height', this.bikeData.total_height)}
                      ${this._renderSpec('Total length', this.bikeData.total_length)}
                      ${this._renderSpec('Ground clearance', this.bikeData.ground_clearance)}
                      ${this._renderSpec('Fuel capacity', this.bikeData.fuel_capacity)}
                      ${this._renderSpec('Total weight', this.bikeData.total_weight)}
                    </dl>
                  </div>
                </div>
              </div>
            `
          : html`<p>Select a bike to see the details.</p>`}
      </div>
    `;
  }

  _renderSpec(label, value) {
    return value
      ? html`
          <dt>${label}</dt>
          <dd>${value}</dd>
        `
      : '';
  }

  clearSpecs() {
    this.bikeData = {};
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('open-search-form', this.clearSpecs.bind(this));
    window.addEventListener('search-selected', this._handleSearchSelected.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('open-search-form', this.clearSpecs.bind(this));
    window.removeEventListener('search-selected', this._handleSearchSelected.bind(this));
    super.disconnectedCallback();
  }

  _handleSearchSelected(event) {
    this.bikeData = event.detail.search;
    this.style.display = 'block';
  }
}

customElements.define('display-area', DisplayArea);