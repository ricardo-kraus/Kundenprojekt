document.addEventListener("DOMContentLoaded", function () {
    const peopleList = document.getElementById("people-list");
    const tasksList = document.getElementById("tasks-list");
    const addPersonForm = document.getElementById("add-person-form");
    const addTaskForm = document.getElementById("add-task-form");
    const assignButton = document.getElementById("assign-button");
    const taskAssignment = document.getElementById("task-assignment");
    const successMessage = document.getElementById("success-message");

    let people = [];
    let tasks = [];
    let assignments = JSON.parse(localStorage.getItem("assignments")) || {};

    // Event-Listener zum Hinzufügen einer Person
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

    // Event-Listener zum Hinzufügen einer Aufgabe
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

    // Funktion zum Entfernen einer Person aus der Liste
    function removePerson(personName) {
        people = people.filter((name) => name !== personName);
        refreshPeopleList();
    }

    // Funktion zum Entfernen einer Aufgabe aus der Liste
    function removeTask(taskName) {
        tasks = tasks.filter((task) => task !== taskName);
        refreshTasksList();
    }

    assignButton.addEventListener("click", function () {
        // Hier sollten Sie die Funktion assignTasksOneDay aufrufen
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

        // Zeige eine Erfolgsmeldung
        successMessage.style.display = "block";
        setTimeout(function () {
            successMessage.style.display = "none";
        }, 3000); // Verstecke die Erfolgsmeldung nach 3 Sekunden
    });

    // Funktion zum Erstellen einer Liste
    function createListItem(text, parentElement) {
        const listItem = document.createElement("li");
        listItem.textContent = text;
        parentElement.appendChild(listItem);
    }

    // Funktion zum Erstellen einer Liste mit Schaltfläche zum Entfernen
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

    // Funktion zum Aktualisieren der Personenliste
    function refreshPeopleList() {
        peopleList.innerHTML = "";
        people.forEach((person) =>
            createListItemWithCloseButton(person, peopleList)
        );
    }

    // Funktion zum Aktualisieren der Aufgabenliste
    function refreshTasksList() {
        tasksList.innerHTML = "";
        tasks.forEach((task) => createListItemWithCloseButton(task, tasksList));
    }

    // Die Funktionen shuffleArray, assignTasksOneDay und displayAssignments sollten definiert sein.

    // Initialanzeige der Personen- und Aufgabenliste
    refreshPeopleList();
    refreshTasksList();

    // Initialanzeige der Zuordnungen
    displayAssignments(assignments, taskAssignment);
});

// Definition der Funktion assignTasksOneDay
function assignTasksOneDay(people, tasks) {
    // Hier sollten Sie Ihre Logik zum Zuweisen von Aufgaben an Personen implementieren
    // und ein Zuordnungsobjekt zurückgeben
}

// Definition der Funktion displayAssignments
function displayAssignments(assignments, taskAssignment) {
    // Hier sollten Sie den Code zum Anzeigen der Zuordnungen implementieren
}
