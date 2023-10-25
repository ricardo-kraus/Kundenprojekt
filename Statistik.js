document.addEventListener("DOMContentLoaded", function () {
    var gespeicherteDaten = localStorage.getItem("people");
    var datenArray = JSON.parse(gespeicherteDaten);
    Chart.defaults.color = 'black';

    var sortSelector = document.getElementById("sortSelector");

    var chartData = {
        labels: datenArray,
        datasets: [
            {
                label: "positive",
                data: [],
                backgroundColor: "rgba(72, 168, 96, 0.4)",
                borderColor: "green",
                borderWidth: 1,
            },
            {
                label: "negative",
                data: [],
                backgroundColor: "rgba(198, 1, 31, 0.4)",
                borderColor: "#9D2933",
                borderWidth: 1,
            },
        ],
    };

    var options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: "black",
                },
            },
            x: {
                ticks: {
                    color: "black",
                },
            },
        },
    };

    var ctx = document.getElementById("mainDiagramm").getContext("2d");
    var myChart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: options,
    });

    function updateChartData(sortBy) {
        var updatedData = {
            positive: [],
            negative: [],
        };

        // Sortiere das Array basierend auf dem ausgewählten Kriterium
        datenArray.sort(function (a, b) {
            if (sortBy === "positive") {
                return (
                    parseInt(localStorage.getItem(b + "_positive_count")) -
                    parseInt(localStorage.getItem(a + "_positive_count"))
                );
            } else if (sortBy === "negative") {
                return (
                    parseInt(localStorage.getItem(b + "_negative_count")) -
                    parseInt(localStorage.getItem(a + "_negative_count"))
                );
            } else {
                // Alphabetische Sortierung (default)
                return a.localeCompare(b);
            }
        });

        datenArray.forEach(function (name) {
            var positiveCount = parseInt(localStorage.getItem(name + "_positive_count")) || 0;
            var negativeCount = parseInt(localStorage.getItem(name + "_negative_count")) || 0;

            updatedData.positive.push(positiveCount);
            updatedData.negative.push(negativeCount);
        });

        myChart.data.labels = datenArray;
        myChart.data.datasets[0].data = updatedData.positive;
        myChart.data.datasets[1].data = updatedData.negative;
        myChart.update();
    }

    function changeSort() {
        var sortBy = sortSelector.value;
        updateChartData(sortBy);
    }

    updateChartData("alphabetical"); // Initial sort by alphabetical order
});

const adminpageButton = document.getElementById("adminpage-button");

adminpageButton.addEventListener("click", function () {
    const adminpageUrl = "./AdminPage.html";
    window.location.href = adminpageUrl;
});
