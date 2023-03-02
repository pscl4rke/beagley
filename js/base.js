window.updateWithFilteredStats = function() {
    let url = "http://localhost:8001";
    let params = new URLSearchParams();
    params.set("xxx", "yyy");
    let from = document.getElementById("from-date-selector");
    params.set("from", from.value);
    let to = document.getElementById("to-date-selector");
    params.set("to", to.value);
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
    console.log("ready " + event);
    flatpickr("#from-date-selector", {
        dateFormat: "j M Y",
        onChange: (selectedDates, dateStr, instance) => {
            console.log("Selected: " + selectedDates);
            console.log("As String: " + dateStr);
            console.log("Instance: " + instance);
            window.updateWithFilteredStats();
        },
    });
    flatpickr("#to-date-selector", {
        dateFormat: "j M Y",
        onChange: (selectedDates, dateStr, instance) => {
            console.log("Selected: " + selectedDates);
            console.log("As String: " + dateStr);
            console.log("Instance: " + instance);
            window.updateWithFilteredStats();
        },
    });
})
