document.addEventListener("DOMContentLoaded", function () {
  const peopleList = document.getElementById("people-list");
  const tasksList = document.getElementById("tasks-list");
  const addPersonForm = document.getElementById("add-person-form");
  const addTaskForm = document.getElementById("add-task-form");
  const assignButton = document.getElementById("assign-button");
  const taskAssignment = document.getElementById("task-assignment");

  let people = [];
  let tasks = [];
  let assignments = {};

  addPersonForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const personNameInput = document.getElementById("person-name");
    const personName = personNameInput.value.trim();
    if (personName !== "") {
      if (!people.includes(personName)) {
        people.push(personName);
        createListItemWithCloseButton(personName, peopleList);
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
      }
      taskNameInput.value = "";
    }
  });

  function removePerson(personName) {
    people = people.filter((name) => name !== personName);
    refreshPeopleList();
  }

  function removeTask(taskName) {
    tasks = tasks.filter((task) => task !== taskName);
    refreshTasksList();
  }

  assignButton.addEventListener("click", function () {
    assignments = {
      monday: assignTasksOneDay(people, tasks),
      tuesday: assignTasksOneDay(people, tasks),
      wednesday: assignTasksOneDay(people, tasks),
      thursday: assignTasksOneDay(people, tasks),
      friday: assignTasksOneDay(people, tasks),
    };
    // Aktiviere die Anzeige der Zuordnungen
    displayAssignments(assignments, taskAssignment);

    // Speichere die Zuordnungen im localStorage
    localStorage.setItem("assignments", JSON.stringify(assignments));
  });

  function createListItem(text, parentElement) {
    const listItem = document.createElement("li");
    listItem.textContent = text;
    parentElement.appendChild(listItem);
  }

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

