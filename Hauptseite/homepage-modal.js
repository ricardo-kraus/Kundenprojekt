
// Function to toggle Dark Mode
function toggleDarkMode() {
  const htmlTag = document.documentElement;
  const darkmodeButton = document.getElementById("darkmode");

  // Toggle the data-bs-theme attribute value
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
// Check local storage for the saved mode
const savedMode = localStorage.getItem("mode");
if (savedMode === "dark") {
  // Apply dark mode
  document.documentElement.setAttribute("data-bs-theme", "dark");
  document.getElementById("darkmode").innerText = "Lightmode";
} else {
  // Apply light mode (default)
  document.documentElement.setAttribute("data-bs-theme", "light");
  document.getElementById("darkmode").innerText = "Darkmode";
}
// Attach the toggleDarkMode function to the Darkmode button's click event
document.getElementById("darkmode").addEventListener("click", toggleDarkMode);
document.getElementById("darkmode").addEventListener("click", changeMode);
function changeMode() {
  if (document.getElementById("darkmode").innerText === "Darkmode") {
    document.getElementById("darkmode").innerText = "Lightmode";
  } else document.getElementById("darkmode").innerText = "Darkmode";
}
// Kalenderwoche Anzeigen
let date = new Date();
function getWeekNumber(date) {
  date = new Date(date);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  let yearStart = new Date(date.getFullYear(), 0, 1);
  let weekNumber = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  return weekNumber;
}

let currentWeek = getWeekNumber(date);
let currentWeekString = currentWeek.toString();
document.getElementById("kw").innerHTML = "KW " + currentWeekString;

// JavaScript code for generating cards and modals

assignmentsJSON = localStorage.getItem("assignments");
assignments = JSON.parse(assignmentsJSON);
let name;

function generateCardAndModal(day, assignmentName, taskName, index) {
  // Create a new card element
  const cardId = `card${day}${index}`;
  const card = document.createElement("div");
  card.className = "card mx-auto mb-5";
  card.innerHTML = `
      <div class="card-body">
        <div class="card-title fs-5 fw-semibold" id="${cardId}">
          ${taskName}
        </div>
        <div class="card-text" id="cardname${day}${index}">
          ${assignmentName}
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm-custom"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal${day}${index}"
              data-bs-whatever="@${day}${index}"
            >
              Comment
            </button>
          </div>
          <label class="check mt-3">
            Done
            <input class="ms-1" type="checkbox" id="checkbox-${cardId}" />
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    `;

  // Create a new modal element
  const modalId = `exampleModal${day}${index}`;
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = modalId;
  modal.tabIndex = -1;
  modal.setAttribute("aria-labelledby", "exampleModalLabel");
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Comments</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Comments:</label>
                <input type="text" class="form-control" id="recipient-name" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" class="btn-check" name="btnradio-${day}-${index}" id="btnradio1-${day}-${index}" autocomplete="off" value="positive" checked>
              <label class="btn btn-outline-success" for="btnradio1-${day}-${index}">positive</label>

              <input type="radio" class="btn-check" name="btnradio-${day}-${index}" id="btnradio2-${day}-${index}" autocomplete="off" value="negative">
              <label class="btn btn-outline-danger" for="btnradio2-${day}-${index}">negative</label>
            </div>
            <input type="hidden" id="rating-${day}-${index}" value="positive">
            <button
              type="button"
              class="btn btn-outline-primary"
              data-bs-dismiss="modal"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    `;

  // Append the card and modal to their respective containers
  document.getElementById(`card${day}`).appendChild(card);
  document.body.appendChild(modal);
}

// Loop through your data and generate cards and modals
function generateCards(day, assignments) {
  let index = 1;

  for (const key in assignments[day]) {
    const assignmentName = key;
    const taskName = assignments[day][key];
    generateCardAndModal(day, assignmentName, taskName, index);
    index++;
  }
}

generateCards("monday", assignments);
generateCards("tuesday", assignments);
generateCards("wednesday", assignments);
generateCards("thursday", assignments);
generateCards("friday", assignments);
