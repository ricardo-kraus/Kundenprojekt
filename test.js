// JavaScript-Funktionen

function updateLocalStorage() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const id = this.id;
            const checked = this.checked;
            localStorage.setItem(id, checked);
        });
    });

    checkboxes.forEach((checkbox) => {
        const id = checkbox.id;
        const checked = localStorage.getItem(id);
        if (checked !== null) {
            checkbox.checked = checked === "true";
        }
    });
}

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
    card.className = "card mx-auto mb-5";
    card.innerHTML = `
        <div class="card-body">
            <div class="card-title fs-5 fw-semibold" id="${cardId}">
                ${assignmentName} <!-- Zuerst der Name -->
            </div>
            <div class="card-text" id="cardname${day}${index}">
                ${taskName} <!-- Dann die Aufgabe -->
            </div>
        </div>
    `;

    document.getElementById(`card${day}`).appendChild(card);
}

function generateCards(day, assignments) {
    let index = 1;

    for (const assignmentName in assignments[day]) {
        const taskName = assignments[day][assignmentName];
        generateCard(day, assignmentName, taskName, index);
        index++;
    }
}

generateCards("monday", assignments);
generateCards("tuesday", assignments);
generateCards("wednesday", assignments);
generateCards("thursday", assignments);
generateCards("friday", assignments);
