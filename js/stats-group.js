import {LitElement, html} from "../vendor/lit-all.min.js";

export class StatsGroup extends LitElement {
    static properties = {
        wallsAttempted: {},
        successfulWalls: {},
        successfulFlypasts: {},
    };
  
    constructor() {
        super();
    }

    createRenderRoot() {
       // don't use shadow DOM, so we can use bootstrap
       return this;
    }

    get showWallsAttempted() {
        if (this.wallsAttempted === undefined) {
            return "";
        }
        return this.wallsAttempted?.toLocaleString("en-GB");
    }

    get showSuccessfulWallsPercent() {
        let percent = 100 * (this.successfulWalls / this.wallsAttempted)
        if (isNaN(percent)) {
            return "";
        }
        return percent.toFixed(2) + "%";
    }

    get showSuccessfulFlypastsPercent() {
        let percent = 100 * (this.successfulFlypasts / this.successfulWalls)
        if (isNaN(percent)) {
            return "";
        }
        return percent.toFixed(2) + "%";
    }
  
    render() {
        return html`
            <div class="input-group my-2">
                <span class="input-group-text" style="width: 200px">Walls Attempted</span>
                <input readonly class="form-control" type="text"
                    style="text-align: right" value="${this.showWallsAttempted}" />
            </div>
            <div class="input-group my-2">
                <span class="input-group-text" style="width: 200px">Successful Walls</span>
                <input readonly class="form-control" type="text"
                    style="text-align: right" value="${this.showSuccessfulWallsPercent}" />
            </div>
            <div class="input-group my-2">
                <span class="input-group-text" style="width: 200px">Successful Flypast</span>
                <input readonly class="form-control" type="text"
                    style="text-align: right" value="${this.showSuccessfulFlypastsPercent}" />
            </div>
        `;
    }
}
customElements.define("stats-group", StatsGroup);
