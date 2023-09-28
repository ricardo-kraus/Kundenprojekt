document.addEventListener("DOMContentLoaded", function () {

    const gesamtStatistik = document.getElementById("gesamtStatistik");
    const assignmentsList = document.getElementById("assignments-list");
    const barChart = document.getElementById("barChart");

    let data = JSON.parse(localStorage.getItem("nameData")) || [];

    // Funktion zum Aktualisieren des Diagramms
    function updateChart() {
        const names = data.map(item => item.name);
        const likes = data.map(item => item.likes);
        const dislikes = data.map(item => item.dislikes);

        if (barChart) {
            // Legende aktualisieren
            const legendContainer = document.getElementById("legend");
            legendContainer.innerHTML = '';
            names.forEach((name, index) => {
                const legendItem = document.createElement("div");
                legendItem.classList.add("legend-item");
                legendItem.innerHTML = `
                    <span>${name}</span>
                    <button class="likeBtn" onclick="like(${index})">Like</button>
                    <button class="dislikeBtn" onclick="dislike(${index})">Dislike</button>
                `;
                legendContainer.appendChild(legendItem);
            });

            new Chart(barChart, {
                type: "bar",
                data: {
                    labels: names,
                    datasets: [{
                        label: "Likes",
                        data: likes,
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1
                    }, {
                        label: "Dislikes",
                        data: dislikes,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    // Funktion zum Aktualisieren der Gesamtstatistik
    function updateStatistik() {
        const likesGesamt = data.reduce((sum, item) => sum + item.likes, 0);
        const dislikesGesamt = data.reduce((sum, item) => sum + item.dislikes, 0);
        gesamtStatistik.textContent = `Gesamt-Likes: ${likesGesamt}, Gesamt-Dislikes: ${dislikesGesamt}`;
    }

    // Funktion zum Liken eines Eintrags
    function like(index) {
        data[index].likes++;
        updateChart();
        updateStatistik();
        updateLocalStorage();
    }

    // Funktion zum Disliken eines Eintrags
    function dislike(index) {
        data[index].dislikes++;
        updateChart();
        updateStatistik();
        updateLocalStorage();
    }

    // Funktion zum Aktualisieren der Daten im Local Storage
    function updateLocalStorage() {
        localStorage.setItem("nameData", JSON.stringify(data));
    }

    // Button zum Einfügen ins Diagramm
    const einfuegenInsDiagrammButton = document.getElementById("einfuegenInsDiagramm");
    einfuegenInsDiagrammButton.addEventListener("click", function () {
        const savedData = JSON.parse(localStorage.getItem("nameData"));
        if (savedData) {
            // Aktualisieren der Daten aus dem Local Storage
            data = savedData;
            updateChart();
            updateStatistik();
        }
    });



    // Event-Listener zum Anzeigen der Aufgabenliste und Likes/Dislikes
    const showAssignmentsButton = document.getElementById("showAssignments");
    showAssignmentsButton.addEventListener("click", function () {
        const assignments = JSON.parse(localStorage.getItem("assignments")) || {};
        const people = Object.keys(assignments);

        assignmentsList.innerHTML = "";

        people.forEach(person => {
            const listItem = document.createElement("li");
            listItem.textContent = `Person: ${person}, Aufgaben: ${assignments[person].join(", ")}`;
            assignmentsList.appendChild(listItem);
        });
    });

    // Initialisieren der Daten aus dem Local Storage
    data = JSON.parse(localStorage.getItem("nameData")) || [];

    // Initialanzeige des Balkendiagramms
    updateChart();
    updateStatistik();
});
