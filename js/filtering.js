class DatasetFilters {

    constructor(updateHandler) {
        this.updateHandler = updateHandler
        this.from = null;
        this.to = null;
    }

    triggerUpdate() {
        this.updateHandler()
    }

    setFrom(date) {
        if (date === undefined) {
            this.from = null;
        } else {
            this.from = date;
        }
        this.triggerUpdate();
    }

    setTo(date) {
        if (date === undefined) {
            this.to = null;
        } else {
            this.to = date;
        }
        this.triggerUpdate();
    }

    toURLParams() {
        let params = new URLSearchParams();
        if (this.from !== null) {
            params.set("from", this.from.toISOString().slice(0, 10));
        }
        if (this.to !== null) {
            params.set("to", this.to.toISOString().slice(0, 10));
        }
        return params;
    }

}
