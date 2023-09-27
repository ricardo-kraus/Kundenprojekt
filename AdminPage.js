// Warten, bis das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function () {
  const peopleList = document.getElementById("people-list");
  const tasksList = document.getElementById("tasks-list");
  const assignButton = document.getElementById("assign-button");
  const taskAssignment = document.getElementById("task-assignment");
  const assignmentResult = document.getElementById("success-message");

  let people = [];
  let tasks = [];
  let assignments = {};

  // Funktion zum Aktualisieren des Local Storage für Personen und Aufgaben
  function updateLocalStorage() {
    localStorage.setItem("people", JSON.stringify(people));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  assignButton.addEventListener("click", function () {
    assignments = {
      monday: assignTasksOneDay(people, tasks),
      tuesday: assignTasksOneDay(people, tasks),
      wednesday: assignTasksOneDay(people, tasks),
      thursday: assignTasksOneDay(people, tasks),
      friday: assignTasksOneDay(people, tasks),
    };

    localStorage.setItem("assignments", JSON.stringify(assignments));

    displayAssignments(assignments, taskAssignment);
    console.log(assignments);

    assignmentResult.textContent = "Die Aufgaben wurden erfolgreich zugewiesen";
    assignmentResult.style.display = "block";
  });

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

  function removePerson(personName) {
    people = people.filter((name) => name !== personName);
    refreshPeopleList();
    updateLocalStorage();
  }

  function removeTask(taskName) {
    tasks = tasks.filter((task) => task !== taskName);
    refreshTasksList();
    updateLocalStorage();
  }

  function refreshPeopleList() {
    peopleList.innerHTML = "";
    people.forEach((person) =>
      createListItemWithCloseButton(person, peopleList)
    );
  }

  function refreshTasksList() {
    tasksList.innerHTML = "";
    tasks.forEach((task) => createListItemWithCloseButton(task, tasksList));
  }

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

  // Laden von Personen und Aufgaben aus dem Local Storage
  people = JSON.parse(localStorage.getItem("people")) || [];
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Initialanzeige der Listen
  refreshPeopleList();
  refreshTasksList();
});

// Rest Ihres Codes bleibt unverändert
