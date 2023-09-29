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

  // Optionen für das Diagramm
  var options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "black", // Schriftfarbe der Zahlen auf der y-Achse ändern (z.B. 'red' für Rot)
        },
      },
      x: {
        ticks: {
          color: "black", // Schriftfarbe der Namen auf der x-Achse ändern (z.B. 'blue' für Blau)
        },
      },
    },
  };

  // Das Diagramm initialisieren
  var ctx = document.getElementById("mainDiagramm").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: options,
  });
});
