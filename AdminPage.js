document.addEventListener("DOMContentLoaded", function () {
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

        saveAssignmentsToLocalStorage();
        saveTasksToLocalStorage(); // hier werden sie in local storage gespeichert
      }
      taskNameInput.value = "";
    }
  });

  assignButton.addEventListener("click", function () {
    // hier werden die Aufgaben den personen zugeteilt

    if (people.length === 0 || tasks.length === 0) {
      Swal.fire({
        icon: "warning", // hier habe ich mit hilfe von SweetAlert eine warnmeldung hinzugefügt fals es keine personen oder aufgaben hat
        title: "Warning",
        text: "Please enter people and tasks before assigning.",
      });
      return;
    }

    assignments = {
      // hier werden die personen den wochentagen zugewiessen
      monday: assignTasksOneDay(people, tasks),
      tuesday: assignTasksOneDay(people, tasks),
      wednesday: assignTasksOneDay(people, tasks),
      thursday: assignTasksOneDay(people, tasks),
      friday: assignTasksOneDay(people, tasks),
    };

    saveAssignmentsToLocalStorage(); // hier werden die daten in local storage gespeichert und aktialisiert

    Swal.fire({
      icon: "success",
      title: "Success", // hier habe ich mit sweetAlert eine erfolgs meldung eingefügt
      text: "Tasks assigned successfully!",
    });
  });

  function createListItemWithCloseButton(text, parentElement) {
    // hier habe ich einen Button gemacht um die elemente also aufgaben oder personen aus der liste zu entfernen
    const listItem = document.createElement("li");
    listItem.textContent = text;

    const closeButton = document.createElement("span");
    closeButton.textContent = "X";
    closeButton.className = "close-button";
    closeButton.style.color = "red";
    closeButton.style.fontSize = "100%";
    closeButton.back

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
    // hier habe ich die funktion gemacht um die liste der Aufgaben zu aktualisieren
    tasksList.innerHTML = "";
    tasks.forEach((task) => createListItemWithCloseButton(task, tasksList));
  }

  function refreshPeopleList() {
    // hier habe ich die funktion gemacht um die liste der Personen zu aktualisieren
    peopleList.innerHTML = "";
    people.forEach((person) =>
      createListItemWithCloseButton(person, peopleList)
    );
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
});
// ..
