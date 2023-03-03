function dateToLocalISO(date) {
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    return year + "-" + String(month).padStart(2, "0") + "-" + String(day).padStart(2, "0");
}

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
            params.set("from", dateToLocalISO(this.from));
        }
        if (this.to !== null) {
            params.set("to", dateToLocalISO(this.to));
        }
        return params;
    }

}
