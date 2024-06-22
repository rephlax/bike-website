import { LitElement, html, css } from "lit";

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
        `;
    }

    constructor() {
        super();
        this.bikeData = [];
        console.log('Bike Data in Constructor:', this.bikeData); // Verify initial state
    }

    connectedCallback() {
        super.connectedCallback();
        console.log('Bike Data on Connected:', this.bikeData); // Verify data when component is added to the DOM
    }

    render() {
        console.log('Rendering with Bike Data:', this.bikeData); // Verify data before rendering
        return html`
            <div class="modal-backdrop" role="presentation"></div>
            <div class="modal-container" role="dialog" aria-labelledby="selection-screen-title">
                <h2 id="selection-screen-title">Select a Bike</h2>
                <form class="selection-form" @submit=${this._handleSubmit}>
                    <label for="bike-select">Choose a bike:</label>
                    <select id="bike-select" required aria-required="true">
                        ${this.bikeData.map(bike => html`
                            <option value="${bike.id}">${bike.make} ${bike.model}</option>
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
        const selectedBikeID = select.value;
        console.log('Selected Bike ID:', selectedBikeID); // Verify selected value

        const selectedBike = this.bikeData.find(bike => bike.id === selectedBikeID);
        console.log('Selected Bike:', selectedBike); // Verify matched bike object

        const displayArea = document.querySelector('display-area');
        if (displayArea) {
            console.log('Selected Bike Data:', selectedBike);
            displayArea.bikeData = selectedBike; // Ensure this matches the property name used in display-area.js
            displayArea.style.display = 'block';
        }

        this.style.display = 'none';
    }

    _closeForm() {
        this.style.display = 'none';
    }
}

customElements.define('selection-screen', SelectionScreen);