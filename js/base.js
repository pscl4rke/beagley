window.updateWithFilteredStats = function() {
    let url = "http://localhost:8001/foobar/summary/";
    let params = window.datasetFilters.toURLParams();
    window.updateWithStatsFrom(url + "?" + params);
    if (window.dataGrid !== undefined) {
        window.dataGrid.forceRender();
    }
    let csvUrl = "http://localhost:8001/foobar/wallscsv/";
    document.getElementById("csv-link").href = csvUrl + "?" + params;
};

window.updateWithStatsFrom = async function (url) {
    const response = await fetch(url);
    const statsToShow = await response.json();
    let statsGroup = document.getElementById("my-stats-group");
    statsGroup.wallsAttempted = statsToShow.wallsAttempted;
    statsGroup.successfulWalls = statsToShow.successfulWalls;
    statsGroup.successfulFlypasts = statsToShow.successfulFlypasts;
    if (window.demochart !== undefined) {
        let failed = statsToShow.wallsAttempted - statsToShow.successfulWalls;
        let successful = statsToShow.successfulWalls;
        console.log(`Redraw pie: fail: ${failed}, succ: ${successful}`)
        window.demochart.data.datasets[0].data[0] = failed;
        window.demochart.data.datasets[0].data[1] = successful;
        window.demochart.update()
    }
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

async function updateMeta() {
    let url = "http://localhost:8001/foobar/meta/"
    const response = await fetch(url);
    const meta = await response.json();
    document.getElementById("document-header").documentTitle = meta.documentTitle;
    document.getElementById("document-header").earliest = meta.earliest;
    document.getElementById("document-header").latest = meta.latest;
}

document.addEventListener("DOMContentLoaded", (_event) => {
    updateMeta();
    Chart.overrides["pie"].plugins.legend.position = "right";
    window.demochart = new Chart (document.getElementById("demochart"), {
        type: "pie",
        data: {
            labels: ["Failed", "Successful"],
            datasets: [{
                data: [0, 0],  // to be updated from stats
                backgroundColor: ['#BBBBBB', '#231D53'],
            }],
        },
    })
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
