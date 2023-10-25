let personName;
let ratingstorage;
const htmlElement = document.documentElement;

function toggleDarkMode() {
  const darkmodeButton = document.getElementById("darkmode");
  if (htmlElement.getAttribute("data-bs-theme") === "dark") {
    htmlElement.setAttribute("data-bs-theme", "light");
    darkmodeButton.innerText = "Darkmode";
    localStorage.setItem("mode", "light");
  } else {
    htmlElement.setAttribute("data-bs-theme", "dark");
    darkmodeButton.innerText = "Lightmode";
    localStorage.setItem("mode", "dark");
  }
}
document.getElementById("darkmode").addEventListener("click", toggleDarkMode);
assignmentsJSON = localStorage.getItem("assignments");
assignments = JSON.parse(assignmentsJSON);
function generateCard(day, personName, taskName, index) {
  const cardId = `card${day}${index}`;
  const card = document.createElement("div");
  card.className = "card mx-auto mb-5 ";
  card.innerHTML = `
    <div class="card-body">
      <div class="card-title fs-5 fw-semibold" id="${cardId}" personName="${personName}">
        ${personName} <!-- Zuerst der Name -->
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
  document.getElementById(`cards${day}`).appendChild(card);
  const positiveRadio = document.getElementById(`positive-${day}-${index}`);
  const negativeRadio = document.getElementById(`negative-${day}-${index}`);
  positiveRadio.addEventListener("change", function () {
    handleRadioSelection(this, "positive", personName, taskName);
  });
  negativeRadio.addEventListener("change", function () {
    handleRadioSelection(this, "negative", personName, taskName);
  });
  generateCommentModal(day, index, personName);
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
          <button type="button" class="btn-close" id="closeButton-${day}-${index}" data-bs-dismiss="modal"></button>
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
  const closeButton = document.getElementById(`closeButton-${day}-${index}`);
  closeButton.addEventListener("click", function () {
    const commentTextarea = document.getElementById(
      `commentText-${day}-${index}`
    );
    const commentText = commentTextarea.value.trim();
    if (commentText !== "") {
      const confirmation = window.confirm(
        "Do you want to close without saving?"
      );
      if (!confirmation) {
        return;
      }
    }
    // redirectToHomepage();
  });

  const saveButton = document.getElementById(`saveButton-${day}-${index}`);
  const commentTextarea = document.getElementById(
    `commentText-${day}-${index}`
  );
  const commentText = commentTextarea.value.trim();
  saveButton.addEventListener(
    "click",
    handleSaveButtonClick(day, index, commentText)
  );

  const savedCommentKey = `comment-${day}-${index}`;
  const savedCommentText = localStorage.getItem(savedCommentKey);
  if (savedCommentText) {
    commentTextarea.value = savedCommentText;
    saveButtonClicked = true;
    displaySavedComment(day, index, savedCommentText);
  }
}
function handleSaveButtonClick(day, index, commentText) {
  saveCommentAndDisplay(day, index, commentText);
}

function saveCommentAndDisplay(day, index, commentText) {
  console.log(commentText);
  if (commentText !== "") {
    console.log("test")
    saveComment(day, index, commentText);
    displaySavedComment(day, index, commentText);
    commentTextarea.value = "";
    // saveButtonClicked = true;
    
  }
}

function saveComment(day, index, commentText) {
  const commentKey = `comment-${day}-${index}`;
  localStorage.setItem(commentKey, commentText);
}

function displaySavedComment(day, index, savedCommentText) {
  const commentDisplay = document.getElementById(
    `commentDisplay-${day}-${index}`
  );
  const commentContainer = createCommentContainer(day, index, savedCommentText);
  commentDisplay.appendChild(commentContainer);
}

function createCommentContainer(day, index, savedCommentText) {
  const commentContainer = document.createElement("div");
  commentContainer.className = "comment-container";
  commentContainer.innerHTML = `<p>${savedCommentText}</p>`;
  commentContainer.style.display = "flex";
  commentContainer.style.alignItems = "center";
  commentContainer.id = `comment-${day}-${index}`;

  const deleteButton = createDeleteButton(day, index);
  commentContainer.appendChild(deleteButton);

  return commentContainer;
}

function createDeleteButton(day, index) {
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "X";
  deleteButton.style.color = "red";
  deleteButton.style.backgroundColor = "transparent";
  deleteButton.className = "btn delete-comment";
  deleteButton.addEventListener("click", function () {
    const commentContainer = deleteButton.parentNode;
    commentContainer.remove();
    localStorage.removeItem(`comment-${day}-${index}`);
  });

  return deleteButton;
}
function redirectToHomepage() {
  window.location.href = "Homepage.html";
}

function handleRadioSelection(radio, ratingValue, personName, taskName) {
  if (radio.checked) {
    const day = radio.getAttribute("name").split("-")[1];
    const oldValue = ratingstorage;
    ratingstorage = ratingValue;
    console.log(taskName);
    console.log(personName);
    let task = taskName;
    let ratings = JSON.parse(localStorage.getItem("ratings")) || {};
    if (!ratings[personName]) {
      ratings[personName] = {};
    }
    if (!ratings[personName][day]) {
      ratings[personName][day] = {};
    }
    if (!ratings[personName][day][task]) {
      ratings[personName][day][task] = {
        negativeCount: 0,
        positiveCount: 0,
      };
    }
    ratings[personName][day][task][ratingValue + "Count"] += 1;
    if (
      ratings[personName][day][task]["positiveCount"] == 1 &&
      ratingValue == "negative"
    ) {
      // Decrease the positive count only if it was previously positive
      ratings[personName][day][task]["positiveCount"] -= 1;
    } else if (
      ratings[personName][day][task]["negativeCount"] == 1 &&
      ratingValue == "positive"
    ) {
      // Decrease the negative count only if it was previously negative
      ratings[personName][day][task]["negativeCount"] -= 1;
    }
    // Store the updated ratings object back to localStorage
    localStorage.setItem("ratings", JSON.stringify(ratings));
    // Calculate and store total counts for the person
    calculateAndStoreTotalCounts(personName);
  }
}
function calculateAndStoreTotalCounts(personName) {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  let totalPositiveCount = 0;
  let totalNegativeCount = 0;
  let ratings = JSON.parse(localStorage.getItem("ratings")) || {};
  for (const day of days) {
    if (ratings[personName]) {
      for (const task in ratings[personName][day]) {
        const taskData = ratings[personName][day][task];
        totalPositiveCount += taskData.positiveCount || 0;
        totalNegativeCount += taskData.negativeCount || 0;
      }
    }
  }
  // Store the total counts for the person
  localStorage.setItem(
    `${personName}_positive_count`,
    totalPositiveCount.toString()
  );
  localStorage.setItem(
    `${personName}_negative_count`,
    totalNegativeCount.toString()
  );
}
function generateCards(day, assignments) {
  let index = 1;
  for (const personName in assignments[day]) {
    const taskName = assignments[day][personName];
    generateCard(day, personName, taskName, index);
    index++;
  }
}
generateCards("monday", assignments);
generateCards("tuesday", assignments);
generateCards("wednesday", assignments);
generateCards("thursday", assignments);
generateCards("friday", assignments);
function getCurrentWeekNumber() {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setDate(currentDate.getDate() + 4 - (currentDate.getDay() || 7));
  const yearStart = new Date(currentDate.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((currentDate - yearStart) / 86400000 + 1) / 7);
  return weekNumber;
}
const currentWeek = getCurrentWeekNumber();
document.getElementById("kw").textContent = `KW ${currentWeek}`;
