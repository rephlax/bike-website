import { LitElement, html, css } from "lit";

class PreviousSearches extends LitElement{
    static get properties() {
      return { searches: {type: Array} }
    };

    constructor(){
        super();
        this.searches = [];
    }

    static get styles() {
        css`
        
        `
    }

    render(){
        return html `
            <div class="searches">
                ${this.searches.map((search, index) => html`
                    <div class="card" @click{() => this._selectSearch(index)}>
                        <h3>${search.make} ${search.model}</h3>
                        <p>${search.date}</p>
                    </div>
                `)};
            </div>
        `
    }

    _addSearch(search){

    }

    _selectSearch(search){

    }
}

customElements.define('previous-searches', PreviousSearches);