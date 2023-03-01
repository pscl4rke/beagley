import {LitElement, html} from "../vendor/lit-all.min.js";

export class MyExperiment extends LitElement {
    static properties = {
        version: {},
    };
  
    constructor() {
        super();
        this.version = "FIRST";
    }
  
    render() {
        return html`
            <p>Welcome to this experiment</p>
            <p>You are looking at version ${this.version} code</p>
        `;
    }
}
customElements.define('my-experiment', MyExperiment);
