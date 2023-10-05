document.addEventListener("DOMContentLoaded", function () {

    var gespeicherteDaten = localStorage.getItem("people");
    var datenArray = JSON.parse(gespeicherteDaten);
    Chart.defaults.color = 'black';
  
    var data = {
      labels: datenArray, 
      datasets: [
        {
          label: "positive",
          data: [1, 2, 3, 4, 5], 
          backgroundColor: "rgba(72, 168, 96, 0.4)",
          borderColor: "green",
          borderWidth: 1,
        },
        {
          label: "negative",
          data: [1, 2, 3, 5, 6], 
          backgroundColor: "rgba(198, 1, 31, 0.4)",
          borderColor: "#9D2933",
          borderWidth: 1,
        },
      ],
    };
  
   
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
  

      var ctx = document.getElementById("mainDiagramm").getContext("2d");
      var myChart = new Chart(ctx, {
          type: "bar",
          data: chartData,
          options: options,
      });
  

      function updateChartData() {
   
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
  

          myChart.data.datasets[0].data = updatedData.positive;
          myChart.data.datasets[1].data = updatedData.negative;
          myChart.update();
      }
  

      updateChartData();
  });
  
  const adminpageButton = document.getElementById("adminpage-button");
  
  adminpageButton.addEventListener("click", function () {
      const adminpageUrl = "./AdminPage.html";
  
      window.location.href = adminpageUrl;
  });