import { LitElement, html, css } from "lit";

class NavBar extends LitElement {

    static get properties() {
        return {
            manufacturerUrl: {type: String},
            bikeSelected: {type: Boolean}
        };
    }

    constructor() {
        super()
        bikeSelected = false;
        manufacturerUrl = '';
    }
    static get styles() {
        return css `
            :host {
                display: block;
                width: 100%;
                background-color: #333;
                color: white;
                padding: 10px 0;
            }

            .navbar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
            }

            .navbar svg {
                width:
                height:
                fill: white;
            }

            .navbar button:disabled {
                color: gray;
                cursor: not-allowed;
            }

            .navbar a {
                color: white;
                text-decoration: none;
            }

            @media (max-width: 37.5rem) {
                .navbar {
                flex-direction: column;
                gap: 10px;
            }
                .navbar button {
                font-size: 14px;
                margin-left: 0;
            }
        }
    `};

    render(){
       return html = `
        
        `
    }
}

customElements.define('nav-bar', NavBar);