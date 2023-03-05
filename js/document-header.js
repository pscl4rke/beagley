import {LitElement, html} from "../vendor/lit-all.min.js";

export class DocumentHeader extends LitElement {
    static properties = {
        documentTitle: {},
        earliest: {},
        latest: {},
    };
  
    constructor() {
        super();
        this.documentTitle = "{loading...}";
        this.earliest = "{loading...}";
        this.latest = "{loading...}";
    }

    createRenderRoot() {
       // don't use shadow DOM, so we can use bootstrap
       return this;
    }
  
    render() {
        return html`
            <h3 class="p-3">${this.documentTitle}</h3>
            <p>From: ${this.earliest}</p>
            <p>To: ${this.latest}</p>
        `;
    }
}
customElements.define("document-header", DocumentHeader);
