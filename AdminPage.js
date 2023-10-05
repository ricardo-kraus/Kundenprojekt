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

  function loadAssignmentsFromLocalStorage() {
    const storedAssignments = JSON.parse(localStorage.getItem("assignments"));
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
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }

  function savePeopleToLocalStorage() {
    localStorage.setItem("people", JSON.stringify(people));
  }

  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  loadAssignmentsFromLocalStorage();

  addPersonForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const personNameInput = document.getElementById("person-name");
    const personName = personNameInput.value.trim();
    if (personName !== "") {
      if (!people.includes(personName)) {
        people.push(personName);
        createListItemWithCloseButton(personName, peopleList);

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

        saveAssignmentsToLocalStorage();
        saveTasksToLocalStorage();
      }
      taskNameInput.value = "";
    }
  });

  assignButton.addEventListener("click", function () {
    if (people.length === 0 || tasks.length === 0) {
      //alert("Please enter people and tasks before assigning.");
  
      // Verwende sweetAlert für eine benutzerfreundliche Bestätigungsnachricht
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please enter people and tasks before assigning.',
      });
  
      return;
    }
  
    assignments = {
      monday: assignTasksOneDay(people, tasks),
      tuesday: assignTasksOneDay(people, tasks),
      wednesday: assignTasksOneDay(people, tasks),
      thursday: assignTasksOneDay(people, tasks),
      friday: assignTasksOneDay(people, tasks),
    };
  
    displayAssignments(assignments, taskAssignment);
  
    saveAssignmentsToLocalStorage();
  
    // Anzeigen der Bestätigungsnachricht mit sweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Tasks assigned successfully!',
    });
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

  function refreshTasksList() {
    tasksList.innerHTML = "";
    tasks.forEach((task) => createListItemWithCloseButton(task, tasksList));
  }

  function refreshPeopleList() {
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
      saveTasksToLocalStorage();
    }
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

  function createListItem(text, parentElement) {
    const listItem = document.createElement("li");
    listItem.textContent = text;
    parentElement.appendChild(listItem);
  }
});

const statisticsButton = document.getElementById("statistics-button");

statisticsButton.addEventListener("click", function () {
  const statistikUrl = "./Statistik.html";
  window.location.href = statistikUrl;
});