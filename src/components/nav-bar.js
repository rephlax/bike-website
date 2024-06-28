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
            
            }
    `};

    render(){
       return html = `
        
        `
    }
}

customElements.define('nav-bar', NavBar);