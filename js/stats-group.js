import {LitElement, html} from "../vendor/lit-all.min.js";

export class StatsGroup extends LitElement {
    static properties = {
        wallsAttempted: {},
        successfulWalls: {},
        successfulFlypasts: {},
    };
  
    constructor() {
        super();
        //this.wallsAttempted = "4,642,635";
        //this.successfulWalls = "56.32%";
        //this.successfulFlypasts = "45.98%";
    }

   createRenderRoot() {
       // don't use shadow DOM, so we can use bootstrap
       return this;
   }
  
    render() {
        return html`
            <div class="input-group m-1">
                <span class="input-group-text" style="width: 200px">Walls Attempted</span>
                <input readonly class="form-control" type="text" style="text-align: right" value="${this.wallsAttempted}" />
            </div>
            <div class="input-group m-1">
                <span class="input-group-text" style="width: 200px">Successful Walls</span>
                <input readonly class="form-control" type="text" style="text-align: right" value="${this.successfulWalls}" />
            </div>
            <div class="input-group m-1">
                <span class="input-group-text" style="width: 200px">Successful Flypast</span>
                <input readonly class="form-control" type="text" style="text-align: right" value="${this.successfulFlypasts}" />
            </div>
        `;
    }
}
customElements.define("stats-group", StatsGroup);
