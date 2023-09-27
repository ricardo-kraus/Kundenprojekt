// Warten, bis das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function () {
    const barChart = document.getElementById("barChart").getContext("2d");
  
    // Funktion zum Abrufen von Aufgaben und Personen aus dem Local Storage
    function getDataFromLocalStorage() {
      const savedData = JSON.parse(localStorage.getItem("assignments"));
      if (savedData) {
        return Object.entries(savedData).map(([name, tasks]) => ({
          name,
          likes: 0,
          dislikes: 0,
          tasks,
        }));
      }
      return [];
    }
  
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
  
    // Funktion zum Liken eines Eintrags
    function like(index) {
      data[index].likes++;
      updateChart();
      updateLocalStorage();
    }
  
    // Funktion zum Disliken eines Eintrags
    function dislike(index) {
      data[index].dislikes++;
      updateChart();
      updateLocalStorage();
    }
  
    // Funktion zum Aktualisieren der Daten im Local Storage
    function updateLocalStorage() {
      localStorage.setItem("assignments", JSON.stringify(data));
    }
  
    // Button zum Einfügen ins Diagramm
    const einfuegenInsDiagrammButton = document.getElementById("einfuegenInsDiagramm");
    einfuegenInsDiagrammButton.addEventListener("click", function () {
      const savedData = JSON.parse(localStorage.getItem("assignments"));
      if (savedData) {
        // Aktualisieren der Daten aus dem Local Storage
        data = savedData;
        updateChart();
      }
    });
  
    // Initialisieren der Daten aus dem Local Storage
    data = getDataFromLocalStorage();
  
    // Initialanzeige des Balkendiagramms
    updateChart();
  });
  