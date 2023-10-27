const peopleList = document.getElementById("people-list");
const tasksList = document.getElementById("tasks-list");
const addPersonForm = document.getElementById("add-person-form");
const addTaskForm = document.getElementById("add-task-form");
const assignButton = document.getElementById("assign-button");

let people = [];
let tasks = [];
let assignments = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
};

function loadAssignmentsFromLocalStorage() {
  const storedAssignments = JSON.parse(localStorage.getItem("assignments")); // hier werden die daten aus local storage geladen
  if (storedAssignments) {
    assignments = storedAssignments;
  }

  const storedPeople = JSON.parse(localStorage.getItem("people"));
  if (storedPeople) {
    people = storedPeople;
    refreshPeopleList();
  }

  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    tasks = storedTasks;
    refreshTasksList();
  }
}

function saveAssignmentsToLocalStorage() {
  localStorage.setItem("assignments", JSON.stringify(assignments)); // hier habe ich es gemacht das die daten in local storage gespeicehrt werden
}

function savePeopleToLocalStorage() {
  localStorage.setItem("people", JSON.stringify(people));
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function durstenfeldShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // dies ist der randomiser um die tasks zu den personen random zu zuteilen
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

loadAssignmentsFromLocalStorage(); // hier habe ich es gemacht das die daten beim starten der Seite aus local storage abgerufen werden

addPersonForm.addEventListener("submit", function (e) {
  // hier habe ich die liste für die Personen gemacht
  e.preventDefault();
  const personNameInput = document.getElementById("person-name");
  const personName = personNameInput.value.trim();
  if (personName !== "") {
    if (!people.includes(personName)) {
      // und hier schaut der code ob die person schon vorhanden ist. fals ja wird sie nicht hinzugefügt
      people.push(personName);
      createListItemWithCloseButton(personName, peopleList);
      localStorage.setItem(
        personName,
        JSON.stringify(["monday", "tuesday", "wednesday", "thursday", "friday"])
      );
      saveAssignmentsToLocalStorage();
      savePeopleToLocalStorage(); // hier werden sie in local storage gespeichert
    }
    personNameInput.value = "";
  }
});

addTaskForm.addEventListener("submit", function (e) {
  // hier habe ich die liste für die Aufgaben gemacht
  e.preventDefault();
  const taskNameInput = document.getElementById("task-name");
  const taskName = taskNameInput.value.trim();
  if (taskName !== "") {
    if (!tasks.includes(taskName)) {
      // und hier schaut der code ob die Aufgaben schon vorhanden sind. fals ja werden sie nicht hinzugefügt
      tasks.push(taskName);
      createListItemWithCloseButton(taskName, tasksList);
      localStorage.setItem(
        taskName,
        JSON.stringify(["monday", "tuesday", "wednesday", "thursday", "friday"])
      );
      saveAssignmentsToLocalStorage();
      saveTasksToLocalStorage(); // hier werden sie in local storage gespeichert
    }
    taskNameInput.value = "";
  }
});

assignButton.addEventListener("click", function () {
  if (people.length === 0 || tasks.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Warning",
      text: "Please enter people and tasks before assigning.",
    });
    return;
  }

  let people_monday = [];
  let people_tuesday = [];
  let people_wednesday = [];
  let people_thursday = [];
  let people_friday = [];

  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    const personData = localStorage.getItem(person);

    if (personData !== null) {
      let availableDays = JSON.parse(localStorage.getItem(person)); // Parse the available days JSON
      const day = ["monday", "tuesday", "wednesday", "thursday", "friday"];

      for (let i = 0; i < day.length; i++) {
        if (availableDays.includes(day[i])) {
          console.log(`${person} is available on ${day[i]}`);
          switch (day[i]) {
            case "monday":
              people_monday.push(person);
              break;
            case "tuesday":
              people_tuesday.push(person);
              break;
            case "wednesday":
              people_wednesday.push(person);
              break;
            case "thursday":
              people_thursday.push(person);
              break;
            case "friday":
              people_friday.push(person);
              break;
          }
        } else {
          console.log(`${person} is not available on ${day[i]}`);
        }
      }
    }
  }

  // Now you have separate arrays for each day with only available people
  // Use these arrays in your `assignTasksOneDay` function as needed.
  assignments = {
    monday: assignTasksOneDay(people_monday, tasks),
    tuesday: assignTasksOneDay(people_tuesday, tasks),
    wednesday: assignTasksOneDay(people_wednesday, tasks),
    thursday: assignTasksOneDay(people_thursday, tasks),
    friday: assignTasksOneDay(people_friday, tasks),
  };

  saveAssignmentsToLocalStorage();
  Swal.fire({
    icon: "success",
    title: "Success",
    text: "Tasks assigned successfully!",
  });
});


