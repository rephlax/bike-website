import { LitElement, html, css } from "lit";

class selectionScreen extends LitElement{

    static properties = {
        bikeData : {type: Array}
    };

    static style = css `
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
            transition: color 180ms, background-color: 180ms;
        }

        .selection-form button:hover {
            background-color: white;
            color: black;
        }
    `;

    constructor(){
        super();
        this.bikeData = [];
    }

    render(){
        return html `
        <div id="selcetion-screen">
            <select @change=${this._handleSelection}>
            </select>
        </div>
        `;
    }

    _closeForm() {
        this.style.display = none;
      }
}



customElements.define('selection-screen', selectionScreen);