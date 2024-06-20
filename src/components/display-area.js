import { LitElement, html, css } from "lit";

class displayArea extends LitElement(){
    constructor(){
        super();
        this.bikeData = []
    }

    static properties = {
        bikeData : {type: Array}
    }

    static style = css `
    
    `

    render() {
        html = `
        <div class="content-container">
        <div class="title-container">
        <h2 class="title">Bike Specifications</h2>
        </div>
        <div class="grid-container">
        `
    }
}


customElements.define('display-area', displayArea);