function createListItemWithCloseButton(text, parentElement) {
  // hier habe ich einen Button gemacht um die elemente also aufgaben oder personen aus der liste zu entfernen
  const listItem = document.createElement("li");

  const modalButton = document.createElement("button");
  modalButton.textContent = text;
  modalButton.classList.add("btn", "btn-link");
  modalButton.setAttribute("data-bs-toggle", "modal");
  modalButton.setAttribute("data-bs-target", "#modal-" + text);
  listItem.appendChild(modalButton);

  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = "modal-" + text;
  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Select days for ${text}</h5>
          <button type="button" class="btn-close" id="closeButton" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <input type="checkbox" class="btn-check" id="btn-check-1-outlined-${text}" checked autocomplete="off">
              <label class="btn btn-outline-success btn-days" for="btn-check-1-outlined-${text}">Monday</label>
            </div>
            <div class="col">
              <input type="checkbox" class="btn-check" id="btn-check-2-outlined-${text}" checked autocomplete="off">
              <label class="btn btn-outline-success btn-days" for="btn-check-2-outlined-${text}">Tuesday</label>
            </div>
            <div class="col">
              <input type="checkbox" class="btn-check" id="btn-check-3-outlined-${text}" checked autocomplete="off">
              <label class="btn btn-outline-success btn-days" for="btn-check-3-outlined-${text}">Wednesday</label>
            </div>
            <div class="col">
              <input type="checkbox" class="btn-check" id="btn-check-4-outlined-${text}" checked autocomplete="off">
              <label class="btn btn-outline-success btn-days" for="btn-check-4-outlined-${text}">Thursday</label>
            </div>
            <div class="col">
              <input type="checkbox" class="btn-check" id="btn-check-5-outlined-${text}" checked autocomplete="off">
              <label class="btn btn-outline-success btn-days" for="btn-check-5-outlined-${text}">Friday</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const closeButton = document.createElement("span");
  closeButton.textContent = "x";
  closeButton.className = "close-button";
  closeButton.style.color = "red";
  closeButton.style.fontSize = "100%";
  closeButton.back;

  listItem.appendChild(closeButton);

  parentElement.appendChild(listItem);

  closeButton.addEventListener("click", function () {
    if (parentElement === peopleList) {
      removePerson(text);
      localStorage.removeItem(text);
    } else if (parentElement === tasksList) {
      removeTask(text);
      localStorage.removeItem(text);
    }
  });
  document.addEventListener("change", function (event) {
    const target = event.target;
    const id = target.id;
    let index = 1;
    const day = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    for (let i = 0; i < 5; i++) {
      if (
        target.classList.contains("btn-check") &&
        id.startsWith("btn-check-" + index + "-outlined-" + text)
      ) {
        if (target.checked) {
          const existingDays = JSON.parse(localStorage.getItem(text));
          if (!existingDays.includes(day[index - 1])) {
            existingDays.push(day[index - 1]);
            localStorage.setItem(text, JSON.stringify(existingDays));
          }
        } else {
          const existingDays = JSON.parse(localStorage.getItem(text));
          const dayIndex = existingDays.indexOf(day[index - 1]);
          if (dayIndex !== -1) {
            existingDays.splice(dayIndex, 1);

            // Store the updated array back in localStorage
            localStorage.setItem(text, JSON.stringify(existingDays));
          }
        }
      }
      index++;
    }
  });
}

function refreshTasksList() {
  // hier habe ich die funktion gemacht um die liste der Aufgaben zu aktualisieren
  tasksList.innerHTML = "";
  tasks.forEach((task) => createListItemWithCloseButton(task, tasksList));
}

function refreshPeopleList() {
  // hier habe ich die funktion gemacht um die liste der Personen zu aktualisieren
  peopleList.innerHTML = "";
  people.forEach((person) => createListItemWithCloseButton(person, peopleList));
}

function removePerson(personName) {
  // dies ist die funktion um die personen aus der liste zu entfernen
  const index = people.indexOf(personName);
  if (index !== -1) {
    people.splice(index, 1);
    refreshPeopleList();
    savePeopleToLocalStorage();
  }
}

function removeTask(taskName) {
  // dies ist die funktion um die Aufgabe aus der liste zu entfernen
  const index = tasks.indexOf(taskName);
  if (index !== -1) {
    tasks.splice(index, 1);
    refreshTasksList();
    saveTasksToLocalStorage();
  }
}

function assignTasksOneDay(people, tasks) {
  // dies ist die funktion um die Aufgaben und personen zu shuffeln ( von dem Shuffel-Allgorithmus)
  const shuffledTasks = durstenfeldShuffle([...tasks]);
  const shuffledPeople = durstenfeldShuffle([...people]);

  const assignments = {};

  for (const person of shuffledPeople) {
    // hier wird jeder person eine lehre Aufgabenliste erstellt
    assignments[person] = [];
  }

  for (let i = 0; i < shuffledTasks.length; i++) {
    // hier werden  die aufgaben den personen zugewiessen
    const person = shuffledPeople[i % shuffledPeople.length];
    assignments[person].push(shuffledTasks[i]);
  }

  for (const person of shuffledPeople) {
    if (assignments[person].length === 0) {
      // hier habe ich hinzugefügt das fals es weniger aufgaben als personen haben sollte das dann alle die keine aufgabe heben einfach entfernt werden
      delete assignments[person];
    }
  }

  return assignments;
}

const statisticsButton = document.getElementById("statistics-button"); // dies ist der Button um auf die Statistik Seite zu kommen
statisticsButton.addEventListener("click", function () {
  const statistikUrl = "./Statistik.html";
  window.location.href = statistikUrl;
});
// ....
