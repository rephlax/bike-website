import { LitElement, html, css } from "lit";

class displayArea extends LitElement(){
    constructor(){
        super();
        this.bikeData = {}
    }

    static properties = {
        bikeData : {type: Object}
    }

    static style = css `
        :host{
        display: block;
        }
    `

    render() {
        html = `
        <div class="content-container">
            <div class="title-container">
            <h2 class="title">Bike Specifications</h2>
            </div>
            ${this.bikeData
            ? html`
                <div class="specification-container">
                <div class="spec">
                    <h3 class="spec-title">Engine</h3>
                    <dl>
                    <dt></dt>
                    <dd></dd>
                    </dl>
                    <p>Type: ${this.bikeData.engineType}</p>
                    <p>Displacement: ${this.bikeData.displacement}</p>
                </div>
                <div class="spec">
                    <h3 class="spec-title">Brakes & Suspension</h3>
                    <p>Length: ${this.bikeData.length}</p>
                    <p>Width: ${this.bikeData.width}</p>
                </div>
                <div class="spec">
                    <h3 class="spec-title">Performance and Transmition</h3>
                    <p>Power: ${this.bikeData.power}</p>
                    <p>Torque: ${this.bikeData.torque}</p>
                </div>
                <div class="spec">
                    <h3 class="spec-title">Frame and Dimensions</h3>
                    <p>Weight: ${this.bikeData.weight}</p>
                    <p>Fuel Capacity: ${this.bikeData.fuelCapacity}</p>
                </div>
                </div>
          ` : html`<p>Select a bike to see the details.</p>`}
        </div>
        `;
    }
}


customElements.define('display-area', displayArea);