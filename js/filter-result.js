import {LitElement, html} from "../vendor/lit-all.min.js";

export class FilterResult extends LitElement {
    static properties = {
    };
  
    constructor() {
        super();
    }

    createRenderRoot() {
       // don't use shadow DOM, so we can use bootstrap
       return this;
    }
  
    render() {
        return html`
            <select class="form-select" @change="${this.handleChange}">
            <option value="all">All Walls</option>
            <option value="successful">Just Successful</option>
            </select>
        `;
    }

    handleChange(theevent) {
        let state = theevent.target.value;
        console.log(`Changed type: ${state}`);
        window.datasetFilters.setResult(state);
    }
}
customElements.define("filter-result", FilterResult);
