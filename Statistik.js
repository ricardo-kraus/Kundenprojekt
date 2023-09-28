document.addEventListener('DOMContentLoaded', function() {
    // Daten aus dem Local Storage abrufen
    var gespeicherteDaten = localStorage.getItem('people');
    var datenArray = JSON.parse(gespeicherteDaten);

    // Verwende die abgerufenen Daten als Labels
    var data = {
        labels: datenArray, // Hier werden die Namen aus den gespeicherten Daten verwendet
        datasets: [{
            label: 'Umsatz',
            data: [50000, 1200, 99000, 40000, 1300], // Beispielwerte oder andere Daten
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    // Optionen für das Diagramm
    var options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white' // Schriftfarbe der Zahlen auf der y-Achse ändern (z.B. 'red' für Rot)
                }
            },
            x: {
                ticks: {
                    color: 'blue' // Schriftfarbe der Namen auf der x-Achse ändern (z.B. 'blue' für Blau)
                }
            }
        }
    };

    // Das Diagramm initialisieren
    var ctx = document.getElementById('mainDiagramm').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
});
