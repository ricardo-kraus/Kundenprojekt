document.addEventListener("DOMContentLoaded", function () {
  // Daten aus dem Local Storage abrufen
  var gespeicherteDaten = localStorage.getItem("people");
  var datenArray = JSON.parse(gespeicherteDaten);
  Chart.defaults.color = 'black';
  // Verwende die abgerufenen Daten als Labels
  var data = {
    labels: datenArray, // Hier werden die Namen aus den gespeicherten Daten verwendet
    datasets: [
      {
        label: "positive",
        data: [1, 2, 3, 4, 5], // Beispielwerte oder andere Daten
        backgroundColor: "rgba(72, 168, 96, 0.4)",
        borderColor: "green",
        borderWidth: 1,
      },
      {
        label: "negative",
        data: [1, 2, 3, 5, 6], // Beispielwerte oder andere Daten
        backgroundColor: "rgba(198, 1, 31, 0.4)",
        borderColor: "#9D2933",
        borderWidth: 1,
      },
    ],
  };

    // Initialisieren Sie die Chart.js-Daten und Optionen
    var chartData = {
        labels: datenArray,
        datasets: [
            {
                label: "positive",
                data: [], // Leer initialisieren
                backgroundColor: "rgba(72, 168, 96, 0.4)",
                borderColor: "green",
                borderWidth: 1,
            },
            {
                label: "negative",
                data: [], // Leer initialisieren
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
                    color: "white",
                },
            },
            x: {
                ticks: {
                    color: "white",
                },
            },
        },
    };

    // Das Diagramm initialisieren
    var ctx = document.getElementById("mainDiagramm").getContext("2d");
    var myChart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: options,
    });

    // Funktion zum Aktualisieren der Chart-Daten
    function updateChartData() {
        // Holen Sie die aktuellen Counts aus dem Local Storage
        var updatedData = {
            positive: [],
            negative: [],
        };

        datenArray.forEach(function (name) {
            var positiveCount = parseInt(localStorage.getItem(name + "_positive_count")) || 0;
            var negativeCount = parseInt(localStorage.getItem(name + "_negative_count")) || 0;

            updatedData.positive.push(positiveCount);
            updatedData.negative.push(negativeCount);
        });

        // Aktualisieren Sie die Chart-Daten und zeichnen Sie das Diagramm neu
        myChart.data.datasets[0].data = updatedData.positive;
        myChart.data.datasets[1].data = updatedData.negative;
        myChart.update();
    }

    // Initial die Chart-Daten aktualisieren
    // Hier werden die Namen aus den gespeicherten Daten verwendet
    updateChartData();
});

const adminpageButton = document.getElementById("adminpage-button");

adminpageButton.addEventListener("click", function () {
    const adminpageUrl = "./AdminPage.html";

    window.location.href = adminpageUrl;
});
