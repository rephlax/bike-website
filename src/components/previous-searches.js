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
        if (this.searches.length >= 3){
            this.searches = this.searches.slice(1);
        }
        this.searches = [...this.searches, { ...search, date: new Date().toLocaleString() }];
    }

    _selectSearch(search){
        const selectedSearch = this.searches[index];
        const event = new CustomEvent('search-selected', {
          detail: { search: selectedSearch },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(event);
      }
}

customElements.define('previous-searches', PreviousSearches);