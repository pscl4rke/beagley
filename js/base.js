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
        },
    });
    flatpickr("#to-date-selector", {
        dateFormat: "j M Y",
        onChange: (selectedDates, dateStr, instance) => {
            console.log("Selected: " + selectedDates);
            console.log("As String: " + dateStr);
            console.log("Instance: " + instance);
        },
    });
})
