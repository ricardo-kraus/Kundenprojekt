// JavaScript-Funktionen

function toggleDarkMode() {
  const htmlTag = document.documentElement;
  const darkmodeButton = document.getElementById("darkmode");

  if (htmlTag.getAttribute("data-bs-theme") === "dark") {
    htmlTag.setAttribute("data-bs-theme", "light");
    darkmodeButton.innerText = "Lightmode";
    localStorage.setItem("mode", "light");
  } else {
    htmlTag.setAttribute("data-bs-theme", "dark");
    darkmodeButton.innerText = "Darkmode";
    localStorage.setItem("mode", "dark");
  }
}

const savedMode = localStorage.getItem("mode");
if (savedMode === "dark") {
  document.documentElement.setAttribute("data-bs-theme", "dark");
  document.getElementById("darkmode").innerText = "Lightmode";
} else {
  document.documentElement.setAttribute("data-bs-theme", "light");
  document.getElementById("darkmode").innerText = "Darkmode";
}

document.getElementById("darkmode").addEventListener("click", toggleDarkMode);

// Weitere JavaScript-Funktionen hier einfügen

// Beispiel: Die Funktionen für das Generieren von Karten
assignmentsJSON = localStorage.getItem("assignments");
assignments = JSON.parse(assignmentsJSON);

function generateCard(day, assignmentName, taskName, index) {
  const cardId = `card${day}${index}`;
  const card = document.createElement("div");
  card.className = "card mx-auto mb-5 ";
  card.innerHTML = `
  <div class="card-body">
  <div class="card-title fs-5 fw-semibold" id="${cardId}">
      ${assignmentName} <!-- Zuerst der Name -->
  </div>
  <div class="card-text" id="cardname${day}${index}">
      ${taskName} <!-- Dann die Aufgabe -->
  </div>
  <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
    <input type="radio" class="btn-check" name="rating-${day}-${index}" id="positive-${day}-${index}" autocomplete="off" value="positive" checked>
    <label class="btn btn-outline-success" for="positive-${day}-${index}">Positive</label>

    <input type="radio" class="btn-check" name="rating-${day}-${index}" id="negative-${day}-${index}" autocomplete="off" value="negative">
    <label class="btn btn-outline-danger" for="negative-${day}-${index}">Negative</label>
  </div>
</div>
    `;

  document.getElementById(`card${day}`).appendChild(card);

  // Add event listeners for the green and red buttons
  const positiveRadio = document.getElementById(`positive-${day}-${index}`);
  const negativeRadio = document.getElementById(`negative-${day}-${index}`);

  positiveRadio.addEventListener("change", function () {
    handleRadioSelection(this, "positive");
  });

  negativeRadio.addEventListener("change", function () {
    handleRadioSelection(this, "negative");
  });
}

function handleRadioSelection(radio, color) {
  if (radio.checked) {
    const assignmentName = radio.getAttribute("name").split("-")[1];
    const positiveStorageKey = `${assignmentName}_positive_count`;
    const negativeStorageKey = `${assignmentName}_negative_count`;

    // Check if the selected option is "positive" or "negative"
    if (color === "positive") {
      localStorage.setItem(positiveStorageKey, "1");
      localStorage.setItem(negativeStorageKey, "0"); // Reset the negative count
    } else if (color === "negative") {
      localStorage.setItem(negativeStorageKey, "1");
      localStorage.setItem(positiveStorageKey, "0"); // Reset the positive count
    }

    // Update the card's data attributes to store the current selection
    const cardId = `card${assignmentName}`;
    const card = document.getElementById(cardId);
    card.setAttribute(`data-${color}-count`, "1");
    const oppositeColor = color === "positive" ? "negative" : "positive";
    card.setAttribute(`data-${oppositeColor}-count`, "0");
  }
}

function generateCards(day, assignments) {
  let index = 1;

  for (const assignmentName in assignments[day]) {
    const taskName = assignments[day][assignmentName];
    generateCard(day, assignmentName, taskName, index);
    index++;
  }
}
// Call the initial generation function AFTER it's defined
generateCards("monday", assignments);
generateCards("tuesday", assignments);
generateCards("wednesday", assignments);
generateCards("thursday", assignments);
generateCards("friday", assignments);
