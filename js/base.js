window.updateWithFilteredStats = function() {
    let url = "http://localhost:8001";
    let params = window.datasetFilters.toURLParams();
    window.updateWithStatsFrom(url + "?" + params);
};

window.updateWithStatsFrom = async function (url) {
    const response = await fetch(url);
    const statsToShow = await response.json();
    let statsGroup = document.getElementById("my-stats-group");
    statsGroup.wallsAttempted = statsToShow.wallsAttempted;
    statsGroup.successfulWalls = statsToShow.successfulWalls;
    statsGroup.successfulFlypasts = statsToShow.successfulFlypasts;
};

document.addEventListener("DOMContentLoaded", (event) => {
    window.datasetFilters = new DatasetFilters(window.updateWithFilteredStats);
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
})
