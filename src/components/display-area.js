import { LitElement, html, css } from 'lit';

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
        margin: 0 50px; /* Margins on either side for spacing */
        font-weight: 400;
        line-height: 1.6;
        font-size: 1rem;
        box-shadow: 0px 0px 21px 4px var(--background-color);
      }

      .container {
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 16px;
        margin-bottom: 20px;
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
        font-size: 1.25rem;
        padding: 20px;
        border: 1px solid var(--primary-color);
        border-radius: 4px;
        background-color: var(--secondary-color);
        box-shadow: 0 4px 8px var(--box-shadow-color),
        inset 0 4px 8px var(--box-shadow-color);
      }

      .spec-title {
        margin-bottom: 16px;
        font-size: 1.75rem;
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

      .init-text {
        text-align: center;
        color: var(--primary-color);
      }

      @media (max-width: 600px) {
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
        height: 100px; /* Spacing after the last specs box */
      }
    `;
  }

  render() {
    return html`
      <div class="container" role="region" aria-labelledby="bike-specifications-title">
        <div class="title" id="bike-specifications-title">Bike Specifications for: ${this.bikeData.make} ${this.bikeData.model}</div>
        ${this.bikeData.image
          ? html`
              <div class="image-container">
                <img src="${this.bikeData.image}" alt="${this.bikeData.make} ${this.bikeData.model} image">
              </div>
            `
          : ''}
        ${this.bikeData.make
          ? html`
              <div class="specs">
                ${this._renderSpecSection('Engine', this._renderSpecs([
                  { label: 'Type', value: this.bikeData.engine },
                  { label: 'Displacement', value: this.bikeData.displacement },
                  { label: 'Bore x stroke', value: this.bikeData.bore_stroke },
                  { label: 'Compression ratio', value: this.bikeData.compression },
                  { label: 'Valves', value: this.bikeData.valves_per_cylinder },
                  { label: 'Fuel system', value: this.bikeData.fuel_system },
                  { label: 'Ignition', value: this.bikeData.ignition },
                  { label: 'Lubrication', value: this.bikeData.lubrication }
                ]))}
                ${this._renderSpecSection('Brakes & Suspension', this._renderSpecs([
                  { label: 'Front brakes', value: this.bikeData.front_brakes },
                  { label: 'Rear brakes', value: this.bikeData.rear_brakes },
                  { label: 'Front suspension', value: this.bikeData.front_suspension },
                  { label: 'Rear suspension', value: this.bikeData.rear_suspension }
                ]))}
                ${this._renderSpecSection('Performance and Transmission', this._renderSpecs([
                  { label: 'Power', value: this.bikeData.power },
                  { label: 'Torque', value: this.bikeData.torque },
                  { label: 'Transmission', value: this.bikeData.transmission },
                  { label: 'Clutch', value: this.bikeData.clutch },
                  { label: 'Gearbox', value: this.bikeData.gearbox }
                ]))}
                ${this._renderSpecSection('Frame and Dimensions', this._renderSpecs([
                  { label: 'Frame', value: this.bikeData.frame },
                  { label: 'Front wheel travel', value: this.bikeData.front_wheel_travel },
                  { label: 'Rear wheel travel', value: this.bikeData.rear_wheel_travel },
                  { label: 'Front tyre', value: this.bikeData.front_tire },
                  { label: 'Rear tyre', value: this.bikeData.rear_tire },
                  { label: 'Seat height', value: this.bikeData.seat_height },
                  { label: 'Total height', value: this.bikeData.total_height },
                  { label: 'Total length', value: this.bikeData.total_length },
                  { label: 'Ground clearance', value: this.bikeData.ground_clearance },
                  { label: 'Fuel capacity', value: this.bikeData.fuel_capacity },
                  { label: 'Total weight', value: this.bikeData.total_weight }
                ]))}
              </div>
            `
          : html`<p class="init-text">Search for a bike to see the details. (press the search button)</p>`}
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

  _renderSpecSection(title, specs) {
    return html`
      <div class="spec">
        <h3 class="spec-title">${title}</h3>
        <div class="spec-content">${specs}</div>
      </div>
    `;
  }

  _renderSpecs(specsArray) {
    return specsArray.map(spec => this._renderSpec(spec.label, spec.value));
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