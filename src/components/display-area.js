import { LitElement, html, css } from "lit";

class displayArea extends LitElement(){
    constructor(){
        super();
        this.bikeData = {}
    }

    static properties = {
        bikeData : {type: Object}
    }

    static styles = css`
        :host {
            display: block;
            padding: 16px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #fff;
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
        }
        .specs {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
            gap: 16px;
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
            height: 150px;
            width: 150px;
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
`;

    render() {
        html = `
        <div class="content-container">
            <div class="title-container">
            <h2 class="title">Bike Specifications for the ${this.bikeData.make} ${this.bikeData.model}</h2>
            </div>
            ${this.bikeData
            ? `
                <div class="specification-container">
                <div class="spec">
                    <h3 class="spec-title">Engine</h3>
                    <dl>
                    <dt>Engine</dt>
                    <dd>${this.bikeData.engine}</dd>
                    <dt>Displacement</dt>
                    <dd>${this.bikeData.displacement}</dd>
                    <dt>Bore x stroke</dt>
                    <dd>${this.bikeData.bore_stroke}</dd>
                    <dt>Compression ratio</dt>
                    <dd>${this.bikeData.compression}</dd>
                    <dt>Valves</dt>
                    <dd>${this.bikeData.valves_per_cylinder}</dd>
                    <dt>Fuel system</dt>
                    <dd>${this.bikeData.fuel_system}</dd>
                    <dt>Ignition</dt>
                    <dd>${this.bikeData.ignition}</dd>
                    <dt>lubrication</dt>
                    <dd>${this.bikeData.lubrication}</dd>
                    </dl>
                </div>
                <div class="spec">
                    <h3 class="spec-title">Brakes & Suspension</h3>
                    <dl>
                    <dt>Front brakes</dt>
                    <dd>${this.bikeData.front_brakes}</dd>
                    <dt>Rear brakes</dt>
                    <dd>${this.bikeData.rear_brakes}</dd>
                    <dt>Front suspension</dt>
                    <dd>${this.bikeData.front_suspension}</dd>
                    <dt>Rear suspension</dt>
                    <dd>${this.bikeData.rear_suspension}</dd>
                    </dl>
                </div>
                <div class="spec">
                    <h3 class="spec-title">Performance and Transmition</h3>
                    <dl>
                    <dt>Power</dt>
                    <dd>${this.bikeData.power}</dd>
                    <dt>Torque</dt>
                    <dd>${this.bikeData.torque}</dd>
                    <dt>Transmission</dt>
                    <dd>${this.bikeData.transmission}</dd>
                    <dt>Clutch</dt>
                    <dd>${this.bikeData.clutch}</dd>
                    <dt>Gearbox</dt>
                    <dd>${this.bikeData.gearbox}</dd>
                    </dl>
                </div>
                <div class="spec">
                    <h3 class="spec-title">Frame and Dimensions</h3>
                    <dl>
                    <dt>Frame</dt>
                    <dd>${this.bikeData.frame}</dd>
                    <dt>Front wheel travel</dt>
                    <dd>${this.bikeData.front_wheel_travel}</dd>
                    <dt>Rear wheel travel</dt>
                    <dd>${this.bikeData.rear_wheel_travel}</dd>
                    <dt>Front tyre</dt>
                    <dd>${this.bikeData.front_tire}</dd>
                    <dt>Rear tyre</dt>
                    <dd>${this.bikeData.rear_tire}</dd>
                    <dt>Seat height</dt>
                    <dd>${this.bikeData.seat_height}</dd>
                    <dt>Total height</dt>
                    <dd>${this.bikeData.total_height}</dd>
                    <dt>Total length</dt>
                    <dd>${this.bikeData.total_length}</dd>
                    <dt>Ground clearance</dt>
                    <dd>${this.bikeData.ground_clearance}</dd>
                    <dt>Fuel capacity</dt>
                    <dd>${this.bikeData.fuel_capacity}</dd>
                    <dt>Total weight</dt>
                    <dd>${this.bikeData.total_weight}</dd>
                    </dl>
                </div>
                </div>
          ` : `<p>Select a bike to see the details.</p>`}
        </div>
        `;
    }
}


customElements.define('display-area', displayArea);