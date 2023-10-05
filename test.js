
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
        <input type="radio" class="btn-check" name="rating-${day}-${index}" id="positive-${day}-${index}" autocomplete="off" value="positive" checked>
        <label class="btn btn-outline-success" for="positive-${day}-${index}">Positive</label>

        <input type="radio" class="btn-check" name="rating-${day}-${index}" id="negative-${day}-${index}" autocomplete="off" value="negative">
        <label class="btn btn-outline-danger" for="negative-${day}-${index}">Negative</label>
      </div>
      <button class="btn btn-outline-light mt-2" data-bs-toggle="modal" data-bs-target="#commentModal-${day}-${index}">Comment</button>
    </div>
  `;

  document.getElementById(`card${day}`).appendChild(card);

 
  const positiveRadio = document.getElementById(`positive-${day}-${index}`);
  const negativeRadio = document.getElementById(`negative-${day}-${index}`);

  positiveRadio.addEventListener("change", function () {
    handleRadioSelection(this, "positive");
    personName = assignmentName;
    document.addEventListener("DOMContentLoaded", function (personName) {
      loadComments(personName);
    });
  });

  negativeRadio.addEventListener("change", function () {
    handleRadioSelection(this, "negative");
    personName = assignmentName;
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
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <textarea id="commentText-${day}-${index}" class="form-control" rows="5" placeholder="Enter your comment here"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="saveComment('${day}', ${index})">Save Comment</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}



function saveComment(day, index) {
  const commentText = document.getElementById(
    `commentText-${day}-${index}`
  ).value;
  const commentKey = `${personName}_${day}_${index}_comment`;

  
  localStorage.setItem(commentKey, commentText);
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

    const positiveStorageKey = `${personName}_${assignmentName}_positive_count`;
    const negativeStorageKey = `${personName}_${assignmentName}_negative_count`;

    if (color === "positive") {
      localStorage.setItem(positiveStorageKey, "1");
      localStorage.setItem(negativeStorageKey, "0"); 
    } else if (color === "negative") {
      localStorage.setItem(negativeStorageKey, "1");
      localStorage.setItem(positiveStorageKey, "0"); 
    }

   
    const cardId = `card${assignmentName}`;
    const card = document.getElementById(cardId);
    card.setAttribute(`data-${color}-count`, "1");
    const oppositeColor = color === "positive" ? "negative" : "positive";
    card.setAttribute(`data-${oppositeColor}-count`, "0");

   
    calculateAndStoreTotalCounts(personName, color);
  }
}


function calculateAndStoreTotalCounts(personName, color) {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  let totalCount = 0;


  for (const day of days) {
    const count = parseInt(
      localStorage.getItem(`${personName}_${day}_${color}_count`) || 0
    );
    totalCount += count;
  }


  localStorage.setItem(`${personName}_${color}_count`, totalCount.toString());
}

function generateCards(day, assignments) {
  let index = 1;

  for (const assignmentName in assignments[day]) {
    const taskName = assignments[day][assignmentName];
    generateCard(day, assignmentName, taskName, index);
    console.log(assignmentName);
    index++;
  }
}

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
