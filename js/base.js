window.updateWithFilteredStats = function() {
    let url = "http://localhost:8001/foobar/summary/";
    let params = window.datasetFilters.toURLParams();
    window.updateWithStatsFrom(url + "?" + params);
    if (window.dataGrid !== undefined) {
        window.dataGrid.forceRender();
    }
};

window.updateWithStatsFrom = async function (url) {
    const response = await fetch(url);
    const statsToShow = await response.json();
    let statsGroup = document.getElementById("my-stats-group");
    statsGroup.wallsAttempted = statsToShow.wallsAttempted;
    statsGroup.successfulWalls = statsToShow.successfulWalls;
    statsGroup.successfulFlypasts = statsToShow.successfulFlypasts;
};

async function getDataForTable() {
    let url = "http://localhost:8001/foobar/walls/";
    let params = window.datasetFilters.toURLParams();
    const response = await fetch(url + "?" + params);
    const rows = await response.json();
    return rows
}

function putATableOnTheScreen() {
    window.dataGrid = new gridjs.Grid({ 
        columns: ["Date", "Source", "Destination", "Result"],
        //data: () => { return getDataForTable() },
        //width: "50%",
        className: {
            // all supplied by bootstrap
            table: "table table-sm",
            paginationButton: "btn btn-secondary",
        },
        pagination: {
            limit: 10,
            server: {
                url: (_prevUrl, page, limit) => {
                    let url = "http://localhost:8001/foobar/walls/";
                    let params = window.datasetFilters.toURLParams();
                    return `${url}?${params}&limit=${limit}&offset=${page * limit}`;
                }
            },
        },
        server: {
            total: (_data) => {
                let statsGroup = document.getElementById("my-stats-group");
                return statsGroup.wallsAttempted;
            },
            then: (data) => data,
        },
    }).render(document.getElementById("table-goes-here"));
}

document.addEventListener("DOMContentLoaded", (_event) => {
    window.datasetFilters = new DatasetFilters(window.updateWithFilteredStats);
    window.datasetFilters.triggerUpdate()
    flatpickr("#from-date-selector", {
        dateFormat: "j M Y",
        onChange: (selectedDates, dateStr, instance) => {
            console.log("Selected: " + selectedDates);
            console.log("As String: " + dateStr);
            console.log("Instance: " + instance);
            //window.updateWithFilteredStats();
            window.datasetFilters.setFrom(selectedDates[0]);
        },
    });
    flatpickr("#to-date-selector", {
        dateFormat: "j M Y",
        onChange: (selectedDates, dateStr, instance) => {
            console.log("Selected: " + selectedDates);
            console.log("As String: " + dateStr);
            console.log("Instance: " + instance);
            //window.updateWithFilteredStats();
            window.datasetFilters.setTo(selectedDates[0]);
        },
    });
    putATableOnTheScreen();
})
