let personName;
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
        <input type="radio" class="btn-check" name="rating-${day}-${index}" id="positive-${day}-${index}" autocomplete="off" value="positive">
        <label class="btn btn-outline-success" for="positive-${day}-${index}">
        <img class="img-thumbs-up"  src="https://icon-library.com/images/icon-thumbs-up/icon-thumbs-up-11.jpg" alt="thumbs up" />
        </label>

        <input type="radio" class="btn-check" name="rating-${day}-${index}" id="neutral-${day}-${index}" autocomplete="off" value="neutral" checked>
        <label class="btn btn-outline-warning" for="positive-${day}-${index}">    </label>

        <input type="radio" class="btn-check" name="rating-${day}-${index}" id="negative-${day}-${index}" autocomplete="off" value="negative">
        <label class="btn btn-outline-danger" for="negative-${day}-${index}">
        <img class="img-thumbs-down"  src="https://icon-library.com/images/icon-thumbs-up/icon-thumbs-up-11.jpg" alt="thumbs up" />
        </label>
      </div>
      <button class="btn btn-outline-light mt-2" data-bs-toggle="modal" data-bs-target="#commentModal-${day}-${index}">Comment</button>
    </div>
  `;

  document.getElementById(`card${day}`).appendChild(card);

  const positiveRadio = document.getElementById(`positive-${day}-${index}`);
  const negativeRadio = document.getElementById(`negative-${day}-${index}`);
  positiveRadio.addEventListener("change", function () {
    personName = assignmentName;
    handleRadioSelection(this, "positive");
    document.addEventListener("DOMContentLoaded", function (personName) {
      loadComments(personName);
    });
  });
  negativeRadio.addEventListener("change", function () {
    personName = assignmentName;
    handleRadioSelection(this, "negative");
    document.addEventListener("DOMContentLoaded", function (personName) {
      loadComments(personName);
    });
  });
  generateCommentModal(day, index, assignmentName);
}
function generateCommentModal(day, index, personName) {
  const modalId = `commentModal-${day}-${index}`;
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = modalId;
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Comment for ${personName}</h5>
          <button type="button" class="btn-close" id="closeButton-${day}-${index}"></button>
        </div>
        <div class="modal-body">
          <textarea id="commentText-${day}-${index}" class="form-control" rows="5" placeholder="Enter your comment here"></textarea>
          <div id="commentDisplay-${day}-${index}"></div> <!-- Display the comment here -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="saveButton-${day}-${index}">Save</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  let saveButtonClicked = false;
  const closeButton = document.getElementById(`closeButton-${day}-${index}`);
  closeButton.addEventListener("click", function () {
    const commentTextarea = document.getElementById(`commentText-${day}-${index}`);
    const commentText = commentTextarea.value.trim();
    if (!saveButtonClicked && commentText !== "") {
      const confirmation = window.confirm("Do you want to close without saving?");
      if (!confirmation) {
        return;
      }
    }
    redirectToHomepage();
  });
  const saveButton = document.getElementById(`saveButton-${day}-${index}`);
  saveButton.addEventListener("click", saveCommentAndDisplay);

  // Load and display the saved comment if available
  const savedCommentKey = `comment-${day}-${index}`;
  const savedCommentText = localStorage.getItem(savedCommentKey);
  if (savedCommentText) {
    const commentTextarea = document.getElementById(`commentText-${day}-${index}`);
    commentTextarea.value = savedCommentText;
    saveCommentAndDisplay(); // Display the comment immediately
  }

  function saveCommentAndDisplay() {
    const commentTextarea = document.getElementById(`commentText-${day}-${index}`);
    const commentDisplay = document.getElementById(`commentDisplay-${day}-${index}`);
    const commentText = commentTextarea.value.trim();
    if (commentText !== "") {
      saveComment(day, index, commentText);
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "X";
      deleteButton.className = "btn btn-danger delete-comment";
      deleteButton.addEventListener("click", function () {
        commentDisplay.remove();
        localStorage.removeItem(`comment-${day}-${index}`);
      });
      const commentContainer = document.createElement("div");
      commentContainer.className = "comment-container";
      commentContainer.innerHTML = `<p>${commentText}</p>`;
      commentContainer.appendChild(deleteButton);
      commentDisplay.appendChild(commentContainer);
      commentTextarea.value = "";
      saveButtonClicked = true;
    }
  }

  function saveComment(day, index, commentText) {
    const commentKey = `comment-${day}-${index}`;
    localStorage.setItem(commentKey, commentText);
  }

  function redirectToHomepage() {
    window.location.href = "Homepage.html";
  }
}
function loadComments(personName) {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  for (const day of days) {
    for (let index = 1; index <= assignments[day].length; index++) {
      const commentKey = `${personName}_${day}_${index}_comment`;
      const commentText = localStorage.getItem(commentKey);
      if (commentText !== null) {
        document.getElementById(`commentText-${day}-${index}`).value =
          commentText;
      }
    }
  }
}
function handleRadioSelection(radio, color) {
  if (radio.checked) {
    const assignmentName = radio.getAttribute("name").split("-")[1];
    const StorageKey = `${personName}_${assignmentName}_positive_count`;
    const finalPositiveRatingCountStorage = `${personName}_positive_count`;
    const finalNegativeRatingCountStorage = `${personName}_negative_count`;
    let finalPositiveRatingCount = localStorage.getItem(finalPositiveRatingCountStorage) || 0;
    let finalNegativeRatingCount = localStorage.getItem(finalNegativeRatingCountStorage) || 0;
    let positiveCount = localStorage.getItem(StorageKey) || 0;
    if (color === "positive") {
      positiveCount = parseInt(positiveCount) + 1;
      localStorage.setItem(StorageKey, positiveCount);
      finalPositiveRatingCount = parseInt(finalPositiveRatingCount) + 1;
      localStorage.setItem(finalPositiveRatingCountStorage, finalPositiveRatingCount);
    } else if (color === "negative") {
      positiveCount = 0;
      localStorage.setItem(StorageKey, positiveCount);
      finalNegativeRatingCount = parseInt(finalNegativeRatingCount) + 1;
      localStorage.setItem(finalNegativeRatingCountStorage, finalNegativeRatingCount);
    }
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
