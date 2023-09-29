document.addEventListener("DOMContentLoaded", function () {
  const peopleList = document.getElementById("people-list");
  const tasksList = document.getElementById("tasks-list");
  const addPersonForm = document.getElementById("add-person-form");
  const addTaskForm = document.getElementById("add-task-form");
  const assignButton = document.getElementById("assign-button");
  const taskAssignment = document.getElementById("task-assignment");

  let people = [];
  let tasks = [];
  let assignments = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  };

  // Funktion zum Laden von Daten aus dem Local Storage in das `assignments`-Array
  function loadAssignmentsFromLocalStorage() {
    const storedAssignments = JSON.parse(localStorage.getItem("assignments"));
    if (storedAssignments) {
      assignments = storedAssignments;
    }

    const storedPeople = JSON.parse(localStorage.getItem("people"));
    if (storedPeople) {
      people = storedPeople;
    }
  }

  // Funktion zum Speichern der aktuellen Zuordnungen im Local Storage
  function saveAssignmentsToLocalStorage() {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }

  // Funktion zum Speichern der Personen im Local Storage
  function savePeopleToLocalStorage() {
    localStorage.setItem("people", JSON.stringify(people));
  }

  // Rufen Sie die Daten aus dem Local Storage beim Laden der Seite ab
  loadAssignmentsFromLocalStorage();

  addPersonForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const personNameInput = document.getElementById("person-name");
    const personName = personNameInput.value.trim();
    if (personName !== "") {
      if (!people.includes(personName)) {
        people.push(personName);
        createListItemWithCloseButton(personName, peopleList);
        // Speichern Sie die aktualisierten Zuordnungen und Personen im Local Storage
        saveAssignmentsToLocalStorage();
        savePeopleToLocalStorage();
      }
      personNameInput.value = "";
    }
  });

  addTaskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskNameInput = document.getElementById("task-name");
    const taskName = taskNameInput.value.trim();
    if (taskName !== "") {
      if (!tasks.includes(taskName)) {
        tasks.push(taskName);
        createListItemWithCloseButton(taskName, tasksList);
        // Speichern Sie die aktualisierten Zuordnungen im Local Storage
        saveAssignmentsToLocalStorage();
      }
      taskNameInput.value = "";
    }
  });

  assignButton.addEventListener("click", function () {

    if (people.length === 0 || tasks.length === 0) {
      alert("Please enter people and tasks before assigning.");
      return;
    }

    assignments = {
      monday: assignTasksOneDay(people, tasks),
      tuesday: assignTasksOneDay(people, tasks),
      wednesday: assignTasksOneDay(people, tasks),
      thursday: assignTasksOneDay(people, tasks),
      friday: assignTasksOneDay(people, tasks),
    };
    // Aktiviere die Anzeige der Zuordnungen
    displayAssignments(assignments, taskAssignment);

    // Speichern Sie die aktualisierten Zuordnungen im Local Storage
    saveAssignmentsToLocalStorage();

     // Füge eine Erfolgsmeldung hinzu
  const successMessage = document.createElement("p");
  successMessage.textContent = "Successful!";
  taskAssignment.appendChild(successMessage);
});
 
  // Rest des Codes bleibt unverändert
  // Rest des unveränderten Codes

 
function createListItemWithCloseButton(text, parentElement) {
  const listItem = document.createElement("li");
  listItem.textContent = text;

  const closeButton = document.createElement("span");
  closeButton.textContent = "✖";
  closeButton.className = "close-button";

  listItem.appendChild(closeButton);

  parentElement.appendChild(listItem);

  closeButton.addEventListener("click", function () {
    if (parentElement === peopleList) {
      removePerson(text);
    } else if (parentElement === tasksList) {
      removeTask(text);
    }
  });
}
function refreshTasksList() {
  const tasksList = document.getElementById("tasks-list");
  tasksList.innerHTML = "";
  tasks.forEach((task) => createListItemWithCloseButton(task, tasksList));
}
function refreshPeopleList() {
  const peopleList = document.getElementById("people-list");
  peopleList.innerHTML = "";
  people.forEach((person) => createListItemWithCloseButton(person, peopleList));
}


function removePerson(personName) {
  const index = people.indexOf(personName);
  if (index !== -1) {
    people.splice(index, 1);
    refreshPeopleList();
    savePeopleToLocalStorage();
  }
}

function removeTask(taskName) {
  const index = tasks.indexOf(taskName);
  if (index !== -1) {
    tasks.splice(index, 1);
    refreshTasksList();
    saveAssignmentsToLocalStorage();
  }
}

  // Hier kommt die Definition für assignTasksOneDay und displayAssignments, falls benötigt
  function assignTasksOneDay(people, tasks) {
    const shuffledTasks = shuffleArray([...tasks]);
    const shuffledPeople = shuffleArray([...people]);
    const assignments = {};

    for (const person of shuffledPeople) {
      assignments[person] = [];
    }

    for (let i = 0; i < shuffledTasks.length; i++) {
      const person = shuffledPeople[i % shuffledPeople.length];
      assignments[person].push(shuffledTasks[i]);
    }

    for (const person of shuffledPeople) {
      if (assignments[person].length === 0) {
        delete assignments[person];
      }
    }

    return assignments;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function displayAssignments(assignments, targetElement) {
    targetElement.innerHTML = "";
    for (const person in assignments) {
      if (!assignments.hasOwnProperty(person)) {
        continue;
      }
      const personTasks = assignments[person];

      if (Array.isArray(personTasks)) {
        const assignmentString = `${person}: ${personTasks.join(", ")}`;
        createListItem(assignmentString, targetElement);
      }
    }
  }
});

const statisticsButton = document.getElementById("statistics-button");

statisticsButton.addEventListener("click", function () {
    const statistikUrl = "./Statistik.html";

    window.location.href = statistikUrl;
});