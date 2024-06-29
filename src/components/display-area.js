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

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #fff;
        margin: 0 50px; /* 50px margin on either side */
      }
      .container {
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 16px;
      }
      .title {
        font-size: 1.5em;
        text-align: center;
        margin-bottom: 16px;
        color: black;
      }
      .specs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        color: black;
      }
      .spec {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #f9f9f9;
        height: auto;
        color: black;
      }
      dl {
        margin: 0;
      }
      dt {
        font-weight: bold;
      }
      dd {
        margin-left: 0;
      }

      @media (max-width: 37.5rem) {
        .specs {
          grid-template-columns: 1fr;
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
        ${this.bikeData.make
          ? html`
              <div class="specs">
                <div class="spec">
                  <h3>Engine</h3>
                  <dl>
                    ${this._renderSpec('Type', this.bikeData.engine)}
                    ${this._renderSpec('Displacement', this.bikeData.displacement)}
                    ${this._renderSpec('Bore x stroke', this.bikeData.bore_stroke)}
                    ${this._renderSpec('Compression ratio', this.bikeData.compression)}
                    ${this._renderSpec('Valves', this.bikeData.valves_per_cylinder)}
                    ${this._renderSpec('Fuel system', this.bikeData.fuel_system)}
                    ${this._renderSpec('Ignition', this.bikeData.ignition)}
                    ${this._renderSpec('Lubrication', this.bikeData.lubrication)}
                  </dl>
                </div>
                <div class="spec">
                  <h3>Brakes & Suspension</h3>
                  <dl>
                    ${this._renderSpec('Front brakes', this.bikeData.front_brakes)}
                    ${this._renderSpec('Rear brakes', this.bikeData.rear_brakes)}
                    ${this._renderSpec('Front suspension', this.bikeData.front_suspension)}
                    ${this._renderSpec('Rear suspension', this.bikeData.rear_suspension)}
                  </dl>
                </div>
                <div class="spec">
                  <h3>Performance and Transmission</h3>
                  <dl>
                    ${this._renderSpec('Power', this.bikeData.power)}
                    ${this._renderSpec('Torque', this.bikeData.torque)}
                    ${this._renderSpec('Transmission', this.bikeData.transmission)}
                    ${this._renderSpec('Clutch', this.bikeData.clutch)}
                    ${this._renderSpec('Gearbox', this.bikeData.gearbox)}
                  </dl>
                </div>
                <div class="spec">
                  <h3>Frame and Dimensions</h3>
                  <dl>
                    ${this._renderSpec('Frame', this.bikeData.frame)}
                    ${this._renderSpec('Front wheel travel', this.bikeData.front_wheel_travel)}
                    ${this._renderSpec('Rear wheel travel', this.bikeData.rear_wheel_travel)}
                    ${this._renderSpec('Front tyre', this.bikeData.front_tire)}
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